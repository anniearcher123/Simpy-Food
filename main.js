//Recipe API homepage https://spoonacular.com/food-api
//API key 7be06ed1dc724fc38a11ef37e6e88fbe
//Format add => &apiKey=7be06ed1dc724fc38a11ef37e6e88fbe at the end of url
// Example: https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples&apiKey=7be06ed1dc724fc38a11ef37e6e88fbe
// comment
//Test fetching recipe by ingredient
// async function start() {
//     const response = await fetch("https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples&apiKey=7be06ed1dc724fc38a11ef37e6e88fbe")
//     const data = await response.json()
//     console.log(data)    
// }

//start()

//Event listener for search button
//Select button
window.onload=function() {
    const searchButton = document.getElementById('search-btn');
    searchButton.addEventListener("click", resultList);
}
//Take input from search and look up recipe by ingredient
function resultList(){
    let result = document.getElementById('ingredient-search').value.trim()
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${result}&apiKey=7be06ed1dc724fc38a11ef37e6e88fbe`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        ingredientList(data)
    })
}

//Function that will use result of search, loop through array and pull out information
function ingredientList(ingredient){
    document.getElementById('search-result').innerHTML =`
    <div>    
    ${ingredient.map(function(food) {
            return `<div>${food.title} - ${food.missedIngredients[0].name}</div>`
        }).join('')}
    </div
    `
}
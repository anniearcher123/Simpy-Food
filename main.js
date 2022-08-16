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
const recipes = document.getElementById('card-container')
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
         //combinedIngredients(data)
         //let allIngredients = data.missedIngredients.concat(data.usedIngredients)
         ingredientList(data)
         //function combine ingredients
     })
 }
//global variable = line 45 .map function

// function combinedIngredients(data){
//     //loop thru arrays then concat 
//     let allIngredients = data.missedIngredients.concat(data.usedIngredients)
//     return allIngredients
// }
//Function that will use result of search, loop through array and pull out information
function ingredientList(ingredient){
    //console.log(ingredient)
    // for(let i = 0; i < ingredient.missedIngredients.length; i++){
        
    // }
    document.querySelector('.card-container').innerHTML =`
    ${ingredient.map(function(food) {
        
        let html = ""
        food.missedIngredients.forEach(function(missed){
            html += `<li>${missed.original}</li>`
        })
        food.usedIngredients.forEach(function(used){
            html += `<li>${used.original}</li>`
        })
        console.log(html)
        return `<div class="card">
        <div class="card-body">
            <img src="${food.image}" alt="" class="card-image"/>
            <h2 class="card-title">${food.title}</h2>
            <ol>${html}</ol>
        </div>
        <button class="card-button">View recipe</button>
    </div>`
    }).join('')}
    `
}




// function resultList(){
//     let result = document.getElementById('ingredient-search').value.trim()
//     fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${result}&apiKey=7be06ed1dc724fc38a11ef37e6e88fbe`)
//     .then(response => response.json())
//     //.then(data => obj = data)
//      .then(data => {
//          console.log(data)
//          ingredientList(data)
// //         let html = ""
// //         if(data){
// //             data.forEach(food => {
// //                 html += `
// //                 <div class = "meal-item">
// //                     <div class = "meal-img">
// //                         <img src = "${food.image}" alt = "food">
// //                     </div>
// //                     <div class = "meal-name">
// //                         <h3>${food.title}</h3>
// //                         <a href = "#" class = "recipe-btn">Get Nutrition</a>
// //                     </div>
// //                 </div>
// //                 `
// //             });
// //         }
// //         recipes.innerHTML = html
//      })
//  }

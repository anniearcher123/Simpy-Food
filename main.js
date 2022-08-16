//Recipe API homepage https://spoonacular.com/food-api
//API key 7be06ed1dc724fc38a11ef37e6e88fbe
//Format add => &apiKey=7be06ed1dc724fc38a11ef37e6e88fbe at the end of url
// Example: https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples&apiKey=7be06ed1dc724fc38a11ef37e6e88fbe

//Test fetching recipe by ingredient
// async function start() {
//     const response = await fetch("https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples&apiKey=7be06ed1dc724fc38a11ef37e6e88fbe")
//     const data = await response.json()
//     console.log(data)    
// }

//start()

//Event listener for search button
//Select button
let searchButton= document.getElementById("search-btn");
searchButton.addEventListener("click", resultList);

//Take input from search and look up recipe by ingredient
function resultList(){
    let result = document.getElementById('ingredient-search').ariaValueMax.trim()
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?
    ingredients=${result}&apiKey=7be06ed1dc724fc38a11ef37e6e88fbe`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
}

// Filter recipes on homescreen
filterObjects("all");

function filterObjects(a){
    x = document.getElementsByClassName("card");
    if(a == "all") a = "";
    for (i = 0; i < x.length; i++) {
        removeClass(x[i], "show");
        if(x[i].className.indexOf(a) > -1) addClass(x[i], "show")
    }
}

function addClass(b, c){
    let i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++){
        if (arr1.indexOf(arr2[i]) == -1){
            element.className += " " + arr2[i];
        }
    }
}

function removeClass(b, c){
    let i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++){
        while (arr1.indexOf(arr2[i]) > -1){
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}
// Filter recipes on homescreen
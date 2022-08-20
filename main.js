//Recipe API homepage https://spoonacular.com/food-api
//Recipe API key 7be06ed1dc724fc38a11ef37e6e88fbe
//Format add => &apiKey=7be06ed1dc724fc38a11ef37e6e88fbe at the end of url
// Example: https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples&apiKey=7be06ed1dc724fc38a11ef37e6e88fbe

//Nutrition API homepage https://www.edamam.com/
//Nutrition API ID a9218d64
//API key cc615f58e7a322c342185472560c8883
//URL example https://api.edamam.com/api/nutrition-data?app_id=a9218d64&app_key=cc615f58e7a322c342185472560c8883&nutrition-type=cooking&ingr=1%20cup%20of%20milk%2C%201%20tsp%20of%20vanilla%2C%204%20eggs

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
         ingredientList(data)
     })
 }

//Function that will use result of search, loop through array and pull out information
function ingredientList(ingredient){
    document.querySelector('.card-container').innerHTML =`
    ${ingredient.map(function(food) {
        
        let html = ""
        let htmlTwo = ""
        food.missedIngredients.forEach(function(missed){
            html += `<li class="ingredients">${missed.original}</li>`
            htmlTwo += missed.original
        })
        food.usedIngredients.forEach(function(used){
            html += `<li class="ingredients">${used.original}</li>`
            htmlTwo += used.original
        })
        
        //html += nutrition(htmlTwo)
        console.log(htmlTwo)
        return `<div class="card">
        <div class="card-body">
            <img src="${food.image}" alt="" class="card-image"/>
            <h2 class="card-title">${food.title}</h2>
            <ol class="ingredients-list">${html}</ol>
            <ol class="calories">${nutrition(htmlTwo)}</ol>
        </div>
        <button class="card-button">View recipe</button>
    </div>`
    
    }).join('')}
    `
    //nutrition(htmlTwo);
}

function nutrition(ingredient){

    let nutrition =""
    //let ingredients = document.querySelector(".ingredients").innerText
    //console.log(ingredients)
    fetch(`https://api.edamam.com/api/nutrition-data?app_id=a9218d64&app_key=cc615f58e7a322c342185472560c8883&nutrition-type=cooking&ingr=${ingredient}`)
    .then(response => response.json())
    .then(data => {
         nutrition = data
         console.log(nutrition.calories)
         return nutrition.calories
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




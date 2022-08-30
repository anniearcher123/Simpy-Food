function cuisineRecipes() {
    let recipeIds = []
    let result = document.getElementsByClassName('card-container')
    fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=italian&apiKey=8632ca482e724046a9901233a48357de`)
    .then(response => response.json())
    .then(cuisine => {
        // console.log(cuisine)
        document.querySelector('.card-container').innerHTML =`
        ${cuisine.results.map(recipe => {
            let html = ""
            recipeIds.push(recipe.id)
            return `<div class="card" id="${recipe.id}">
            <div class="card-body">
                <img src="${recipe.image}" alt="" class="card-image"/>
                <h2 class="card-title">${recipe.title}</h2>
                <ol class="ingredients-list" id="cuisineIngredients_${recipe.id}"></ol>
            </div>
            <button onclick="showIngredients(this)" data-recipeid="${recipe.id}" class="card-button">Recipe Information</button>
            <button onclick="hideIngredients(this)" data-recipeid="${recipe.id}" class="card-button">Hide</button>
            </div>`
        }).join('')}
        `
    })
}

function cuisineIngredients (cuisineId) {
    const ol = document.querySelector(`#cuisineIngredients_${cuisineId}`)
    const $ingredientList = $(`#cuisineIngredients_${cuisineId} li`);
    if($ingredientList.length === 0)
    {
        fetch(`https://api.spoonacular.com/recipes/${cuisineId}/information?includeNutrition=false&apiKey=8632ca482e724046a9901233a48357de`)
        .then(response => response.json())
        .then(data => {
            let html = "<h3><u>Ingredients:</u></h3>"
            let cardIngredients = [];
            data.extendedIngredients.forEach(function(extend){
                html += `<li class="ingredients">${extend.original}</li>`
                cardIngredients.push(extend.original);
            });
            ol.innerHTML = html
            // console.log(cardIngredients.toString())
            // nutrition(cardIngredients)
            
        });  
    } else {
        $(`#cuisineIngredients_${cuisineId}`).show()
    }
}

// async function nutrition(ingredient){
//     let nutrients = ""
//     let card = []
//     console.log(ingredient)
//     const response = await fetch(`https://api.edamam.com/api/nutrition-data?app_id=a9218d64&app_key=cc615f58e7a322c342185472560c8883&nutrition-type=cooking&ingr=${ingredient}`);
//     const data = await response.json();
//     console.log(data)
//     //return data.calories
//     //loop through total nutrients
//     for(let nutrient in data.totalNutrients) {
//         nutrients += `<li>${data.totalNutrients[nutrient].label} - ${data.totalNutrients[nutrient].quantity}${data.totalNutrients[nutrient].unit}</li>`
//     }
// }

function showIngredients(button){
    let recipeId = $(button).data("recipeid");
    cuisineIngredients(recipeId);
}
    
function hideIngredients(button){
        let recipeId = $(button).data("recipeid");
        $(`#cuisineIngredients_${recipeId}`).hide();
    }

cuisineRecipes()

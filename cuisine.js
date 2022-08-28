function cuisineRecipes() {
    let recipeIds = []
    let result = document.getElementsByClassName('card-container')
    fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=chinese&apiKey=0c330f07709941429d4eae0d022b4f25`)
    .then(response => response.json())
    .then(cuisine => {
        console.log(cuisine)

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
            <button onclick="showIngredients(this)" data-recipeid="${recipe.id}" class="card-button">Nutrition Info</button>
            <button onclick="hideIngredients(this)" data-recipeid="${recipe.id}" class="card-button">Hide</button>
            </div>`
}).join('')}
`
})
// .then(async ingredientsArray => {
//         await Promise.all(recipeIds.map(id => {
//             return cuisineIngredients(id);
//         }))
//     })

// .then(async cuisineIngredientsArray => {
//     await Promise.all(cuisineIngredientsArray.map(ingredient => {
//         return nutrition(ingredient);
//     }))
//})
//cuisineIngredients()
}

function cuisineIngredients (cuisineId) {
    const $ingredientList = $(`#cuisineIngredients_${cuisineId} li`);
    if($ingredientList.length === 0)
    {
        fetch(`https://api.spoonacular.com/recipes/${cuisineId}/information?includeNutrition=false&apiKey=0c330f07709941429d4eae0d022b4f25`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let html = ""
            let cardIngredients = [];
            data.extendedIngredients.forEach(function(extend){
                html += `<li class="ingredients">${extend.original}</li>`
                cardIngredients.push(extend.original);
            });
            $ingredientList.html(html);
            $ingredientList.show();
        });  
    } else {
        $ingredientList.show();
    }
}

async function nutrition(ingredient){
    let nutrients = ""
    let card = []
    
    const response = await fetch(`https://api.edamam.com/api/nutrition-data?app_id=a9218d64&app_key=cc615f58e7a322c342185472560c8883&nutrition-type=cooking&ingr=${ingredient}`);
    const data = await response.json();
    console.log(data)
    //return data.calories
    //loop through total nutrients
    for(let nutrient in data.totalNutrients) {
        nutrients += `<li>${data.totalNutrients[nutrient].label} - ${data.totalNutrients[nutrient].quantity}${data.totalNutrients[nutrient].unit}</li>`
    }
        
        return `
        <h3>Nutrition Info</h3>
            <ol class="nutrition-info">
                ${nutrients}
            </ol>
        `
    }

function showIngredients(button){
    let recipeId = $(button).data("recipeid");
    cuisineIngredients(recipeId);
}
    
async function hideIngredients(button){
    let recipeId = $(button).data("recipeid");
    $(`#cuisineIngredients_${recipeId}`).hide();
}


cuisineRecipes()

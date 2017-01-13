import _ from 'lodash';
export class RecipesService{
    constructor(){
        this.recipes = null;
    };


   getRecipes(){
        if(!this.recipes){
            return fetch('http://localhost:3000/recipes')
                            .then(response => response.json())
                            .then(recipes => this.recipes = recipes);
        }
        else {
            return Promise.resolve(this.recipes);
        }
    }


    isRecipeCompliant(recipe, pizza) {
        if (recipe.toppings.length !== pizza.length) return false;

        return pizza.reduce((acc, topping) =>
            acc 
            && recipe.toppings.indexOf(topping) !== -1 
            && pizza.indexOf(topping) === pizza.lastIndexOf(topping)
            , true);
    }
    
    getPizzaRecipeName(pizza){
        return this.getRecipes()
            .then(recipes => {
                return recipes.reduce(
                    (acc,recipe) => 
                    acc 
                    || (this.isRecipeCompliant(recipe,pizza) ? recipe.name : false),
                 false);
            })
    }

    getRecipe(name){
        return this.getRecipes()
                   .then(recipes => recipes
                            .find(recipe => recipe.name === name));   
    }


    getRecipesNames(){
        return this.getRecipes()
                   .then(recipes => recipes
                            .map(recipe => recipe.name));

    }

    queryRecipes(query){
        return this.getRecipes()
                   .then(recipes => recipes
                            .filter(recipe => recipe.name.toLowerCase().includes(query.toLowerCase())));   
    }

     getToppings() {
        return this.getRecipes()
        .then(recipes => 
            _(recipes.map(recipe => recipe.toppings))
                .flatten()
                .uniq()
                .value()
        )
        .catch(this.handleError)
        
    }

}
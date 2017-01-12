class RecipeService{
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
}





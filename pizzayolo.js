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
        if (recipe.toppings.length !== pizza.toppings.length) return false;

        return pizza.toppings.reduce((acc, topping) =>
            acc 
            && recipe.toppings.indexOf(topping) !== -1 
            && pizza.toppings.indexOf(topping) === pizza.toppings.lastIndexOf(topping)
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
}

class PizzeriaService{
    constructor(recipesService){
        this.pool = []
        this.recipesService = recipesService

    }

    strat(){
       const intervalId = setInterval(()=>{
            console.log(this.pool);
            let alea = Math.floor(Math.random()*3);
            recipesService.getRecipe(recipesService.getRecipes()
                            .then(
                                recipes => {
                                    this.pool.push(recipes.find(recipe => recipe.id === (alea+1)).name);
                                }
                            ))
            if(this.pool.length >= 10){
                console.log('GAME OVER');
                clearInterval(intervalId);
            }
           
        },1000)

    }

     sendPizza (pizzaName) {
        const idx = this.pool.indexOf(pizzaName);
        if (idx !== -1) this.pool.splice(idx, 1);
    }

}




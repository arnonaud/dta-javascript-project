export class PizzeriaService{
    constructor(recipesService){
        this.pool = []
        this.recipesService = recipesService

    }

    start(){
       const intervalId = setInterval(()=>{
            let alea = Math.floor(Math.random()*3);
            this.recipesService.getRecipe(this.recipesService.getRecipes()
                            .then(
                                recipes => {
                                    this.pool.push(recipes.find(recipe => recipe.id === (alea+1)).name);
                                }
                            ))
            if(this.pool.length >= 10){
                clearInterval(intervalId);
                 this.pool = [];
            }
           
        },2000)

    }

     sendPizza (pizzaName) {
        const idx = this.pool.indexOf(pizzaName);
        if (idx !== -1) this.pool.splice(idx, 1);
    }

}
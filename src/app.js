import { RecipeService } from './services/recipes.service';
import { PizzeriaService } from './services/pizzeria.service';

const recipesService = new RecipeService();
const pizzeriaService = new PizzeriaService(recipesService);

pizzeriaService.start();


function makePizza (name) {
    pizzeriaService.sendPizza(name);
}


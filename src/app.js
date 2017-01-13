import { RecipesService } from './services/recipes.service';
import { PizzeriaService } from './services/pizzeria.service';

const recipesService = new RecipesService();
const pizzeriaService = new PizzeriaService(recipesService);




recipesService.getRecipesNames()
.then(recipes => {
    $("#recipes").append(recipes.map(recipe => `<li>${ recipe }</li>`).join(''));

    $("li").click(function(){
        recipesService.getRecipe($(this).text())
        .then(recipe =>{
             $("#toppings").html(recipe.toppings.map(topping => `${ topping }`).join('<br />'));
          });
         
    });
});

$('document').ready(function(){ 
    let score = 0;
  
    $('#startButton').click(function(){
        pizzeriaService.start();
        $('#startButton').fadeOut();
            const intervalId = setInterval(()=>{
                   $("#pool").html(pizzeriaService.pool.map(recipe => `<li>${ recipe }</li>`).join(''));
            if(pizzeriaService.pool.length >= 10){
                clearInterval(intervalId);
                $("#pool").html("<p>Game Over</p>");
                $('#startButton').fadeIn();
               
            }
          },2000);
            
    });

    recipesService.getToppings()
    .then(
        toppings => toppings.forEach(topping => {
            $("#toppingsAvailable").append(`<a class="btn btn-xs btn-primary">${ topping }</a>`);
        })
    )
    .then(
        () => {
           $("#toppingsAvailable a").click(function () {
               if($("#pool").text()==="Game Over"){
                   $("#toppingsPizza").html("Lance une nouvelle partie pour commencer à jouer");
               }
               else {
                   $("#toppingsPizza").append("<li>" + $(this).text() +"</li>");
               }
               
           }) 
        }
    )

   $("#sendButton").click(function(){
       
       let toppings = [];
       $('#toppingsPizza li').each(function(i)
        {
            
            toppings.push($(this).text());
            
           
    });
    
   recipesService.getPizzaRecipeName(toppings)
            .then(pizza => {
                if(pizza){
                     pizzeriaService.sendPizza(pizza);
                     $("#information").html("Bien joué");
                     $("#score").html(++score);
                }
                else{
                    $("#information").html("Echec");
                }
                $("#toppingsPizza li").remove();
            });
});
  
    
});

    





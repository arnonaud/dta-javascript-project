/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _recipes = __webpack_require__(1);
	
	var _pizzeria = __webpack_require__(2);
	
	var recipesService = new _recipes.RecipeService();
	var pizzeriaService = new _pizzeria.PizzeriaService(recipesService);
	
	pizzeriaService.start();
	
	function makePizza(name) {
	    pizzeriaService.sendPizza(name);
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var RecipeService = exports.RecipeService = function () {
	    function RecipeService() {
	        _classCallCheck(this, RecipeService);
	
	        this.recipes = null;
	    }
	
	    _createClass(RecipeService, [{
	        key: 'getRecipes',
	        value: function getRecipes() {
	            var _this = this;
	
	            if (!this.recipes) {
	                return fetch('http://localhost:3000/recipes').then(function (response) {
	                    return response.json();
	                }).then(function (recipes) {
	                    return _this.recipes = recipes;
	                });
	            } else {
	                return Promise.resolve(this.recipes);
	            }
	        }
	    }, {
	        key: 'isRecipeCompliant',
	        value: function isRecipeCompliant(recipe, pizza) {
	            if (recipe.toppings.length !== pizza.toppings.length) return false;
	
	            return pizza.toppings.reduce(function (acc, topping) {
	                return acc && recipe.toppings.indexOf(topping) !== -1 && pizza.toppings.indexOf(topping) === pizza.toppings.lastIndexOf(topping);
	            }, true);
	        }
	    }, {
	        key: 'getPizzaRecipeName',
	        value: function getPizzaRecipeName(pizza) {
	            var _this2 = this;
	
	            return this.getRecipes().then(function (recipes) {
	                return recipes.reduce(function (acc, recipe) {
	                    return acc || (_this2.isRecipeCompliant(recipe, pizza) ? recipe.name : false);
	                }, false);
	            });
	        }
	    }, {
	        key: 'getRecipe',
	        value: function getRecipe(name) {
	            return this.getRecipes().then(function (recipes) {
	                return recipes.find(function (recipe) {
	                    return recipe.name === name;
	                });
	            });
	        }
	    }, {
	        key: 'getRecipesNames',
	        value: function getRecipesNames() {
	            return this.getRecipes().then(function (recipes) {
	                return recipes.map(function (recipe) {
	                    return recipe.name;
	                });
	            });
	        }
	    }, {
	        key: 'queryRecipes',
	        value: function queryRecipes(query) {
	            return this.getRecipes().then(function (recipes) {
	                return recipes.filter(function (recipe) {
	                    return recipe.name.toLowerCase().includes(query.toLowerCase());
	                });
	            });
	        }
	    }]);

	    return RecipeService;
	}();

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PizzeriaService = exports.PizzeriaService = function () {
	    function PizzeriaService(recipesService) {
	        _classCallCheck(this, PizzeriaService);
	
	        this.pool = [];
	        this.recipesService = recipesService;
	    }
	
	    _createClass(PizzeriaService, [{
	        key: 'start',
	        value: function start() {
	            var _this = this;
	
	            var intervalId = setInterval(function () {
	                console.log(_this.pool);
	                var alea = Math.floor(Math.random() * 3);
	                _this.recipesService.getRecipe(_this.recipesService.getRecipes().then(function (recipes) {
	                    _this.pool.push(recipes.find(function (recipe) {
	                        return recipe.id === alea + 1;
	                    }).name);
	                }));
	                if (_this.pool.length >= 10) {
	                    console.log('GAME OVER');
	                    clearInterval(intervalId);
	                }
	            }, 1000);
	        }
	    }, {
	        key: 'sendPizza',
	        value: function sendPizza(pizzaName) {
	            var idx = this.pool.indexOf(pizzaName);
	            if (idx !== -1) this.pool.splice(idx, 1);
	        }
	    }]);

	    return PizzeriaService;
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=app.bundle.js.map
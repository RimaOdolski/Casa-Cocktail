var chosenIngArr = []; //"bourbon", "water", "angostura bitters", "sugar"
var currentIngDrnksIDArr = [];
var canMakeDrinksArr = [];
var alcoholChoicesArr = [];
var mixerChoicesArr = [];


// ingredients runs to 600 !!!!!!!!!!!!!!!!!!!!!!
// var settings = {
//   "url": "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list",
//   "method": "GET",
//   "timeout": 0,
// };

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });

// This will populate our list of choosable ingredients for the user to choose from
for (var i = 1; i < 605; i++) {
  var settings = {
    "url": `https://thecocktaildb.com/api/json/v1/1/lookup.php?iid=${i}`,
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {
    if (Array.isArray(response.ingredients) === true) { 
       if (response.ingredients[0].strAlcohol === null) {
        var capCheck = response.ingredients[0].strIngredient;
        var capChecked = capCheck.charAt(0).toUpperCase() + capCheck.substring(1);
        mixerChoicesArr.push(capChecked);
      } else if (response.ingredients[0].strAlcohol.toLowerCase() === "yes") {
        var capCheck2 = response.ingredients[0].strIngredient;
        var capChecked2 = capCheck2.charAt(0).toUpperCase() + capCheck2.substring(1);
        alcoholChoicesArr.push(capChecked2);  
      }
    }
  });
}

// This will loop through the each ingredient in the chosenIngArr
for (var ingredientsCount = 0; ingredientsCount < chosenIngArr.length; ingredientsCount++) {
  var settings2 = {
    "url": `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${chosenIngArr[ingredientsCount]}`,
    "method": "GET",
    "timeout": 0,
  };

  // This will loop through the returned drinks from the current ing and push their IDs to the currentIngDrnksIDArr  MAY NOT NEED CURRENTINGDRNKSIDARR
  $.ajax(settings2).done(function (response2) {

    // console.log("response2 = "+response2);
//   })
// }
    for (var availDrinksCount = 0; availDrinksCount < response2.drinks.length; availDrinksCount++) {

      // console.log("availDrinksCount = "+availDrinksCount)
      var settings3 = {  
        "url": `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${response2.drinks[availDrinksCount].idDrink}`,
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings3).done(function (response3) {
        var haveIngredient;
        // console.log("response3 = "+response3);
        for (reqIngCount = 0; reqIngCount < 15 && response3.drinks[0].strIngredient+`${reqIngCount+1}` !== null; reqIngCount++) { 
          // console.log(response3.drinks[0].strIngredient+`${reqIngCount+1}`);
          for (var haveIngCount = 0; haveIngCount < chosenIngArr.length; haveIngCount++) {
          // var newSource = `strIngredient${reqIngCount}`;
          console.log(response3);
          console.log("strI ---->" + response3.drinks[0]["strIngredient"+(reqIngCount+1)]);  //+`${reqIngCount+1}`);
          if (chosenIngArr.includes(response3.drinks[0]["strIngredient"+(reqIngCount+1)]) || response3.drinks[0]["strIngredient"+(reqIngCount+1)] === null) {
            haveIngredient = true;
          } else {
            haveIngredient = false;
            break;
          }
        }
        console.log("haveIngredient ----> " + haveIngredient);
        if (haveIngredient && canMakeDrinksArr.includes(response3.drinks[0].idDrink) !== true) {
          canMakeDrinksArr.push(response3.drinks[0].strDrink)
        }
      }
    });
    }     
  });
};
      
      // var haveIngredient; 
      // if (haveIngredient) {}
      // currentIngDrnksIDArr.push(response2.drinks[availDrinksCount].idDrink);
    // }
//   });

// };
var intvl = setTimeout(function() { 
      // console.log("canMakeDrinksArr --->" + canMakeDrinksArr);
      console.log("alcohol choices -------> "+alcoholChoicesArr.sort());
      console.log("# of alcohols ------->"+ alcoholChoicesArr.length);
      console.log("mixer choices -------> "+mixerChoicesArr.sort());
      console.log("# of mixers -----> "+mixerChoicesArr.length);
}, 2000);



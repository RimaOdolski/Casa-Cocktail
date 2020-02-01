var ingredientsArr = ["bourbon", "water", "angostura bitters", "sugar"];
var currentIngDrnksIDArr = [];
var canMakeDrinksArr = [];
// var settings = {
//   "url": "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list",
//   "method": "GET",
//   "timeout": 0,
// };

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });

// This will loop through the each ingredient in the ingredientsArr
for (var ingredientsCount = 0; ingredientsCount < ingredientsArr.length; ingredientsCount++) {
  var settings2 = {
    "url": `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientsArr[ingredientsCount]}`,
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
          for (var haveIngCount = 0; haveIngCount < ingredientsArr.length; haveIngCount++) {
          // var newSource = `strIngredient${reqIngCount}`;
          console.log(response3);
          console.log("strI ---->" + response3.drinks[0]["strIngredient"+(reqIngCount+1)]);  //+`${reqIngCount+1}`);
          if (ingredientsArr.includes(response3.drinks[0]["strIngredient"+(reqIngCount+1)]) || response3.drinks[0]["strIngredient"+(reqIngCount+1)] === null) {
            haveIngredient = true;
          } else {
            haveIngredient = false;
            break;
          }
        }
        console.log("haveIngredient ----> " + haveIngredient);
        if (haveIngredient && canMakeDrinksArr.includes(response3.drinks[0].idDrink) !== true) {
          canMakeDrinksArr.push(response3.drinks[0].idDrink)
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
      console.log("canMakeDrinksArr --->" + canMakeDrinksArr);
}, 2000);



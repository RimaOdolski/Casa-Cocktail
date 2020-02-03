$(document).ready( function () {
var chosenIngArr = []; //"bourbon", "water", "angostura bitters", "sugar"
var currentIngDrnksIDArr = [];
var canMakeDrinksArr = [];
var alcoholChoicesArr = [];
var mixerChoicesArr = [];
var jokeURL = "https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist&type=twopart";
var month=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


//~~~~~~~~~~~~~~~~~~~~~~~~~code for 1st page~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$(".month").one("click", getDate());

function getDate() {
  for (let index = 0; index < month.length; index++) {
    var monthArr = month[index];
    var option = $("<option>")
    option.append(monthArr);
    $(".month").append(option);
  }
}
//not working!!!!!
$("#day").click(function () {
  for (let day = 1; day <= 31; day++) {
   var option = $("<option class='day'>")
   option.append(day);
   $("#day").append(day);
  }
})

$("#year").click(function () {
  for(let year = 1913; year <=2020 ; year++) {
    var option = $("<option class='year'>")
    option.append(year);
    $("#year").append(option);
} 
})

 //possible way to validate age
 /*  function validateDOB(){
    if(.value==''){
      alert('Please select a date')
      return false
    }
    var dob=.value
    console.log(dob)
      var today = new Date();
      var birthDate = new Date(dob);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
     if(age<21){
        alert('You can not enter, must be above 21')
     }
  }
 */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var searchAlc = function(searchedStr) {
  // if (alcoholChoicesArr.includes(searchedStr)) {
    for (var i = 0; i < alcoholChoicesArr.length; i++) {
      if (alcoholChoicesArr[i].toLowerCase().includes(searchedStr.toLowerCase())) {
        // display to the DOM (possibly as a li) as a found search result
        // MAYBE ADD A HIDING CLASS TO NON MATCHES!!!!!!!!
      }
    }
  // }
};

var searchMix = function(searchedStr) {
  for (var i = 0; i < mixerChoicesArr.length; i++) {
    if (mixerChoicesArr[i].toLowerCase().includes(searchedStr.toLowerCase())) {
      // display to the DOM (possibly as a li) as a found search result
      // MAYBE ADD A HIDING CLASS TO NON MATCHES!!!!!!!!
    }
  }
}

// DONT THINK I NEED THIS AJAX ANYMORE
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
  alcoholChoicesArr.sort();
  mixerChoicesArr.sort();
  console.log("alcohol choices -------> "+alcoholChoicesArr);
  console.log("# of alcohols ------->"+ alcoholChoicesArr.length);
  console.log("mixer choices -------> "+mixerChoicesArr);
  console.log("# of mixers -----> "+mixerChoicesArr.length);
}, 2000);
 */

// ajax call for random joke
$.ajax({
  url: jokeURL,
  method: "GET"
}).then(function (response) {

  //creating dynamically the header
 var jokeHeading = $("<h5 class='h5'>");
 $(jokeHeading).append("Random Joke");
 $("#joke").append(jokeHeading);

// for two part joke
var joke= $("<p class='joke-holder'>");
var jokeOne= $("<p class='joke-holder'>");

$(joke).append(response.setup);
$(jokeOne).append(response.delivery);

$("#joke").append(joke, jokeOne)

});


}); 
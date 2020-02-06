$(document).ready(function () {
  var chosenIngArr = []; // var chosenIngArr = ["Kahlua", "Vodka", "Orange juice", "Baileys irish cream", "Bourbon"];
  var canMakeDrinksArr = [];
  drinkCount = 0;
  var alcoholChoicesArr = [
    "Amaretto", "Aperol", "Apple Schnapps", "Baileys irish cream", "Banana liqueur", "Beer", "Blue curacao", "Bourbon", "Brandy", "Butterscotch schnapps", "Champagne", "Cider", "Coconut rum", "Cognac", "Dry vermouth", "Galliano", "Gin", "Gold tequila", "Goldschlager", "Guinness", "Kahlua", "Melon liqueur", "Pisco", "Raspberry liqueur", "Red wine", "Rum", "Rye whiskey", "Scotch", "Sherry", "Southern comfort", "Sweet vermouth", "Tequila", "Triple sec", "Vermouth", "Vodka"
  ];
  var mixerChoicesArr = [
    "Apple juice", "Bitters", "Black pepper", "Brown sugar", "Butter", "Carbonated soft drink", "Carbonated water", "Celery", "Celery salt", "Cherries", "Cinnamon", "Clamato juice", "Club soda", "Cocktail onion", "Cranberry juice", "Cream", "Egg", "Egg white", "Egg yolk", "Eggnog", "Fresh lemon juice", "Ginger", "Ginger ale", "Ginger beer", "Granulated sugar", "Grape juice", "Grapefruit juice", "Green olives", "Grenadine", "Half-and-half", "Honey", "Hot sauce", "Iced tea", "Lemon", "Lemon juice", "Lemonade", "Lime", "Lime juice", "Maple syrup", "Maraschino cherry", "Margarita mix", "Milk", "Mint", "Olive", "Orange juice", "Pepper", "Peychaud bitters", "Pina colada mix", "Pineapple juice", "Roses sweetened lime juice", "Salt", "Soda water", "Sweet and sour", "Tabasco sauce", "Vanilla extract"
  ];
  var checkedArr = [];
  var jokeURL = "https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist&type=twopart";
  var month = ["Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var currentDate = moment().format('MM DD YYYY');
  var yearDiff;


  //~~~~~~~~~~~~~~~~~~~~~~~~~code for 1st page~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //when button is clicked validation of birth date is run
  $(".button").on("click", function () {
    validateDate();
  });

  // when button is clicked, the first page is hidden, revealing the 2nd page
  $("#user-submit").on("click", function () {
    $(".image2").hide();
    $(".solid").removeClass("is-hidden");
    $(".solid").addClass("hero is-fullheight");
  })


  //  determining if user is 21 or over
  $(".month").one("click", getMonth());
  $(".day").one("click", getDay());
  $(".year").one("click", getYear());

  //allows the months to show on dropdown
  function getMonth() {
    for (let index = ""; index < month.length; index++) {
      var monthArr = month[index];
      var option = $("<option>")
      option.append(monthArr);
      $(".month").append(option);
    }
  }
  // allows the days to show on dropdown
  function getDay() {
    for (let day = ""; day <= 31; day++) {
      var option = $("<option>")
      option.append(day);
      $(".day").append(option);
    }
  }
  //allows the years to show on dropddown
  function getYear() {
    for (let year = 1913; year <= 2020; year++) {
      var option = $("<option>")
      option.append(year);
      $(".year").append(option);
    }
  }
  // Validating  that a date must be entered in order to continue to website && age is over 21 
  function validateDate() {
    age();
    var ddlDay = $(".month");
    var ddlMonth = $(".day");
    var ddlYear = $(".year");

    // check date was selected
    if (ddlDay[0].selectedIndex == 0 ||
      ddlMonth[0].selectedIndex == 0 ||
      ddlYear[0].selectedIndex == 0) {
      //alert for date not entered
      $(".no-date").addClass("is-active");
      $(".date-alert").removeClass("is-hidden");

    } else if (yearDiff < 21) {
      // alert for under 21 
      $(".age-modal").addClass("is-active");
      $(".age-alert").removeClass("is-hidden");

    } else {
      $(".cocktails").hide();
      $(".image2").removeClass("is-hidden");
      $(".image2").addClass("hero is-fullheight")
    }

    for (var i = 0; i < alcoholChoicesArr.length; i++) {
      $("#liquor-list").append(`<input type="checkbox" name="ing" value="${alcoholChoicesArr[i]}">${alcoholChoicesArr[i]}<br>`)
    };
    for (var i = 0; i < mixerChoicesArr.length; i++) {
      $("#mixer-list").append(`<input type="checkbox" name="ing" value="${mixerChoicesArr[i]}">${mixerChoicesArr[i]}<br>`)
    };
    $("#user-submit").on("click", function () {
      $(".image2").hide();
      $(".solid").removeClass("is-hidden");
      $(".solid").addClass("hero is-fullheight");
      var items = document.getElementsByName('ing');
      // console.log("items: " +items);
      for (var i = 0; i < items.length; i++) {
        if (items[i].type == 'checkbox' && items[i].checked == true) {
          var ingToFormat = items[i].value;
          // var ingToFormat2 = ingToFormat.charAt(0).toUpperCase() + ingToFormat.substring(1).toLowerCase();
          // console.log("type itf: " +ingToFormat);
          checkedArr.push(ingToFormat); //  !!!!!  may need to change text to something else
          // console.log("cIA: "+checkedArr + "type: " +typeof checkedArr);
        };
      };

      for (var ingredientsCount = 0; ingredientsCount < checkedArr.length; ingredientsCount++) {
        var settings2 = {
          "url": `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${checkedArr[ingredientsCount]}`,
          "method": "GET",
          "timeout": 0,
        };

        // This will loop through the returned drinks from the current ing and push their names to the currentIngDrnksIDArr  MAY NOT NEED CURRENTINGDRNKSIDARR
        $.ajax(settings2).done(function (response2) {

          // console.log("response2 = "+response2); response2 is the page drinks possible from the current ingredient
          //   })
          // }
          // console.log("b4 set2: "+response2);
          // console.log("av count: "+response2.drinks[0]);
          for (var availDrinksCount = 0; availDrinksCount < response2.drinks.length; availDrinksCount++) {

            // console.log("availDrinksCount = "+availDrinksCount)
            var settings3 = {
              // this is bringing up each drink possible with one of the ing.  brought up by id
              "url": `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${response2.drinks[availDrinksCount].idDrink}`,
              "method": "GET",
              "timeout": 0,
            };
            // console.log("response2: "+response2.drinks[availDrinksCount].idDrink)

            $.ajax(settings3).done(function (response3) { // response 3 is the current drink posibility being checked
              var haveIngredient;
              // console.log("response3 = "+response3);
              for (var haveIngCount = 0; haveIngCount < checkedArr.length; haveIngCount++) {
                // console.log(response3.drinks[0].strIngredient+`${reqIngCount+1}`);
                for (var reqIngCount = 0; reqIngCount < 15 && response3.drinks[0]["strIngredient" + (reqIngCount + 1)] !== null; reqIngCount++) {
                  // var newSource = `strIngredient${reqIngCount}`;
                  // console.log(response3);  RECENT HIDE ---------------
                  // console.log("chosenIngArr -> " + chosenIngArr + " strI -> " + response3.drinks[0]["strIngredient" + (reqIngCount + 1)]); //+`${reqIngCount+1}`);
                  // console.log("reqIngCount: " + reqIngCount + ", haveIngCount: " + haveIngCount + ", actual ingredient is: " + response3.drinks[0]["strIngredient" + (reqIngCount + 1)]);
                  if (checkedArr.includes(response3.drinks[0]["strIngredient" + (reqIngCount + 1)]) || response3.drinks[0]["strIngredient" + (reqIngCount + 1)] === null) {
                    haveIngredient = true;
                    // console.log("current drink: " + response3.drinks[0].strDrink + ", haveIngredient: " + haveIngredient);
                  } else {
                    haveIngredient = false;
                    // console.log("current drink: " + response3.drinks[0].strDrink + ", haveIngredient: " + haveIngredient);
                    break;
                  }
                };
                // console.log("haveIngredient : "+response3.drinks[0]["strIngredient"+(reqIngCount+1)]+" ---> "+haveIngredient)
                // }
                // console.log("haveIngredient ----> " + haveIngredient);  RECENT HIDE ---------
                if (haveIngredient && canMakeDrinksArr.includes(response3.drinks[0].idDrink) !== true) {
                  canMakeDrinksArr.push(response3.drinks[0].idDrink);
                  console.log("canMakeDrinksArr --->" + canMakeDrinksArr);
                  // $('<li />', {html: response3.drinks[0].strDrink}).appendTo('ul#theMakeables')
                  var newDrinkEl = document.createElement('li');
                  newDrinkEl.id = `indDrink${drinkCount}`;
                  newDrinkEl.textContent = `${response3.drinks[0].strDrink}`;
                  // console.log("resp: "+response3.drinks[0].id)
                  $(newDrinkEl).on('click', function () {
                    $("#joke").html("");
                    $.ajax({
                      url: jokeURL,
                      method: "GET"
                    }).then(function (response) {

                      //creating dynamically the header
                      var jokeHeading = $("<h5 class='h5'>");
                      $(jokeHeading).append("Random Joke");
                      $("#joke").append(jokeHeading);

                      // for two part joke
                      var joke = $("<p class='joke-holder'>");
                      var jokeOne = $("<p class='joke-holder'>");

                      $(joke).append(response.setup);
                      $(jokeOne).append(response.delivery);

                      $("#joke").append(joke, jokeOne)

                    });
                    $("#solid").hide();
                    $(".page-four").removeClass("is-hidden");
                    $(".page-four").addClass("hero is-fullheight");
                    $("#drink-img").attr('src', `${response3.drinks[0].strDrinkThumb}/preview`);
                    console.log(response3.drinks[0].strDrinkThumb)
                    $("#drinkName").html(response3.drinks[0].strDrink);
                    $("#ingredients").html("");
                    for (i = 1; response3.drinks[0]["strIngredient" + i] !== null; i++) {
                      var newIngLi = document.createElement('li');
                      if (response3.drinks[0]["strMeasure" + i] !== null) {
                        newIngLi.textContent = response3.drinks[0]["strMeasure" + i] + " " + response3.drinks[0]["strIngredient" + i];
                      } else {
                        newIngLi.textContent = response3.drinks[0]["strIngredient" + i];
                      }
                      $("#ingredients").append(newIngLi);
                    };
                    var newInst = document.createElement('li');
                    newInst.textContent = response3.drinks[0].strInstructions;
                    $("#instructions").html("");
                    $("#instructions").append(newInst)
                  });
                  $(".theMakeables").append(newDrinkEl);
                  drinkCount++;
                  $("#noDrink").addClass("is-hidden");
                  // <a class="indDrink" href="${response3.drinks[0].strDrinkThumb}/preview">
                };
              };

            });
          };
        });
      };
    });

    $(".indDrink").click(function (event) {
      $(".solid").hide();
      $(".page-four").removeClass("is-hidden");
      $(".page-four").addClass("hero is-fullheight");

      //  console.log(event.target)
    })

  }

  function age() {
    var now = moment();
    var birthday = moment($(".month").val() + " " + $(".day").val() + ", " + $(".year").val());
    //yearDiff = moment.duration(now - birthDate).as('years');
    yearDiff = now.diff(birthday, 'years');
    console.log(yearDiff);
    return Math.floor(yearDiff);
  }

  $(".modal-close").on("click", function () {
    $(".modal").removeClass("is-active");
    $(".modal-content").addClass("is-hidden")
  })
});


//may use for determining if user is 21 or over
/*  $(".month").one("click", getMonth());
            $(".day").one("click", getDay());
            $(".year").one("click", getYear());
      
              function getMonth() {
                for (let index = ""; index < month.length; index++) {
                  var monthArr = month[index];
                  var option = $("<option>")
                  option.append(monthArr);
                  $(".month").append(option);
                }
              }
      
              function getDay() {
                for (let day = ""; day <= 31; day++) {
                  var option = $("<option>")
                  option.append(day);
                  $(".day").append(option);
                }
              }
      
              function getYear() {
                for (let year = 1913; year <= 2020; year++) {
                  var option = $("<option>")
                  option.append(year);
                  $(".year").append(option);
                }
              }
      
              function validateDate()
              {
                  var ddlDay = $(".month");
                  var ddlMonth = $(".day");
                  var ddlYear = $(".year");
              
                  // check date was selected
                  if (ddlDay[0].selectedIndex == 0 ||
                      ddlMonth[0].selectedIndex == 0 ||
                      ddlYear[0].selectedIndex == 0)
                  {
                      alert("date is required!");
                      return false;
                  }
              
                  // check date is valid
                  var date = new Date();
                  date.setFullYear(ddlYear.val(), ddlMonth.val() - 1, ddlDay.val());
                  var inputDate = ddlYear.val() + "-" + (ddlMonth.val() - 1) + "-" + ddlDay.val();
                  var parsedDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
                  // the parsed date will only match the input date if the input date is valid
                  if (inputDate != parsedDate)
                  {
                      alert("date is invalid!");
                      return false;
                  }
              
                  // date is valid
                  return true;
              } */

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// var searchAlc = function(searchedStr) {
//   // if (alcoholChoicesArr.includes(searchedStr)) {
//     for (var i = 0; i < alcoholChoicesArr.length; i++) {
//       if (alcoholChoicesArr[i].toLowerCase().includes(searchedStr.toLowerCase())) {
//         // display to the DOM (possibly as a li) as a found search result
//         // MAYBE ADD A HIDING CLASS TO NON MATCHES!!!!!!!!
//       }
//     }
//   // }
// };

// var searchMix = function(searchedStr) {
//   for (var i = 0; i < mixerChoicesArr.length; i++) {
//     if (mixerChoicesArr[i].toLowerCase().includes(searchedStr.toLowerCase())) {
//       // display to the DOM (possibly as a li) as a found search result
//       // MAYBE ADD A HIDING CLASS TO NON MATCHES!!!!!!!!
//     }
//   }
// }

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
// for (var i = 1; i < 605; i++) {
//   var settings = {
//     "url": `https://thecocktaildb.com/api/json/v1/1/lookup.php?iid=${i}`,
//     "method": "GET",
//     "timeout": 0,
//   };

//   $.ajax(settings).done(function (response) {
//     // console.log(response);
//     // if(!response.body || !response.body.ingredients){
//     //   return;
//     // }
//     //if (response.body.has("div")) {
//       if (Array.isArray(response.ingredients) === true) {
//         if (response.ingredients[0].strAlcohol === null) {
//           var capCheck = response.ingredients[0].strIngredient;
//           var capChecked = capCheck.charAt(0).toUpperCase() + capCheck.substring(1);
//           mixerChoicesArr.push(capChecked);
//         } else if (response.ingredients[0].strAlcohol.toLowerCase() === "yes") {
//           var capCheck2 = response.ingredients[0].strIngredient;
//           var capChecked2 = capCheck2.charAt(0).toUpperCase() + capCheck2.substring(1);
//           alcoholChoicesArr.push(capChecked2);
//         }
//       }
//     //};
//   });
// }

// This will loop through the each ingredient in the chosenIngArr


// var haveIngredient; 
// if (haveIngredient) {}
// currentIngDrnksIDArr.push(response2.drinks[availDrinksCount].idDrink);
// }
//   });

// };
// var intvl = setTimeout(function () {
// console.log("canMakeDrinksArr --->" + canMakeDrinksArr);
// alcoholChoicesArr.sort();
// mixerChoicesArr.sort();
// console.log("alcohol choices -------> " + alcoholChoicesArr);
// console.log("# of alcohols ------->" + alcoholChoicesArr.length);
// console.log("mixer choices -------> " + mixerChoicesArr);
// console.log("# of mixers -----> " + mixerChoicesArr.length);

// }, 3000);


//ajax call for random joke







// This below section I am not sure what is it for. I did not need it to select the dates or verify age/date input. 
// check date is valid
//     var date = new Date();
//     date.setFullYear(ddlYear.val(), ddlMonth.val() - 1, ddlDay.val());
//     var inputDate = ddlYear.val() + "-" + (ddlMonth.val() - 1) + "-" + ddlDay.val();
//     var parsedDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
//     // the parsed date will only match the input date if the input date is valid
//     if (inputDate != parsedDate)
//     {
//         alert("date is invalid!");
//         return false;
//     }

//     // date is valid
//     return true;
// } 

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// var searchAlc = function(searchedStr) {
//   // if (alcoholChoicesArr.includes(searchedStr)) {
//     for (var i = 0; i < alcoholChoicesArr.length; i++) {
//       if (alcoholChoicesArr[i].toLowerCase().includes(searchedStr.toLowerCase())) {
//         // display to the DOM (possibly as a li) as a found search result
//         // MAYBE ADD A HIDING CLASS TO NON MATCHES!!!!!!!!
//       }
//     }
//   // }
// };

// var searchMix = function(searchedStr) {
//   for (var i = 0; i < mixerChoicesArr.length; i++) {
//     if (mixerChoicesArr[i].toLowerCase().includes(searchedStr.toLowerCase())) {
//       // display to the DOM (possibly as a li) as a found search result
//       // MAYBE ADD A HIDING CLASS TO NON MATCHES!!!!!!!!
//     }
//   }
// }

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
// //for (var i = 1; i < 605; i++) {
//   var settings = {
//     "url": `https://thecocktaildb.com/api/json/v1/1/lookup.php?iid=${i}`,
//     "method": "GET",
//     "timeout": 0,
//   };

//   $.ajax(settings).done(function (response) {
//     if (Array.isArray(response.ingredients) === true) {
//       if (response.ingredients[0].strAlcohol === null) {
//         var capCheck = response.ingredients[0].strIngredient;
//         var capChecked = capCheck.charAt(0).toUpperCase() + capCheck.substring(1);
//         mixerChoicesArr.push(capChecked);
//       } else if (response.ingredients[0].strAlcohol.toLowerCase() === "yes") {
//         var capCheck2 = response.ingredients[0].strIngredient;
//         var capChecked2 = capCheck2.charAt(0).toUpperCase() + capCheck2.substring(1);
//         alcoholChoicesArr.push(capChecked2);
//       }
//     }
//   });
// }

// // This will loop through the each ingredient in the chosenIngArr
// for (var ingredientsCount = 0; ingredientsCount < chosenIngArr.length; ingredientsCount++) {
//   var settings2 = {
//     "url": `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${chosenIngArr[ingredientsCount]}`,
//     "method": "GET",
//     "timeout": 0,
//   };

//   // This will loop through the returned drinks from the current ing and push their names to the currentIngDrnksIDArr  MAY NOT NEED CURRENTINGDRNKSIDARR
//   $.ajax(settings2).done(function (response2) {

//     // console.log("response2 = "+response2); response2 is the page drinks possible from the current ingredient
//     //   })
//     // }
//     for (var availDrinksCount = 0; availDrinksCount < response2.drinks.length; availDrinksCount++) {

//       // console.log("availDrinksCount = "+availDrinksCount)
//       var settings3 = {
//         // this is bringing up each drink possible with one of the ing.  brought up by id
//         "url": `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${response2.drinks[availDrinksCount].idDrink}`,
//         "method": "GET",
//         "timeout": 0,
//       };

//       $.ajax(settings3).done(function (response3) { // response 3 is the current drink posibility being checked
//         var haveIngredient;
//         // console.log("response3 = "+response3);
//         for (var haveIngCount = 0; haveIngCount < chosenIngArr.length; haveIngCount++) {
//           // console.log(response3.drinks[0].strIngredient+`${reqIngCount+1}`);
//           for (var reqIngCount = 0; reqIngCount < 15 && response3.drinks[0]["strIngredient" + (reqIngCount + 1)] !== null; reqIngCount++) {
//             // var newSource = `strIngredient${reqIngCount}`;
//             // console.log(response3);  RECENT HIDE ---------------
//             console.log("chosenIngArr -> " + chosenIngArr + " strI -> " + response3.drinks[0]["strIngredient" + (reqIngCount + 1)]); //+`${reqIngCount+1}`);
//             console.log("reqIngCount: " + reqIngCount + ", haveIngCount: " + haveIngCount + ", actual ingredient is: " + response3.drinks[0]["strIngredient" + (reqIngCount + 1)]);
//             if (chosenIngArr.includes(response3.drinks[0]["strIngredient" + (reqIngCount + 1)]) || response3.drinks[0]["strIngredient" + (reqIngCount + 1)] === null) {
//               haveIngredient = true;
//               console.log("current drink: " + response3.drinks[0].strDrink + ", haveIngredient: " + haveIngredient);
//             } else {
//               haveIngredient = false;
//               console.log("current drink: " + response3.drinks[0].strDrink + ", haveIngredient: " + haveIngredient);
//               break;
//             }
//           };
//           // console.log("haveIngredient : "+response3.drinks[0]["strIngredient"+(reqIngCount+1)]+" ---> "+haveIngredient)
//           // }
//           // console.log("haveIngredient ----> " + haveIngredient);  RECENT HIDE ---------
//           if (haveIngredient && canMakeDrinksArr.includes(response3.drinks[0].strDrink) !== true) {
//             canMakeDrinksArr.push(response3.drinks[0].strDrink)
//           };
//         };
//       });
//     };
//   });
// };

// // var haveIngredient; 
// // if (haveIngredient) {}
// // currentIngDrnksIDArr.push(response2.drinks[availDrinksCount].idDrink);
// // }
// //   });

// // };
// var intvl = setTimeout(function () {
//   console.log("canMakeDrinksArr --->" + canMakeDrinksArr);
//   alcoholChoicesArr.sort();
//   mixerChoicesArr.sort();
//   console.log("alcohol choices -------> " + alcoholChoicesArr);
//   console.log("# of alcohols ------->" + alcoholChoicesArr.length);
//   console.log("mixer choices -------> " + mixerChoicesArr);
//   console.log("# of mixers -----> " + mixerChoicesArr.length);
//   for (var i = 0; i < alcoholChoicesArr.length; i++) {
//     $("#liquor-list").append(`<input type="checkbox" name="ing" value="${alcoholChoicesArr[i]}">${alcoholChoicesArr[i]}<br>`)
//   };
//   for (var i = 0; i < mixerChoicesArr.length; i++) {
//     $("#mixer-list").append(`<input type="checkbox" name="ing" value="${mixerChoicesArr[i]}">${mixerChoicesArr[i]}<br>`)
//   };
// }, 2000);


// //ajax call for random joke
// $.ajax({
//   url: jokeURL,
//   method: "GET"
// }).then(function (response) {

//   //creating dynamically the header
//   var jokeHeading = $("<h5 class='h5'>");
//   $(jokeHeading).append("Random Joke");
//   $("#joke").append(jokeHeading);

//   // for two part joke
//   var joke = $("<p class='joke-holder'>");
//   var jokeOne = $("<p class='joke-holder'>");

//   $(joke).append(response.setup);
//   $(jokeOne).append(response.delivery);

//   $("#joke").append(joke, jokeOne)

// });
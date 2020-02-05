$(document).ready(function () {
  var chosenIngArr = []; // var chosenIngArr = ["Kahlua", "Vodka", "Orange juice", "Baileys irish cream", "Bourbon"];
  var currentIngDrnksIDArr = [];
  var canMakeDrinksArr = [];
  var alcoholChoicesArr = [];
  var mixerChoicesArr = [];
  var jokeURL = "https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist&type=twopart";
  var month = ["Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  //var currentDate = moment().format('MMMM Do YYYY');


  //~~~~~~~~~~~~~~~~~~~~~~~~~code for 1st page~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  $(".button").on("click", function () {
    $(".cocktails").hide();
    $(".image2").removeClass("is-hidden");
    $(".image2").addClass("hero is-fullheight")
  });

  $("#user-submit").on("click", function(){
    $(".image2").hide();
    $(".solid").removeClass("is-hidden");
    $(".solid").addClass("hero is-fullheight");
  })

  
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

    // This will loop through the returned drinks from the current ing and push their names to the currentIngDrnksIDArr  MAY NOT NEED CURRENTINGDRNKSIDARR
    $.ajax(settings2).done(function (response2) {

      // console.log("response2 = "+response2); response2 is the page drinks possible from the current ingredient
      //   })
      // }
      for (var availDrinksCount = 0; availDrinksCount < response2.drinks.length; availDrinksCount++) {

        // console.log("availDrinksCount = "+availDrinksCount)
        var settings3 = {
          // this is bringing up each drink possible with one of the ing.  brought up by id
          "url": `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${response2.drinks[availDrinksCount].idDrink}`,
          "method": "GET",
          "timeout": 0,
        };

        $.ajax(settings3).done(function (response3) { // response 3 is the current drink posibility being checked
          var haveIngredient;
          // console.log("response3 = "+response3);
          for (var haveIngCount = 0; haveIngCount < chosenIngArr.length; haveIngCount++) {
            // console.log(response3.drinks[0].strIngredient+`${reqIngCount+1}`);
            for (var reqIngCount = 0; reqIngCount < 15 && response3.drinks[0]["strIngredient" + (reqIngCount + 1)] !== null; reqIngCount++) {
              // var newSource = `strIngredient${reqIngCount}`;
              // console.log(response3);  RECENT HIDE ---------------
              console.log("chosenIngArr -> " + chosenIngArr + " strI -> " + response3.drinks[0]["strIngredient" + (reqIngCount + 1)]); //+`${reqIngCount+1}`);
              console.log("reqIngCount: " + reqIngCount + ", haveIngCount: " + haveIngCount + ", actual ingredient is: " + response3.drinks[0]["strIngredient" + (reqIngCount + 1)]);
              if (chosenIngArr.includes(response3.drinks[0]["strIngredient" + (reqIngCount + 1)]) || response3.drinks[0]["strIngredient" + (reqIngCount + 1)] === null) {
                haveIngredient = true;
                console.log("current drink: " + response3.drinks[0].strDrink + ", haveIngredient: " + haveIngredient);
              } else {
                haveIngredient = false;
                console.log("current drink: " + response3.drinks[0].strDrink + ", haveIngredient: " + haveIngredient);
                break;
              }
            };
            // console.log("haveIngredient : "+response3.drinks[0]["strIngredient"+(reqIngCount+1)]+" ---> "+haveIngredient)
            // }
            // console.log("haveIngredient ----> " + haveIngredient);  RECENT HIDE ---------
            if (haveIngredient && canMakeDrinksArr.includes(response3.drinks[0].strDrink) !== true) {
              canMakeDrinksArr.push(response3.drinks[0].strDrink)
            };
          };
        });
      };
    });
  };

  // var haveIngredient; 
  // if (haveIngredient) {}
  // currentIngDrnksIDArr.push(response2.drinks[availDrinksCount].idDrink);
  // }
  //   });

  // };
  var intvl = setTimeout(function () {
    console.log("canMakeDrinksArr --->" + canMakeDrinksArr);
    alcoholChoicesArr.sort();
    mixerChoicesArr.sort();
    console.log("alcohol choices -------> " + alcoholChoicesArr);
    console.log("# of alcohols ------->" + alcoholChoicesArr.length);
    console.log("mixer choices -------> " + mixerChoicesArr);
    console.log("# of mixers -----> " + mixerChoicesArr.length);
    for (var i = 0; i < alcoholChoicesArr.length; i++) {
      $("#liquor-list").append(`<input type="checkbox" name="ing" value="${alcoholChoicesArr[i]}">${alcoholChoicesArr[i]}<br>`)
    };
    for (var i = 0; i < mixerChoicesArr.length; i++) {
      $("#mixer-list").append(`<input type="checkbox" name="ing" value="${mixerChoicesArr[i]}">${mixerChoicesArr[i]}<br>`)
    };
  }, 2000);


  //ajax call for random joke
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


});
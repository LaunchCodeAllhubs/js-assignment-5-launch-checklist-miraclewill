// Write your JavaScript code here!

//  const { formSubmission, myFetch, addDestinationInfo } = require("./scriptHelper");

window.addEventListener("load", function() {
    const form = document.querySelector("form");
    const list = document.getElementById('faultyItems');
    list.style.visibility = 'hidden';
    form.addEventListener("submit", function (event){
        event.preventDefault();
        // List DOM elements
        let pilot = document.querySelector("input[name=pilotName]").value;
        let copilot = document.querySelector("input[name=copilotName]").value;
        let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
        let cargoLevel = document.querySelector("input[name=cargoMass]").value;

        // call formsubmission to validate and update list
        formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);
    });

   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
       let selectedPlanet = pickPlanet(listedPlanets);
       addDestinationInfo(document, selectedPlanet.name, selectedPlanet.diameter, selectedPlanet.star, selectedPlanet.distance, selectedPlanet.moons, selectedPlanet.image);
   })
   
});
// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   let missionTarget = document.getElementById('missionTarget');
   missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name} </li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons} </li>
                </ol>
                <img src="${imageUrl}">
`
}

function validateInput(testInput) {
   if (testInput === "") {
    return "Empty";
   } else if (isNaN(testInput) === true) {
    return "Not a Number";
   } else if (isNaN(testInput) === false) {
    return "Is a Number";
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    // validate what the user has typed, we r referencing the input elements by the user
    let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   let launchStatus = document.getElementById('launchStatus');
// use validateInput() to complete this function. Add an alert that all fields are required & correct data type
// pilot and copilot names are strings. fuellevel & cargolevel are numbers
if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
    window.alert("All fields are required.");
} else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || isNaN(fuelLevel) === "Not a Number" || isNaN(cargoLevel) === "Not a Number") {
    window.alert("Please enter valid information in the required fields.");
} else {
// update shuttle status/requirements
pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
// update faulty items(visible) & fuel status
if (fuelLevel < 10000 && cargoLevel > 10000) {
    list.style.visibility = "visible";
    fuelStatus.innerHTML = `Fuel level too low for launch`;
    cargoStatus.innerHTML = `Cargo mass too heavy for launch`
    launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
    launchStatus.style.color = "#C7254E";
} else if (fuelLevel > 10000 && cargoLevel > 10000) {
    list.style.visibility = "visible";
    fuelStatus.innerHTML = `Fuel level high enough for launch`;
    cargoStatus.innerHTML = `Cargo mass too heavy for launch`
    launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
    launchStatus.style.color = "#C7254E";
} else if (fuelLevel < 10000 && cargoLevel < 10000) {
    list.style.visibility = "visible";
    fuelStatus.innerHTML = `Fuel level too low for launch`;
    cargoStatus.innerHTML = `Cargo mass low enough for launch`;
    launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
    launchStatus.style.color = "#C7254E";
}else {
    fuelStatus.innerHTML = `Fuel level high enough for launch`;
    cargoStatus.innerHTML = `Cargo mass low enough for launch`;
    launchStatus.innerHTML = "Shuttle is Ready for Launch";
    launchStatus.style.color = "#419F6A";
}
};
};

async function myFetch() {
    let planetsReturned;
// added planet data from launchcode website; make note of index number of chosen planet
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        if (response.status >= 400) {
            throw new Error('bad response');
        } else {
        return response.json();
        }
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random() * planets.length);
    return planets[index];
};

// rounds down; selects random amongst array
module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;

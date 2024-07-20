/* Global Variables */
const APIKEY = "00e7d692b765a9f719628b8997791244&units=imperial";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

/* Function to GET Web API Data*/
const getWeatherData = async (url, zip, apiKey) => {
    try {
        const response = await fetch(`${url}?zip=${zip}&appid=${apiKey}`);
        if (!response.ok) {
            if (response.status == "404") {
                throw new Error(`Please check the zip code and try again!`);
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        }
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        throw new Error(error);
    }
};

/* Function to POST data */
const addProjectData = async (path = "", data = {}) => {
    try {
        const feelings = document.getElementById("feelings").value;

        const response = await fetch(path, {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                temperature: data.main.temp,
                date: getDate(),
                userResponse: feelings,
            }),
        });

        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error: ", error);
    }
};

/* Function to GET Project Data and update UI */
const retrieveData = async () => {
    try {
        // Retrieve data from our app
        const response = await fetch("/getData");
        const projectData = await response.json();

        // Select the necessary elements on the DOM & Update their necessary values
        document.getElementById("date").innerHTML =
            "<strong>Date:</strong> " + projectData.date;
        document.getElementById("temp").innerHTML =
            "<strong>Temperature:</strong> " +
            Math.round(projectData.temp) +
            " degrees";
        document.getElementById("content").innerHTML =
            "<strong>User Response:</strong> " + projectData.feel;
    } catch (error) {
        console.log("error: ", error);
    }
};

// Create a new date instance dynamically with JS
const getDate = () => {
    let d = new Date();
    return d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
};

/* Function called by event listener */
const fetchWeatherDataAndUpdateUI = () => {
    const zipcode = document.getElementById("zip").value;
    getWeatherData(baseUrl, zipcode, APIKEY)
        .then((weatherData) => {
            addProjectData("/addData", weatherData).then(() => retrieveData());
        })
        .catch((error) => {
            alert(error.message);
        });
};

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", fetchWeatherDataAndUpdateUI);

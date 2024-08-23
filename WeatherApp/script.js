FetchWeather = async (cityname) => {
  const apiKey = "91QpjVZEcLm6FM3AwHwUZdvwVdE9g02K"
  const url = `https://api.tomorrow.io/v4/weather/forecast?location=${cityname}&apikey=${apiKey}`
  const options = {
    method: "GET",
    headers: { accept: "application/json" },
  };
  const response = await fetch(url, options)
  let result = await response.json()
  return result
};

document.querySelector(".get-weather-btn").addEventListener("click", async () => {
    let cityname = document.querySelector(".city-input").value;
    result = await FetchWeather(cityname);
    if (
      result.hasOwnProperty("type") &&
      result.type === "Invalid Query Parameters"
    ) {
      document.querySelector("#weather-description").textContent =
        "City Not Found - Enter valid city";
    } else {
      PopulateWeather(result);
    }
  });

PopulateWeather = (result) => {
    let enteredLocation = result.location.name
    let temperatureAvg = Math.round(result.timelines.daily[0].values.temperatureAvg)
    let temperatureFeelsLike = Math.round(result.timelines.daily[0].values.temperatureApparentAvg)
    let humidityAvg = Math.round(result.timelines.daily[0].values.humidityAvg)
    let windSpeed = parseFloat(result.timelines.daily[0].values.windSpeedAvg*1.60934).toFixed(2)

    document.querySelector("#entered-city").textContent = `Entered Location: ${enteredLocation}`
    document.querySelector("#temperature").textContent = `Temperature ${temperatureAvg}°C`
    document.querySelector("#feels-like").textContent = `Feeks Like ${temperatureFeelsLike}°C`
    document.querySelector("#humidity").textContent = `${humidityAvg}% Humidity`
    document.querySelector("#wind-speed").textContent = `WindSpeed: ${windSpeed} Kmph`

    // Populate Img and TagLine

    let snowAccumulation = Math.round(result.timelines.daily[0].values.snowAccumulationSum)
    let precipitationProbabilityMax = Math.round(result.timelines.daily[0].values.precipitationProbabilityMax)
    let visibilityAvg = Math.round(result.timelines.daily[0].values.visibilityAvg)
    let cloudCoverAvg = Math.round(result.timelines.daily[0].values.cloudCoverAvg)
    let rainIntensityMax = Math.round(result.timelines.daily[0].values.rainIntensityMax)
    let snowIntensityMax = Math.round(result.timelines.daily[0].values.snowIntensityMax)

    let weatherDescription = document.querySelector("#weather-description")
    let weatherImage = document.querySelector("#weather-image")
    if(snowAccumulation>0){
        weatherDescription.textContent = "Snowfall expected."
        weatherImage.src = "Images/snow.png"
    }else if(precipitationProbabilityMax>50){
        weatherDescription.textContent = "Rain ahead."
        weatherImage.src = "Images/rain.png"
    }else if(visibilityAvg<5 && humidityAvg>80){
        weatherDescription.textContent = "Low visibility."
        weatherImage.src = "Images/mist.png"
    }else if(cloudCoverAvg>50 && (rainIntensityMax<1 || snowIntensityMax<1)){
        weatherDescription.textContent = "Cloudy skies."
        weatherImage.src = "Images/clouds.png"
    }else{
        weatherDescription.textContent = "Clear skies."
        weatherImage.src = "Images/clear.png"
    }
};

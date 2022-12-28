import React, { useEffect, useState } from "react";
import evening from "../Media/evening.jpg";

const Home = () => {
  const [weatherState, setweatherState] = useState({
    coord: {
      lon: 10.99,
      lat: 44.34,
    },
    weather: [
      {
        id: 804,
        main: "Clouds",
        description: "overcast clouds",
        icon: "04d",
      },
    ],
    base: "stations",
    main: {
      temp: 279.57,
      feels_like: 279.57,
      temp_min: 277.97,
      temp_max: 280.34,
      pressure: 1025,
      humidity: 93,
      sea_level: 1025,
      grnd_level: 937,
    },
    visibility: 10000,
    wind: {
      speed: 1.22,
      deg: 30,
      gust: 0.98,
    },
    clouds: {
      all: 96,
    },
    dt: 1672234010,
    sys: {
      type: 2,
      id: 2004688,
      country: "IT",
      sunrise: 1672210279,
      sunset: 1672242205,
    },
    timezone: 3600,
    id: 3163858,
    name: "Zocca",
    cod: 200,
  });

  const key =
    "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=aaa66796b8553651c95dfb9c2e7f0e59";

  return (
    <div className="home d-flex">
      <img src={evening} alt="" className="bg-img" />

      <h1 className="text-white text-start position-absolute">CloudCast</h1>

      <div className="bigInfo bg-success w-100">
        <div className="desc bg-danger">
          <h1>{ 
          weatherState.main.temp - 273 >= 10
          ? (weatherState.main.temp - 273).toFixed(0)
            : ("0" + (weatherState.main.temp - 273).toFixed(0)).slice(-2)

          }&#176;</h1>
        </div>
      </div>


      <div className="info d-flex flex-column">
        <div>
          <input type="text" />
          <button className="search"></button>
        </div>
        <button className="searchSuggestion text-grey">India</button>
        <button className="searchSuggestion text-grey">China</button>
        <button className="searchSuggestion text-grey">Manchester</button>
        <button className="searchSuggestion text-grey">Canada</button>
        <hr />
        <h2 className="text-white">Weather Details</h2>
        <div className="row">
          <p className="text-grey col">
            Cloudy <br />
            Humidity <br />
            Wind <br />
          </p>

          <p className="col text-white text-end">
            {weatherState.clouds.all}% <br />
            {weatherState.main.humidity}% <br />
            {weatherState.wind.speed} km/h <br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

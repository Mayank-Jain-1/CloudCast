import React, { useEffect, useState } from "react";
import thunderstorm from "../Media/thunderstorm.jpg";
import thunderstormday from "../Media/thunderstorm-day.jpg";
import cloudday from "../Media/cloudday.jpg";
import cloudeven from "../Media/cloudeven.jpg";
import cloudnight from "../Media/cloudnight.jpg";
import clearnight from "../Media/clearnight.jpg";
import clearday from "../Media/clearday.jpeg";
import cleareven from "../Media/cleareven.jpg";
import drizzle from "../Media/drizzle.jpg";
import snowday from "../Media/snowday.jpg";
import snownight from "../Media/snownight.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import {
  BsCloudLightningRain,
  BsCloudDrizzle,
  BsCloudRainHeavy,
  BsCloudSun,
  BsCloudMoon,
  BsMoon,
  BsSun,
  BsSnow2,
} from "react-icons/bs";

import { WiSunset } from "react-icons/wi";

const Home = () => {
  const [weatherState, setWeatherState] = useState({
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
      temp: 279.5,
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
    timezone: -18000,
    id: 3163858,
    name: "Zocca",
    cod: 200,
  });
  const [timeString, setTimeString] = useState("");
  const [timeDate, setTimeDate] = useState(new Date());
  const [mediaState, setMediaState] = useState({
    bg: clearday,
    accentColor: "#528eba",
    icon: <BsSun />,
  });

  const fetchCord = async () => {
    const name = document.getElementById("searchInput").value;
    const coord = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=aaa66796b8553651c95dfb9c2e7f0e59`
    ).then((res) => res.json());

    if (Array.isArray(coord) && coord.length > 0) fetchData(coord[0]);
    else {
    }
  };

  const fetchName = async (name) => {
    const coord = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=aaa66796b8553651c95dfb9c2e7f0e59`
    ).then((res) => res.json());
    fetchData(coord[0]);
    calcTime();
  };

  const fetchData = async (coord) => {
    const weather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=aaa66796b8553651c95dfb9c2e7f0e59`
    ).then((res) => res.json());
    setWeatherState(weather);
  };

  function calcTime() {
    let timezone = weatherState.timezone;
    let localDate = new Date();
    let diff = localDate.getTimezoneOffset();
    let timezoneDate = new Date(
      localDate.getTime() + diff * 60000 + timezone * 1000
    );
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let result =
      ("0" + timezoneDate.getHours()).slice(-2) +
      ":" +
      ("0" + timezoneDate.getMinutes()).slice(-2) +
      " - " +
      days[timezoneDate.getDay()] +
      ", " +
      timezoneDate.getDate() +
      " " +
      months[timezoneDate.getMonth()] +
      " '" +
      timezoneDate.getFullYear().toString().slice(-2);
    setTimeDate(timezoneDate);
    setTimeString(result);
  }

  useEffect(() => {
    fetchName("Delhi");
  }, []);

  useEffect(() => {
      calcTime();
  }, [weatherState]);
  useEffect(() => {
      calcMedia();
  }, [timeString]);

  

  const calcMedia = () => {
    let currTime = timeDate.getHours();
    let weather = weatherState.weather[0].main;

    if (weather === "Thunderstorm") {
      setMediaState({
        bg: currTime > 20 || currTime < 5 ? thunderstorm : thunderstormday,
        accentColor: "#7e7d85",
        icon: <BsCloudLightningRain />,
      });
    } else if (weather === "Drizzle") {
      setMediaState({
        bg: drizzle,
        accentColor: "#1f3d50",
        icon: <BsCloudDrizzle />,
      });
    } else if (weather === "Rain") {
      setMediaState({
        bg: currTime > 20 || currTime < 5 ? thunderstorm : thunderstormday,
        accentColor: "#7e7d85",
        icon: <BsCloudRainHeavy />,
      });
    } else if (weather === "Clouds") {
      if (currTime > 20 || currTime < 5) {
        setMediaState({
          bg: cloudnight,
          accentColor: "#66584d",
          icon: <BsCloudMoon />,
        });
      } else if (currTime > 16) {
        setMediaState({
          bg: cloudeven,
          accentColor: "#e8b151",
          icon: <BsCloudSun />,
        });
      } else {
        setMediaState({
          bg: cloudday,
          accentColor: "#0e93d8",
          icon: <BsCloudSun />,
        });
      }
    } else if (weather === "Snow") {
      setMediaState({
        bg: currTime > 20 || currTime < 5 ? snownight : snowday,
        accentColor: "#0b0a0f",
        icon: <BsSnow2 />,
      });
    } else {
      if (currTime > 20 || currTime < 5) {
        setMediaState({
          bg: clearnight,
          accentColor: "#0c110b",
          icon: <BsMoon />,
        });
      } else if (currTime > 15) {
        setMediaState({
          bg: cleareven,
          accentColor: "#f18f63",
          icon: <WiSunset />,
        });
      } else {
        setMediaState({
          bg: clearday,
          accentColor: "#528eba",
          icon: <BsSun />,
        });
      }
    }
  };

  return (
    <div className="home d-flex">
      <img src={mediaState.bg} alt="" className="bg-img" />

      <div className="bigInfo w-100 d-flex flex-column justify-content-between">
        <h1 className="heading text-white text-start ">CloudCast</h1>

        <div className="desc d-flex align-items-center text-white">
          <h1 className="temp me-2">
            {weatherState.main.temp - 273 >= 10
              ? (weatherState.main.temp - 273).toFixed(0)
              : ("0" + (weatherState.main.temp - 273).toFixed(0)).slice(-2)}
            &#176;
          </h1>

          <div className="nameDiv me-4">
            <h1 className="name mb-0">{weatherState.name}</h1>
            <p className="timeStamp mb-0">{timeString}</p>
          </div>

          <div className="icondiv ms-4 d-flex flex-column justify-content-start">
            <div className="icon mb-0" style={{ fontSize: "85px" }}>
              {mediaState.icon}
            </div>
            <p className="mb-5 mt-0">{weatherState.weather[0].main}</p>
          </div>

          <div></div>
        </div>
      </div>

      <div className="info d-flex flex-column">
        <div className="search d-flex mb-4">
          <input
            id="searchInput"
            className="searchInput border-bottom"
            type="text"
            placeholder="City Name"
          />
          <button
            onClick={fetchCord}
            className="searchBtn"
            style={{ backgroundColor: mediaState.accentColor }}
          >
            <FontAwesomeIcon icon={faSearch} className="fs-4"></FontAwesomeIcon>
          </button>
        </div>
        <div className="suggestions d-flex flex-column border-bottom pb-4 mb-4 text-white">
          <button
            onClick={() => fetchName("London")}
            className="searchSuggestion p-0 mb-3"
          >
            London
          </button>
          <button
            onClick={() => fetchName("Beijing")}
            className="searchSuggestion p-0 mb-3"
          >
            Beijing
          </button>
          <button
            onClick={() => fetchName("Delhi")}
            className="searchSuggestion p-0 mb-3"
          >
            Delhi
          </button>
          <button
            onClick={() => fetchName("Venice")}
            className="searchSuggestion p-0 mb-3"
          >
            Venice
          </button>
        </div>
        <h4 className="text-white mb-4">Weather Details</h4>
        <div className="row">
          <div className="text-white col">
            <p>Cloudy</p>
            <p>Humidity</p>
            <p>Wind</p>
          </div>

          <div className="col text-white text-end">
            <p>{weatherState.clouds.all}% </p>
            <p>{weatherState.main.humidity}% </p>
            <p>{weatherState.wind.speed} km/h </p>
          </div>
        </div>

        <h4 className="text-white py-4 border-top">Temperature Details</h4>
        <div className="row">
          <div className="text-white col">
            <p>Current</p>
            <p>Minimum</p>
            <p>Maximum</p>
          </div>

          <div className="col text-white text-end">
            <p>{(weatherState.main.temp -273.0000).toFixed(3)} &#176;C </p>
            <p>{(weatherState.main.temp_min -273).toFixed(3)} &#176;C </p>
            <p>{(weatherState.main.temp_max -273).toFixed(3)} &#176;C </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import evening from "../Media/evening.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
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
    cod: 200
  });
  const [timeString, setTimeString] = useState("")

  const fetchCord = async () => {
    const name = document.getElementById('searchInput').value
    const coord = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=aaa66796b8553651c95dfb9c2e7f0e59`
      ).then((res) => res.json());
      console.log(coord);
      if (Array.isArray(coord) && coord.length > 0) fetchData(coord[0])
      else{
      console.log("wrong");
    }
  };

  const fetchName =async (name) =>{
    const coord = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=aaa66796b8553651c95dfb9c2e7f0e59`
    ).then((res) => res.json());
    fetchData(coord[0]);
    calcTime();
  }

  const fetchData = async (coord) => {
    const weather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=aaa66796b8553651c95dfb9c2e7f0e59`
    ).then((res) => res.json());
    setWeatherState(weather);
  };

  function calcTime(){
    let timezone = weatherState.timezone;
    let localDate = new Date();
    let diff = localDate.getTimezoneOffset()
    let timezoneDate = new Date( localDate.getTime() + diff*60000 + timezone*1000)
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let result = ("0"+timezoneDate.getHours()).slice(-2) + ':' + ("0"+ timezoneDate.getMinutes()).slice(-2) + 
    " - " + days[timezoneDate.getDay()] + ", " + timezoneDate.getDate() + " " + months[timezoneDate.getMonth()] + " '" + timezoneDate.getFullYear().toString().slice(-2)
    setTimeString(result);
  }

  useEffect(() => {
    fetchName("Delhi");
  }, [])

  useEffect(()=>{
    calcTime();
  }, [weatherState])



  return (
    <div className="home d-flex">
      <img src={evening} alt="" className="bg-img" />

      <button onClick={calcTime} className="btn btn-primary">
        Get date
      </button>

      <div className="bigInfo w-100 d-flex flex-column justify-content-between p-5">
        <h1 className="text-white text-start ">CloudCast</h1>

        <div className="desc d-flex align-items-center text-white">
          <h1 className="temp me-0">
            {weatherState.main.temp - 273 >= 10
              ? (weatherState.main.temp - 273).toFixed(0)
              : ("0" + (weatherState.main.temp - 273).toFixed(0)).slice(-2)}
            &#176;
          </h1>

          <div className="me-4">
            <h1 className="name mb-0">{weatherState.name}</h1>
            <p className="timeStamp mb-0">{timeString}</p>
          </div>

          <div></div>
        </div>
      </div>

      <div className="info d-flex flex-column">
        <div className="search d-flex mb-4">
          <input id='searchInput' className="searchInput border-bottom" type="text" placeholder="City Name" />
          <button onClick={fetchCord} className="searchBtn ">
            <FontAwesomeIcon icon={faSearch} className='fs-4'></FontAwesomeIcon>
          </button>
        </div>
        <div className="suggestions d-flex flex-column border-bottom pb-4 mb-4">
          <button onClick={() => fetchName('London')} className="searchSuggestion text-grey p-0 mb-3">London</button>
          <button onClick={() => fetchName('Beijing')} className="searchSuggestion text-grey p-0 mb-3">Beijing</button>
          <button onClick={() => fetchName('Delhi')} className="searchSuggestion text-grey p-0 mb-3">
            Delhi
          </button>
          <button onClick={() => fetchName('Venice')} className="searchSuggestion text-grey p-0 mb-3">
            Venice
          </button>
        </div>
        <h4 className="text-white mb-4">Weather Details</h4>
        <div className="row">
          <div className="text-grey col">
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
      </div>
    </div>
  );
};

export default Home;

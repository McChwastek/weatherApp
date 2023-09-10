// Imports

import React, { useState } from "react";
import "./WeatherApp.css";

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

// Code

const WeatherApp = () => {
  const api_key = "d1a336d85c40bfbf617875df7552ee33";
  const [cityInput, setCityInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(cloud_icon);

  const search = async () => {
    if (cityInput === "") {
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=Metric&appid=${api_key}`;

    const response = await fetch(url);
    const data = await response.json();
    setWeatherData(data);

    const weatherIconCode = data.weather[0].icon;
    if (weatherIconCode.includes("01")) {
      setWeatherIcon(clear_icon);
    } else if (weatherIconCode.includes("02")) {
      setWeatherIcon(cloud_icon);
    } else if (weatherIconCode.includes("03")) {
      setWeatherIcon(drizzle_icon);
    } else if (weatherIconCode.includes("04")) {
      setWeatherIcon(drizzle_icon);
    } else if (weatherIconCode.includes("09")) {
      setWeatherIcon(rain_icon);
    } else if (weatherIconCode.includes("10")) {
      setWeatherIcon(rain_icon);
    } else if (weatherIconCode.includes("13")) {
      setWeatherIcon(snow_icon);
    } else {
      setWeatherIcon(cloud_icon);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Wyszukaj miasto"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      {weatherData && (
        <div>
          <div className="weather-image">
            <img src={weatherIcon} alt="" />
          </div>
          <div className="weather-temp">{weatherData.main.temp}°C</div>
          <div className="weather-location">{weatherData.name}</div>
          <div className="data-container">
            <div className="element">
              <img src={humidity_icon} alt="" className="icon" />
              <div className="data">
                <div className="humidity-percent">
                  {weatherData.main.humidity}%
                </div>
                <div className="text">Wilgotność</div>
              </div>
            </div>
            <div className="element">
              <img src={wind_icon} alt="" className="icon" />
              <div className="data">
                <div className="wind-rate">{weatherData.wind.speed} km/h</div>
                <div className="text">Prędkość wiatru</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;

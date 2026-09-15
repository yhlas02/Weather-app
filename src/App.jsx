import {useState, useEffect, useRef} from "react";
import partlyCloudyDay from "@meteocons/svg/fill/partly-cloudy-day.svg";
import { Search } from "lucide-react";

import ErrorMessage from "./components/ErrorMessage.jsx";
import WelcomePage from "./components/WelcomePage.jsx";
import WeatherDetails from "./components/WeatherDeatails.jsx";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const [geoData, setGeoData] = useState({latitude: null, longitude: null});
  const [isFetchingGeo, setIsFetchingGeo] = useState(false);
  const [geoError, setGeoError] = useState(null);
  
  const [cityName, setCityName] = useState("");
  const city = useRef();

    const formattedDate = weatherData ? new Intl.DateTimeFormat ("en-GB", {
      timeZone: weatherData.timezone,
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date()) : "";

  function handleClick() {
    const searchedCity = city.current.value;
    setCityName(searchedCity);
    city.current.value = "";
  }

  useEffect(() => {
    if(cityName === "") {
      setWeatherData(null);
      setError(null);
      setGeoError(null);
      return;    
    }
    async function getCityCoords() {
      setIsFetchingGeo(true);
      try{
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`);
        const geoCoords = await geoResponse.json();
        if(!geoResponse.ok) {
          throw new Error("Failed to get geo data");
        }
        setGeoData({latitude: geoCoords.results[0].latitude, longitude: geoCoords.results[0].longitude});
        setGeoError(null);
      } catch(error){
        setGeoError({message: error.message || "An incorrect city name. Please try again!"});
      }
      setIsFetchingGeo(false);
    }
    getCityCoords();
  }, [cityName]);

  useEffect(() => {
    if(geoData.latitude === null || geoData.longitude === null) {
      return;
    }
    async function getWeatherData() {
      setIsFetching(true);
      try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${geoData.latitude}&longitude=${geoData.longitude}&current=relative_humidity_2m,wind_speed_10m,surface_pressure,uv_index,temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=7`);
        const data = await response.json();
        if(!response.ok){
          throw new Error("Failed to get weather forecast!");
        }
        setWeatherData(data);
        setError(null);
        console.log(data);
      }catch(error) {
        setError({message: error.message || "Failed to get weather data"});
      }
      setIsFetching(false);
    }
    getWeatherData();
  }, [geoData.latitude, geoData.longitude]);

  let weatherDetails;

  if(!weatherData && !error && !geoError) {
    weatherDetails = <WelcomePage />
  } else if(weatherData && !error && !geoError) {
    weatherDetails = <WeatherDetails 
                        weatherData={weatherData} 
                        isFetching={isFetching} 
                        isFetchingGeo={isFetchingGeo} 
                        cityName={cityName}
                        dateTime={formattedDate} 
                      />
  } else if (error || geoError) {
    weatherDetails = <ErrorMessage />
  }

  return (
    <>
      <div className="weather-container">
        <div className="search-bar">
          <div className="weather-app-title">
            <span>
              <img 
                src={partlyCloudyDay}
                alt="Partly cloudy"
                width="100"
                height="100"
              />
            </span>
            <p>Weather App</p>
          </div>
          <div className="search-wrapper">
            <Search size={20} className="search-icon" />
            <input type="text" ref={city} placeholder="Search for a city..." />
          </div>
          <button onClick={handleClick}> Search </button>
        </div>
        {weatherDetails}
      </div>
    </>
  )
}

export default App;

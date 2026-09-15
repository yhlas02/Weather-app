import { MapPin, Droplets, Wind, Gauge, Sun } from "lucide-react";
import clearDay from "@meteocons/svg/fill/clear-day.svg";
import partlyCloudyDay from "@meteocons/svg/fill/partly-cloudy-day.svg";
import overCast from "@meteocons/svg/fill/overcast.svg";
import rain from "@meteocons/svg/fill/rain.svg";
import partlyCloudyRain from "@meteocons/svg/fill/partly-cloudy-day-rain.svg";
import thunderstorm from "@meteocons/svg/fill/thunderstorms-day-rain.svg";
import snow from "@meteocons/svg/fill/snow.svg";

const ICON_W_H = "55";

export default function WeatherDetails({weatherData, isFetching, isFetchingGeo, cityName, dateTime}) {

    const forecast = weatherData.daily.time.map((date, index) => ({
        date,
        day: new Date(date).toLocaleDateString("en-US", {weekday: "long"}),
        maxTemp: weatherData.daily.temperature_2m_max[index],
        minTemp: weatherData.daily.temperature_2m_min[index],
        weatherCode: weatherData.daily.weather_code[index]
    }));

    const mondayIndex = forecast.findIndex( day => day.day === "Monday");
    const mondayFirstForecast = [...forecast.slice(mondayIndex), ...forecast.slice(0, mondayIndex)];
    const today = new Date().toISOString().split("T")[0];

    console.log(forecast);

    function getWeatherInfo(code) {
        if(code === 0) {
            return {
                description: "Clear sky",
                icon: <img 
                        src={clearDay}
                        alt="Sunny"
                        width="150"
                        height="150"
                    />
            };
        }

        if(code === 1 || code === 2) {
            return {
                description: "Partly cloudy",
                icon: <img 
                        src={partlyCloudyDay}
                        alt="Partly cloudy"
                        width="150"
                        height="150"
                    />
            };
        }

        if(code === 3) {
            return {
                description: "Overcast",
                icon: <img 
                        src={overCast}
                        alt="Overcastd"
                        width="150"
                        height="150"
                    />
            };
        }

        if(code >= 51 && code <= 57) {
            return {
                description: "Drizzle",
                icon: <img 
                        src={partlyCloudyRain}
                        alt="Drizzle"
                        width="150"
                        height="150"
                    />
            };
        }

        if(code >= 61 && code <= 67) {
            return {
                description: "Rain",
                icon: <img 
                        src={rain}
                        alt="Rain"
                        width="150"
                        height="150"
                    />
            };
        }

        if(code >= 71 && code <= 77) {
            return {
                description: "Snow",
                icon: <img 
                        src={snow}
                        alt="Snow"
                        width="150"
                        height="150"
                    />
            };
        }

        if(code >= 80 && code <= 82) {
            return {
                description: "Rain showers",
                icon: <img 
                        src={partlyCloudyRain}
                        alt="Rain showers"
                        width="150"
                        height="150"
                    />
            };
        }

        if(code >= 95) {
            return {
                description: "Thunderstorm",
                icon: <img 
                        src={thunderstorm}
                        alt="Thunderstorm"
                        width="150"
                        height="150"
                    />
            };
        }

        return {
            description: "Unknown",
            icon: <img 
                    src={clearDay}
                    alt="Unknown"
                    width="150"
                    height="150"
                />
        };
    }

    function getWeaklyWeatherIcons(code) {
        if(code === 0) {
            return {
                description: "Clear sky",
                icon: <img 
                        src={clearDay}
                        alt="Sunny"
                        width={ICON_W_H}
                        height={ICON_W_H}
                    />
            };
        }

        if(code === 1 || code === 2) {
            return {
                description: "Partly cloudy",
                icon: <img 
                        src={partlyCloudyDay}
                        alt="Partly cloudy"
                        width={ICON_W_H}
                        height={ICON_W_H}
                    />
            };
        }

        if(code === 3) {
            return {
                description: "Overcast",
                icon: <img 
                        src={overCast}
                        alt="Overcastd"
                        width={ICON_W_H}
                        height={ICON_W_H}
                    />
            };
        }

        if(code >= 51 && code <= 57) {
            return {
                description: "Drizzle",
                icon: <img 
                        src={partlyCloudyRain}
                        alt="Drizzle"
                        width={ICON_W_H}
                        height={ICON_W_H}
                    />
            };
        }

        if(code >= 61 && code <= 67) {
            return {
                description: "Rain",
                icon: <img 
                        src={rain}
                        alt="Rain"
                        width={ICON_W_H}
                        height={ICON_W_H}
                    />
            };
        }

        if(code >= 71 && code <= 77) {
            return {
                description: "Snow",
                icon: <img 
                        src={snow}
                        alt="Snow"
                        width={ICON_W_H}
                        height={ICON_W_H}
                    />
            };
        }

        if(code >= 80 && code <= 82) {
            return {
                description: "Rain showers",
                icon: <img 
                        src={partlyCloudyRain}
                        alt="Rain showers"
                        width={ICON_W_H}
                        height={ICON_W_H}
                    />
            };
        }

        if(code >= 95) {
            return {
                description: "Thunderstorm",
                icon: <img 
                        src={thunderstorm}
                        alt="Thunderstorm"
                        width={ICON_W_H}
                        height={ICON_W_H}
                    />
            };
        }

        return {
            description: "Unknown",
            icon: <img 
                    src={clearDay}
                    alt="Unknown"
                    width={ICON_W_H}
                    height={ICON_W_H}
                />
        };
    }

    const weatherInfo = getWeatherInfo(weatherData.current.weather_code);

    return (
        <>
            <div className="location-container">
                <div className="location-city">
                    <div className="location-city-1d">
                        <MapPin className="mapPin" size={25} />
                        <div>
                            <h2>{cityName}</h2>
                            <p>{dateTime}</p>
                        </div>
                    </div>
                    <div className="location-city-2d">
                        {weatherInfo.icon}
                        <div>
                            <h2>{Math.round(weatherData.current.temperature_2m)}° C</h2>
                            <p>{weatherInfo.description}</p>
                        </div>
                    </div>
                </div>
                <div className="other-weather-details">
                    <div className="other-details-1d">
                        <Droplets className="other-details-icon" />
                        <div>
                            <span>Humidity</span>
                            <span>{Math.round(weatherData.current.relative_humidity_2m)}%</span>
                        </div>
                        
                    </div>
                    <div className="other-details-1d">
                        <Wind className="other-details-icon"/>
                        <div>
                            <span>Wind Speed</span>
                            <span>{Math.round(weatherData.current.wind_speed_10m)} km/h</span>
                        </div>
                    </div>
                    <div className="other-details-1d">
                        <Gauge className="other-details-icon"/>
                        <div>
                            <span>Pressure</span>
                            <span>{Math.round(weatherData.current.surface_pressure)} hPa</span>
                        </div>
                    </div>
                    <div className="other-details-1d">
                        <Sun className="other-details-icon"/>
                        <div>
                            <span>UV Index</span>
                            <span>{Math.round(weatherData.current.uv_index)}</span>
                        </div>
                    </div>
                </div>
            </div> 

            { (isFetching || isFetchingGeo) && 
                <p>Fetching weather data...</p>
            }

            { (!isFetching && !isFetchingGeo) && ( 
                <ul className="week-container">
                    {mondayFirstForecast.map((dailyData, index) => (
                        <li className={dailyData.date === today ? "today" : ""}>
                            <p>{dailyData.day}</p>
                            <p>{getWeaklyWeatherIcons(dailyData.weatherCode).icon}</p>
                            <p>{Math.round(dailyData.maxTemp)}° / {Math.round(dailyData.minTemp)}°</p>
                        </li>
                    ))}
                </ul> 
            )}
        </> 
    )
}
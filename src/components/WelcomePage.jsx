import partlyCloudyDay from "@meteocons/svg/fill/partly-cloudy-day.svg";
import { Sun, CalendarDays, Wind, Droplets } from "lucide-react";
 
export default function WelcomePage() {
    return (
        <>
            <div className="welcome-page-container">
                <span>
                    <img 
                        src={partlyCloudyDay}
                        alt="Partly cloudy"
                        width="160"
                        height="160" />
                </span>
                <h2>Find out the weather <br /> in your city</h2>
                <p className="instruction-paragraph">Enter a city name in the search bar and get <br /> the latest weather information.</p>
                <ul className="welcome-page-ul">
                    <li>
                        <Sun className="welcome-page-icon" />
                        <p>Current weather</p>
                        <p className="welcome-p-ul-2p">Know how it feels right now</p>
                    </li>
                    <li>
                        <CalendarDays className="welcome-page-icon" />
                        <p>7-day forecast</p>
                        <p className="welcome-p-ul-2p">Plan ahead with confidence</p>
                    </li>
                    <li>
                        <Wind className="welcome-page-icon" />
                        <p>Wind Speed</p>
                        <p className="welcome-p-ul-2p">Stay prepared</p>
                    </li>
                    <li>
                        <Droplets className="welcome-page-icon" />
                        <p>Humidity</p>
                        <p className="welcome-p-ul-2p">Be ready for the day</p>
                    </li>
                </ul>   
            </div>
        </>
    )
}
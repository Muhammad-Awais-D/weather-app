import { useEffect, useState } from 'react'
import './App.css'

function App() {



  const [weather, setWeather]=useState();
  const [isLoading, setIsLoading] =useState(true);
  const iconChange = (code)=> {  
   // ☀️ Sunny / Clear
  if (code === 1000) return 'bi bi-sun-fill';
  // 🌤 Partly cloudy
  if (code === 1003) return 'bi bi-cloud-sun';
  // ☁️ Cloudy / Overcast
  if (code === 1006 || code === 1009) return 'bi bi-clouds';
  // 🌫 Fog / Mist
  if (code >= 1030 && code <= 1147) return 'bi bi-cloud-haze2';
  // 🌧 Rain / Drizzle
  if (code >= 1150 && code <= 1201) return 'bi bi-cloud-rain';
  // ❄️ Snow (example)
  if (code >= 1210 && code <= 1225) return 'bi bi-cloud-snow';
  // 🌨 Sleet / Ice
  if (code >= 1204 && code <= 1237) return 'bi bi-cloud-snow';
  // ⛈ Thunder / Storm
  if (code >= 1273 && code <= 1282) return 'bi bi-cloud-lightning-rain';
  // Default fallback
  return 'bi bi-clouds';
  
  };

  //Function to Change Images according to weather condition
  const getWeatherImg =(code) => {
   // local images
  const sunny = './images/sunny.png';
  const cloudy = './images/cloudy3.png';
  const parrtlycloudy = './images/partly-cloudy.png';
  const mist = './images/mist1.png';
  const rain = './images/rain3d.png';
  const snow = './images/snow.png';          
  const thunder = './images/thunder.png';    
  

  // ☀️ Sunny / Clear
  if (code === 1000) return sunny;
  // 🌤 Partly cloudy
  if (code === 1003) return parrtlycloudy;
  // ☁️ Cloudy / Overcast
  if (code === 1006 || code === 1009) return cloudy;
  // 🌫 Fog / Mist
  if (code >= 1030 && code <= 1147) return mist;
  // 🌧 Rain / Drizzle
  if (code >= 1150 && code <= 1201) return rain;
  // ❄️ Snow (example)
  if (code >= 1210 && code <= 1225) return snow;
  // 🌨 Sleet / Ice
  if (code >= 1204 && code <= 1237) return snow;
  // ⛈ Thunder / Storm
  if (code >= 1273 && code <= 1282) return thunder;
  // Default fallback
  return cloudy;
    };

  
  const getDayFromLocaltime = (localtime) => {
  // Create a Date object from the localtime string
  const date = new Date(localtime);

  // Get the day name (Sunday, Monday, etc.)
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

  return dayName;
};
//fetching data from weather api into variable
  const getweather = async () => { 
    const response= await fetch("http://api.weatherapi.com/v1/current.json?key=c2b4d650a28147a0b97140029261203&q=Lahore");
    const data = await response.json();
    setWeather(data);
    setIsLoading(false);
  };
  useEffect(() => { 
    getweather();
  }, []);

  if(isLoading){
    return(
    <div className='loader-container'>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
  );
  };


  return (
    <div className='container-fluid main-bg'>
      <div className='row'>
        <div className='col-lg-4 col-12'>
          <div className='text-center text-white px-4 py-4 wrapper h-100'>
            <div className='search-bar-w rounded-pill  py-3 px-3 my-4 d-flex align-items-center'>
              <i className="bi bi-search icon-search"></i>
              <input type='text' placeholder='Search City' className='ms-3 ' />
            </div>
            <img src={getWeatherImg(weather.current.condition.code)} alt='cloudy' className='img-fluid' width={300} />
            <div className='display-1 fw-bold text-white'>{weather.current.temp_c}°<sup>c</sup></div>
            <div className='city-name d-flex justify-content-around fs-5 mt-5'>
              <div>{weather.location.name}</div>
              <div>{getDayFromLocaltime(weather.location.localtime)}</div>
            </div>
            <hr className='border-3' />
            <div className='d-flex flex-column align-items-start  pt-3'>
              <div className='mt-2 fs-5'>
                <i className={iconChange(weather.current.condition.code)}></i> {weather.current.condition.text}</div>
    
              <div className='mt-2 fs-5'><i className="bi bi-thermometer-snow "></i> Min Temperature  {weather.current.feelslike_c}°C</div>
              <div className='mt-2 fs-5'><i className="bi bi-thermometer-sun "></i> Max Temperature  {weather.current.windchill_c}°C</div>
            </div>

            <div className='d-flex justify-content-around mt-5 py-1  wind  '>
              <div className='d-flex align-items-center'>
                <div><i className="bi bi-water fs-1"></i></div>
                <div className='lh-1 ms-1'>
                  <div className='fs-4 m-0 p-0 fw-medium'>{weather.current.humidity}%</div>
                  <div className='m-0 p-0'>Humidity</div>
                </div>
              </div>
              <div className='d-flex align-items-center'>
                <div><i className="bi bi-wind fs-1 "></i></div>
                <div className='lh-1 ms-1'>
                  <div className='fs-4 m-0 p-0 fw-medium'>{weather.current.wind_kph}km/h</div>
                  <div className='m-0 p-0'>Wind Speed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-8 col-12'>
          <div className='text-white wrapper-right px-4 pt-5 pb-2'>
            <div className='fs-4'><span className='today'>Today</span> <span className='ms-4 week'>Week</span></div>
            <div className='week-days d-flex justify-content-between gap-md-3'>
              {/* sunday */}
              <div className='days  text-center p-3 my-5 '>
                <div className='fs-5 fw-medium'>Sun</div>
                <img src='./images/windy-day.png' alt='windy-day' className='img-fluid' />
                <div className='fs-5 fw-medium'>32°</div>
              </div>
              {/* Monday */}
              <div className='days  text-center p-3 my-5 '>
                <div className='fs-5 fw-medium'>Mon</div>
                <img src='./images/clear-day.png' alt='clear-day' className='img-fluid' />
                <div className='fs-5 fw-medium'>31°</div>
              </div>
              {/* Tuesday */}
              <div className='days  text-center p-3 my-5 '>
                <div className='fs-5 fw-medium'>Tue</div>
                <img src='./images/cloudy.png' alt='cloudy' className='img-fluid' />
                <div className='fs-5 fw-medium'>27°</div>
              </div>
              {/* Wednesday */}
              <div className='days  text-center p-3 my-5 '>
                <div className='fs-5 fw-medium'>Wed</div>
                <img src='./images/cloudyweather.png' alt='cloudyweather' className='img-fluid' />
                <div className='fs-5 fw-medium'>31°</div>
              </div>
              {/* Thursday */}
              <div className='days  text-center p-3 my-5 '>
                <div className='fs-5 fw-medium'>Thu</div>
                <img src='./images/heavy-rain.png' alt='heavy-rain' className='img-fluid' />
                <div className='fs-5 fw-medium'>25°</div>
              </div>
              {/* Friday */}
              <div className='days  text-center p-3 my-5 '>
                <div className='fs-5 fw-medium'>Fri</div>
                <img src='./images/heavy-rain.png' alt='heavy-rain' className='img-fluid' />
                <div className='fs-5 fw-medium'>26°</div>
              </div>
              {/* Saturday */}
              <div className='days  text-center p-3 my-5 '>
                <div className='fs-5 fw-medium'>Sat</div>
                <img src='./images/cloudyweather.png' alt='cloudyweather' className='img-fluid' />
                <div className='fs-5 fw-medium'>30°</div>
              </div>
            </div>
            {/* Days End */}

            <div className='fs-4 mb-5'>Today’s Overview</div>
            <div className='overview-wrapper  d-flex justify-content-between'>
              {/* Air Quality Index */}
              <div className='overview pt-2 pb-5 px-3 position-relative '>
                <div className='fs-5'>Air Quality Index</div>
                <div className='fs-1 fw-medium mt-4'>53</div>
                <div className='good mt-2 fw-medium'>Good</div>
                <img src='./images/air-pollution.png' alt='air-pollution' className='img-fluid' />
              </div>
              {/* Uv Index */}
              <div className='overview pt-2 pb-5 px-3 position-relative '>
                <div className='fs-5'>UV Index</div>
                <div className='fs-1 fw-medium mt-4'>{weather.current.uv}</div>
                <div className='moderate mt-2 fw-medium'>Moderate</div>
                <img src='./images/uv.png' alt='UV' className='img-fluid' />
              </div>
              {/* Pressure */}
              <div className='overview pt-2 pb-5 px-3 position-relative '>
                <div className='fs-5'>Pressure (mb)</div>
                <div className='fs-1 fw-medium mt-4'>{weather.current.pressure_mb}</div>
                <div className='normal mt-2 fw-medium'>Normal</div>
                <img src='./images/barometer.png' alt='barometer' className='img-fluid' />
              </div>
            </div>

            <div className='chart-section pt-5 pb-2 d-flex justify-content-between'>
              <div className='chart p-3'>
                <div className='title fs-5'>Precipitation</div>
                <img src='./images/Linechart.png' alt='linechart' className='img-fluid' />
                <img src='./images/Linechartend.png' alt='linechart' className='img-fluid' />

              </div>
              <div className='sunset-rise p-3' >
                <div className='fs-5 mb-3'>Sunrise & Sunset</div>
                {/* sunrise */}
                <div className='sunrise d-flex align-items-center'>
                  <i className="bi bi-sunrise display-3 gray-scale"></i>
                  <div className='ms-3'>
                    <div className='gray-scale'>Sunrise</div>
                    <div className='fs-5 temp'>7:06 AM</div>
                  </div>
                </div>
                {/* sunset */}
                <div className='sunrise d-flex align-items-center'>
                  <i className="bi bi-sunrise display-3 gray-scale"></i>
                  <div className='ms-3'>
                    <div className='gray-scale'>Sunset</div>
                    <div className='fs-5 temp'>7:03 PM</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>



    </div>

  )
}

export default App

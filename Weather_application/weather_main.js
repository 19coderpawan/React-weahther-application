// https://api.openweathermap.org/data/2.5/weather?q=pune&appid=c5ebeb791c1dc96d86814f729a340dbf
import React, { useEffect, useState } from 'react'
import './weather_style.css'

const Weather = () => {
  const [currInput,setInput]=useState("punjab");
  // we are going to create an state to track the curr weahter info.
  const [currData,setcurrData]=useState({});
  // to track weather mood.
  const [currWeatherMood,setcurrWeatherMood]=useState("");

  const getWeatherInfo= async ()=>{
     try{
      let url=`https://api.openweathermap.org/data/2.5/weather?q=${currInput}&units=metirc&appid=c5ebeb791c1dc96d86814f729a340dbf`
      let res= await fetch(url);
      // convert the data into a json from.
      let data=await res.json();
      console.log(data);
      // now lets destructure the data in the api.
      const {temp,pressure,humidity}=data.main;
      const {main}=data.weather[0];
      const {speed}=data.wind;
      const {sunset,country}=data.sys;
      const {name}=data;
        
      // now you have to pass all these data .for that lets create and obj and pass it in the state to fecth the weather data.
      const currWeatherData={
        temp,
        pressure,
        humidity,
        main,
        speed,
        sunset,
        country,
        name
      }
      setcurrData(currWeatherData);
      // setcurrWeatherMood(main);
     }catch(error){
      console.log(error);
     }
  }

  // i want that by default also the particular state weather should be displayed here let's take delhi.

  useEffect(()=>{
    getWeatherInfo();
  },[])
  // to get the weather mood.
  useEffect(()=>{
   if(currData.main){
    switch(currData.main){
      case 'Rain': setcurrWeatherMood("wi-rain");
      break;
      case 'Sunny': setcurrWeatherMood("wi-day-sunny");
      break;
      case 'Clouds': setcurrWeatherMood("wi-day-cloudy");
      break;
      case 'Haze': setcurrWeatherMood("wi-day-haze");
      break;
      default:setcurrWeatherMood("wi-rain");
    }
   }
  },[currData.main]);

  // now i also wants to change the sunset in to time using the data().
  let Time=new Date(currData.sunset *1000); // to convert into it milisecond.
  let sunsetTime=`${Time.getHours()}:${Time.getMinutes()}:${Time.getSeconds()}`; // to convert into it milisecond.
  console.log(currWeatherMood);
  return (
    <>
      <div className="wrap">
        <div className="search">
            <input type="search" 
             placeholder='Search........' 
             autoFocus
             className="searchTerm"
             value={currInput}
             onChange={(event)=>setInput(event.target.value) }/>
             <button className="searchButton" type="button" onClick={getWeatherInfo} >Search</button>
        </div>
      </div>
      {/* weather Card */}
      <article className="widget">
        <div className="weatherIcon">
            <i className={`wi ${currWeatherMood}`}></i>
        </div>
        <div className="weatherInfo">
            <div className="temperature">
                <span>{currData.temp}&deg;</span>
            </div>
            <div className="description">
                <div className="weatherCondition">{currData.main}</div>
                <div className="place">{currData.name} {currData.country}</div>
            </div>
        </div>
        <div className="date">{new Date().toLocaleString()}</div>

        {/* 4 col section in the end */}
      
        <div className="extra-temp">
        <div className="temp-info-minmax">
          <div className="two-sided-section">
            <p>
              <i className={`wi wi-sunset` }></i>
            </p>
            <p className="extra-info-leftside">{sunsetTime}
             <br />
             susnset
            </p>
          </div>
          <div className="two-sided-section">
            <p>
              <i className={"wi wi-humidity"}></i>
            </p>
            <p className="extra-info-leftside">{currData.humidity}
             <br />
             Humidity
            </p>
          </div>
        </div>
         <div className="weather-extra-info">
         <div className="two-sided-section">
            <p>
              <i className={"wi wi-rain"}></i>
            </p>
            <p className="extra-info-leftside">{currData.pressure}
             <br />
            Pressure
            </p>
          </div>
          <div className="two-sided-section">
            <p>
              <i className={"wi wi-strong-wind"}></i>
            </p>
            <p className="extra-info-leftside">{currData.speed}
             <br />
             speed
            </p>
          </div>
         </div>
      </div>
      </article>
      
    </>
  )
}

export default Weather;

/* --------------------------------------------STEP BY STEP------------------------------------------- */
// OK lets create our weather app using react.

/*
1.firslty lets do the simple things like lets create an state variable to sotre the input field 
  value.once you have store the currInput in the state now lets move towards the next one.

2.Now, lets work on the search btn .when the user click on the search btn the search btn should 
  call an function to get the data of the particular city from the weather api .
  2.1=> that function should be a asyn function.in that fun use try and catch block to find the error
       if occured.then in the try block first use api key and then fecth() the api using the fetch() method
       then convert it into an proper json format. using .json().
  2.2=>then , destructure the api data and pass it into a state varialbe setcurrData() to track the data each time the serach btn hits.
  2.3=>also , convert the sunset time into a hours:time:sec format using js Date() method.
  2.4=>now , what you have to do is you also want to change the weather icon at the top as per the weather mood in the city.
      for that what we are going to do is we going to create another state variable to track the wether mood.     
*/

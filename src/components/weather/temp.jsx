//https://api.openweathermap.org/data/2.5/weather?q=khopoli&appid=41092b3a396005dfca0cecdff65b5e53
import React, { useEffect, useState } from 'react'
import './style.css'
import Weathercard from './weathercard'

const Temp = () => {
    const API_KEY = process.env.REACT_APP_API_KEY
    const [searchValue,setSearchValue] = useState("bhiwandi")
    const [tempinfo,setTempInfo] = useState({})
    const getweatherinfo = async () => {
        try {
            let url = 
            `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${API_KEY}`
            const res = await fetch(url);
            const data = await res.json();
            const {temp,humidity,pressure} = data.main
            const {main:weathermood} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country , sunset} = data.sys;
            
            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            }
            setTempInfo(myNewWeatherInfo)
        }catch(error){
            console.log(error)
        }
    };
    useEffect(() => {
        getweatherinfo();
    },[])
  return (
    <>
        <article className='widget'>
            <div className='wrap'>
                <div className='search'>
                    <input type="search" placeholder='search...🌏' 
                    autoFocus id='search' className='searchTerm' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>
                    <button className='searchButton' type='button' onClick={() => getweatherinfo()}>search</button>
                </div>
            </div>
            <Weathercard tempinfo={tempinfo}/>
        </article>
    </>
  )
}

export default Temp;
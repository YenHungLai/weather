// TODO:
//    Add change language feature
//    Add background animation for the weather: raining, sunny....
//    Add weather forecast feature

import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './uiComponent/Navbar';
import TextInput from './uiComponent/TextInput';
import WeatherResult from './uiComponent/WeatherResult';
import WeatherForecast from './uiComponent/WeatherForecast'
import M from 'materialize-css'
import TestCard from './uiComponent/testCard'

class App extends Component {
    constructor() {
        super()
        this.state = {
            city: '',
            weatherData: [],
            forecastData: []
        }
        this.myRef = React.createRef();

        // // Initialize carousel
        // document.addEventListener('DOMContentLoaded', () => {
        //   var elems = document.querySelectorAll('.carousel');
        //   var instances = M.Carousel.init(elems, {
        //       duration: 200
        //   });
        // });
    }

    handleClick = async (e) => {
        e.preventDefault()
        // Use a differnet method to get value later???
        const input = document.querySelector('.validate').value;
        // console.log(input);
        // First request always fail becuase city param is empty, wait for it.
        await this.setState({city: input});

        // If user did not enter a city name
        if(this.state.city === '') {
            console.log('city is empty');
            M.toast({html: 'Please enter a city name!!!', classes: 'rounded pink lighten-2'});
        } else {
            // Reveal Card component after user clicked submit button.
            this.myRef.current.style.display = 'block';
            // Call API
            const API_KEY = 'b052fe9ae693d8d824e710562303a84a';
            const lang = 'en';
            const units = 'metric';
            try  {
                const weatherData = await axios.get(`
                    https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=
                    ${units}&lang=${lang}&APPID=${API_KEY}
                `);
                console.log(weatherData);
                this.setState({weatherData: weatherData.data});

                const forecastData = await axios.get(`
                    https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&lang=${lang}&units=
                    ${units}&APPID=${API_KEY}
                `);
                console.log(forecastData);
                this.setState({forecastData: forecastData.data});
            }
            catch(err) {
                console.log(err);
                M.toast({html: 'Please enter a valid city name!!!', classes: 'rounded pink lighten-2'});
            }
        }
        // Initialize carousel
        var elems = document.querySelectorAll('.carousel');
        var instances = M.Carousel.init(elems, {
            duration: 200
        });
        // console.log(this.state);
    }

    render() {
        const forecastData = this.state.forecastData;
        return (
            <div className="App">
                <Navbar />

                <div className='input mt-4'>
                    <TextInput handleClick={this.handleClick} />
                </div>

                {/* Hide card component before user clicks submit button */}
                <div ref={this.myRef} style={{display: 'none'}}>
                    {
                        // Only monut Card component when data from API is received
                        Object.keys(this.state.weatherData).length > 0 ? (
                            <WeatherResult weatherData={this.state.weatherData} />
                        ) : null
                    }
                </div>

                {
                    // Only monut Card component when data from API is received
                    Object.keys(this.state.forecastData).length > 0 ? (
                        <div class="carousel mb-32">
                            {forecastData.list.map(item => {
                                return(
                                    <WeatherForecast
                                        name={forecastData.city.name}
                                        coord={forecastData.city.coord}
                                        forecastData={item}
                                    />
                                )
                            })}
                        </div>
                    ) : null
                }

            </div>
        );
    }
}



export default App;

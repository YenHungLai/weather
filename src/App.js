// TODO:
//    Fix styling
//    Add change language feature
//    Add background animation for the weather: raining, sunny....
//    Add weather forecast feature

import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './uiComponent/Navbar';
import TextInput from './uiComponent/TextInput';
import Card from './uiComponent/Card';
import M from 'materialize-css'

class App extends Component {
    constructor() {
        super()
        this.state = {
            city: '',
            weatherData: []
        }
        this.myRef = React.createRef();
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
                // console.log(weatherData);
                this.setState({weatherData: weatherData.data});
                console.log(this.state);

                // const forecastData = await axios.get(`
                //     https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&lang=${lang}&units=
                //     ${units}&APPID=${API_KEY}
                // `);
                // console.log(forecastData);
            }
            catch(err) {
                console.log(err);
                M.toast({html: 'Please enter a valid city name!!!', classes: 'rounded pink lighten-2'});
            }
        }
    }

    render() {
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
                            <Card weatherData={this.state.weatherData} />
                        ) : null
                    }
                </div>
            </div>
        );
    }
}



export default App;

// TODO:
//    First api request always fails.
//    Card does not update unless click multiple times.
//    Fix styling
//    Add change language feature
//    Add background animation for the weather: raining, sunny....

import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './uiComponent/Navbar';
import TextInput from './uiComponent/TextInput';
import Card from './uiComponent/Card';

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
        const input = document.querySelector('.validate').value
        console.log(input);
        this.setState({city: input});
        this.myRef.current.style.display = 'block';

        // Call API
        const API_KEY = 'b052fe9ae693d8d824e710562303a84a';
        const lang = 'en';
        const units = 'metric';
        const res = await axios.get(`
            https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=
            ${units}&lang=${lang}&APPID=${API_KEY}
        `);
        // console.log(res);
        this.setState({weatherData: res.data});
    }

    render() {
        console.log(this.state);
        return (
            <div className="App">
                <Navbar />
                <TextInput handleClick={this.handleClick} />
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

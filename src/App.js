import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './uiComponent/Navbar';
import TextInput from './uiComponent/TextInput';
import Card from './uiComponent/Card';

class App extends Component {
    state = {
        city: ''
    }

    handleClick = (e) => {
        console.log(e.target.value);
    }

    async componentDidMount() {
        // const API_KEY = 'b052fe9ae693d8d824e710562303a84a';
        // const lang = 'zh_tw';
        // const units = 'metric';
        // const res = await axios.get(`
        //     https://api.openweathermap.org/data/2.5/weather?q=Prescott&units=${units}&lang=${lang}&APPID=${API_KEY}
        // `);
        // console.log(res);
    }

    render() {
        return (
            <div className="App">
                <Navbar />
                <TextInput handleClick={this.handleClick} />
                <Card />
            </div>
        );
    }
}

export default App;

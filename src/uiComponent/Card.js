import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';

const Card = (props) => {
    console.log('Card component here');

    const { name, coord, main, weather, wind } = props.weatherData;
    // console.log(props.weatherData);
    const description = weather[0].description;

    let icon = 'RAIN';
    if (String(weather[0].id).startsWith('5')) {
        icon = 'RAIN';
    } else if (String(weather[0].id) === '611' || String(weather[0].id) === '612' || String(weather[0].id) === '613') {
        icon = 'SLEET';
    } else if (String(weather[0].id).startsWith('6')) {
        icon = 'SNOW';
    } else if (String(weather[0].id) === '800') {
        icon = 'CLEAR_DAY';
    } else if (String(weather[0].id).startsWith('80')) {
        icon = 'CLOUDY';
    }

    const defaults = {
        icon,
        color: 'goldenrod',
        // size: 512,
        animate: true,
    };

    return (
        <div className="card mx-10 w-64 sm:w-2/5 mx-auto">
            <div className="card-content flex flex-col items-start">
                <span className="card-title self-center"><strong>{name}</strong></span>

                <div className='mx-auto mb-1'>
                    <ReactAnimatedWeather
                        icon={defaults.icon}
                        color={defaults.color}
                        size={defaults.size}
                        animate={defaults.animate}
                    />
                </div>

                <h1 className='self-center mb-5'>{description}</h1>

                {Object.keys(main).map((key, index) => {
                    return (
                        <div className='ml-8' key={index}><strong>{key}</strong>: {main[key]}</div>
                    );
                })}

                <div className='ml-8'><strong>Wind Speed</strong>: {wind.speed}</div>
                <div className='ml-8'><strong>Latitude</strong>: {coord.lat}</div>
                <div className='ml-8'><strong>Longitude</strong>: {coord.lon}</div>
            </div>
        </div>
    );
};

export default Card;

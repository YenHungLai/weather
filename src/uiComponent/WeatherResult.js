import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';

const Card = (props) => {
    // console.log('WeatherResult component here');

    const { name, coord, main, weather, wind } = props.weatherData;
    // console.log(props.weatherData);
    const description = weather[0].description;

    // Render different weather icons.
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
        <div className="card mx-10 xl:w-1/5 sm:w-2/5 mx-auto animated fadeIn">
            <div className="card-content flex flex-col items-start">
                <h1 className='self-center'>Today</h1>
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
                    if (key.startsWith('temp')) {
                        return (
                            // Convert Kelvin to Celsius and keep two devimal places, the API unit param not working???
                            <div className='ml-20 xl:ml-24' key={index}><strong>{key}</strong>: {(main[key]-273.15).toFixed(2)}&#8451;</div>
                        );
                    } else {
                        return <div className='ml-20 xl:ml-24' key={index}><strong>{key}</strong>: {main[key]}</div>;
                    }
                })}

                <div className='ml-20 xl:ml-24'><strong>wind speed</strong>: {wind.speed}</div>
                <div className='ml-20 xl:ml-24'><strong>latitude</strong>: {coord.lat}</div>
                <div className='ml-20 xl:ml-24'><strong>longitude</strong>: {coord.lon}</div>
            </div>
        </div>
    );
};

export default Card;

import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';

const WeatherForecast = (props) => {
    console.log('WeatherForecast component here');
    // console.log(props.forecastData);
    const { main, weather, wind } = props.forecastData;
    const { name } = props;
    const { coord } = props;
    const description = weather[0].description;
    const date = new Date(props.forecastData.dt_txt);

    let weekdayArr = new Array(7);
    weekdayArr[0] = 'Sunday';
    weekdayArr[1] = 'Monday';
    weekdayArr[2] = 'Tuesday';
    weekdayArr[3] = 'Wednesday';
    weekdayArr[4] = 'Thursday';
    weekdayArr[5] = 'Friday';
    weekdayArr[6] = 'Saturday';

    // console.log(weekdayArr[date.getDay()]);

    const weekday = weekdayArr[date.getDay()];

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
        <div className="card carousel-item animated fadeIn">
            <div className="card-content flex flex-col items-start">
                <h1 className='self-center'>{parseInt(date.getHours())}:00 {weekday} {date.getMonth()+1}/{date.getDate()}</h1>
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
                            <div className='ml-24' key={index}><strong>{key}</strong>: {(main[key]-273.15).toFixed(2)}&#8451;</div>
                        );
                    } else {
                        return <div className='ml-24' key={index}><strong>{key}</strong>: {main[key]}</div>;
                    }
                })}

                <div className='ml-24'><strong>wind speed</strong>: {wind.speed}</div>
                <div className='ml-24'><strong>latitude</strong>: {coord.lat}</div>
                <div className='ml-24'><strong>longitude</strong>: {coord.lon}</div>
            </div>
        </div>
    );
};

export default WeatherForecast;

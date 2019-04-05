import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => {
    const { name, coord, main, weather, wind } = props.weatherData;
    console.log(props.weatherData);
    const description = weather[0].description;

    return (
        <div className="row">
            <div className="col s12 m6">
                <div className="card">
                    <div className="card-content">
                        <span className="card-title"><strong>{name}</strong></span>
                        <h1>{description}</h1>
                        {Object.keys(main).map((key) => {
                            return (
                                <div><strong>{key}</strong>: {main[key]}</div>
                            );
                        })}

                        <div><strong>Latitude</strong>: {coord.lat}</div>
                        <div><strong>Longitude</strong>: {coord.lon}</div>
                        <div><strong>Wind Speed</strong>: {wind.speed}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;

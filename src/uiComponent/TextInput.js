import React from 'react';
import PropTypes from 'prop-types';

const TextInput = (props) => {
    return (
        <div className="row">
            <form className="col s12">
                <div className="row">
                    <div className="input-field col s6">
                        <i className="material-icons prefix">location_on</i>
                        <input id="icon_prefix" type="text" className="validate" />
                        <label for="icon_prefix">Enter City Name</label>
                        <button onClick={props.handleClick} className='btn'>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TextInput;

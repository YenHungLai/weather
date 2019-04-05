import React from 'react';
import PropTypes from 'prop-types';

const TextInput = (props) => {
    return (
        <div class="row">
            <form class="col s12">
                <div class="row">
                    <div class="input-field col s6">
                        <i class="material-icons prefix">location_on</i>
                        <input onChange={props.handleClick} id="icon_prefix" type="text" class="validate" />
                        <label for="icon_prefix">Enter City Name</label>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TextInput;

import { Button } from "@mantine/core";
import { Link } from "react-router";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import React, { useState } from "react";

import BaseContainer from "components/ui/BaseContainer";

import "styles/views/ConnectSpotify.scss";

//a
const FormField = (props) => {
    return (
        <div className="login field">
            <label>{props.label}</label>
            <input className="login input" placeholder="enter here.." value={props.value} onChange={(e) => props.onChange(e.target.value)} />
        </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};
//a

const ConnectSpotify = (props) => {
    const history = useHistory();
    const [username, setUsername] = useState(null); //a

    return (
        <BaseContainer className="container">
            <div className="container column-item">
                <FormField label="Username" value={username} onChange={(un) => setUsername(un)} />
            </div>
            <Button onClick={() => history.push('/')} class="container connectSpotify">
                Connect Spotify
            </Button>
        </BaseContainer>
    );
};

export default ConnectSpotify;

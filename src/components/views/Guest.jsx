import { Button } from "@mantine/core";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";

import "styles/views/Guest.scss";

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

const Guest = (props) => {
    const history = useHistory();
    const [username, setUsername] = useState(null);

    return (
        <BaseContainer className="container">
            <div>Guest</div>
            <div className="container column-item">
                <FormField label="Username" value={username} onChange={(un) => setUsername(un)} />
            </div>
            {
                // make sure that back&login button redirects to correct page
            }
            <Button onClick={() => history.push("/landingplayer")} className="container back">
                Back
            </Button>
            <Button disabled={!username} onClick={() => history.push(`/waitingroom`)} className="container continue">
                Continue
            </Button>
        </BaseContainer>
    );
};

export default Guest;

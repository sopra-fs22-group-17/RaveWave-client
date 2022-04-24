import { Button } from "@mantine/core";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";

import "styles/views/Guest.scss";

const FormField = (props) => {
    return (
        <div className="login field">
            <label className="login label">{props.label}</label>
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
        <BaseContainer className="game container">
            <p>Guest</p>
            <Button onClick={() => history.push("/landingplayer")} className="guest backbutton" width="100%">
                Back
            </Button>
            <div className="login container">
                <div className="login form">
                    <FormField label="Username" value={username} onChange={(un) => setUsername(un)} />
                    <div className="login button-container">
                        <Button disabled={!username} width="100%" onClick={() => history.push(`/waitingroom`)}>
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        </BaseContainer>
    );
};

export default Guest;

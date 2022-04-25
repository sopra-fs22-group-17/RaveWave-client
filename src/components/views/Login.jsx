import PropTypes from "prop-types";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";
import { Button } from "@mantine/core";

import "styles/views/Login.scss";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
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

const Login = (props) => {
    const history = useHistory();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    // const doLogin = async () => {
    //     try {
    //         const requestBody = JSON.stringify({ username, name });
    //         const response = await api.post("/users", requestBody);

    //         // Get the returned user and update a new object.
    //         const user = new User(response.data);

    //         // Store the token into the local storage.
    //         localStorage.setItem("token", user.token);

    //         // Login successfully worked --> navigate to the route /game in the GameRouter
    //         history.push(`/game`);
    //     } catch (error) {
    //         alert(`Something went wrong during the login: \n${handleError(error)}`);
    //     }
    // };

    return (
        <BaseContainer className="container">
            <div>Login</div>
            <div className="container column-item">
                <FormField label="Username" value={username} onChange={(un) => setUsername(un)} />
            </div>
            <div className="container column-item">
                <FormField label="Password" value={password} onChange={(n) => setPassword(n)} />
            </div>
            <Button onClick={() => history.push(`/connectspotify`)} className=" container backbutton">
                Back
            </Button>
            <Button disabled={!username || !password} onClick={() => history.push(`/connectspotify`)} className=" container loginbutton">
                Login
            </Button>
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Login;

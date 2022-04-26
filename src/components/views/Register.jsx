import PropTypes from "prop-types";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";
import { Button } from "@mantine/core";

import "styles/views/Register.scss";


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

const PasswordField = (props) => {
    return (
        <div className="login field">
            <label className="login label">{props.label}</label>
            <input type="password" className="login input" placeholder="enter here.." value={props.value} onChange={(e) => props.onChange(e.target.value)} />
        </div>
    );
};

PasswordField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

const Register = (props) => {
    const history = useHistory();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [repeatPassword, setrepeatPassword] = useState(null);

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
            <div>Register</div>
            <div className="container column-item">
                <FormField label="Username" value={username} onChange={(un) => setUsername(un)} />
            </div>
            <div className="container column-item">
                <PasswordField label="Password" value={password} onChange={(n) => setPassword(n)} />
            </div>
            <div className="container column-item">
                <PasswordField label="Repeat password" value={repeatPassword} onChange={(an) => setrepeatPassword(an)} />
            </div>
            <Button onClick={() => history.push(`/connectspotify`)} className="backbutton">
                Back
            </Button>
            <Button disabled={!username || !password ||!repeatPassword} onClick={() => history.push(`/connectspotify`)} className="registerbutton">
                Register
            </Button>
        </BaseContainer>
    );
};

export default Register;

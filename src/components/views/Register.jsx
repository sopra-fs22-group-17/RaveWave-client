import PropTypes from "prop-types";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";
import { Button } from "components/ui/Button";

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

const Register = (props) => {
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
        <BaseContainer>
            <div className="login container">
                <div className="login form">
                    <FormField label="Username" value={username} onChange={(un) => setUsername(un)} />
                    <FormField label="Password" value={password} onChange={(n) => setPassword(n)} />
                    <div className="login button-container">
                        <Button disabled={!username || !password} width="100%" onClick={() => history.push(`/connectspotify`)}>
                            Register
                        </Button>
                    </div>
                </div>
            </div>
        </BaseContainer>
    );
};

export default Register;

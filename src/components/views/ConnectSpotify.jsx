import { Button } from "@mantine/core";
import { useHistory } from "react-router-dom";

import { api, handleError } from "helpers/api";
import { remote } from "api/Api";

import BaseContainer from "components/ui/BaseContainer";

import "styles/views/ConnectSpotify.scss";
import {useState} from "react";
import SpotifyWebApi from "spotify-web-api-js";

let Spotify = require('spotify-web-api-js');
let s = new Spotify();

let spotifyApi = new SpotifyWebApi();

const ConnectSpotify = (props) => {
    const history = useHistory();

    // uri spotify
    // redirect user to url
    // will be redirected to spotify auth for APP
    // 4. parameter code=
    // 5. redirect to where ?? (check with sheeena)
    // 6. send code to backend for step 7
    // 7. post request auth code ()
    // 8. get access token to stream

    const [spotifyURL, setSpotifyURL] = useState(null);

    async function fetchSpotifyURI() {
        try {
            const response = await remote.getAuthorizationCodeUri();

            // Get the returned users and update the state.
            setSpotifyURL(response.data);

            // This is just some data for you to see what is available.
            // Feel free to remove it.
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);

            // See here to get more data.
            console.log(response);
        } catch (error) {
            console.error(`Something went wrong while fetching the URL: \n${handleError(error)}`);
            console.error("Details:", error);
            alert("Something went wrong while fetching the URL! See the console for details.");
        }
    }

    async function redirectUser() {
        try {
            window.location.href = spotifyURL.toString();

            const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
            });
            // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
            let code = params.code; // "some_value"

            SpotifyWebApi.setAccessToken(code);

        } catch (error) {
            console.error(`Something went wrong while redirecting the user: \n${handleError(error)}`);
            console.error("Details:", error);
            alert("Something went wrong while fetching the URL! See the console for details.");
        }
    }

    //fetchSpotifyURI();
    //redirectUser();

    //SPOTIFY sound output is implemented in GuessArtist, GuessLyrics and GuessSong

    return (
        <BaseContainer className="connectspotify">
            <Button onClick={() => history.push("/selectgamemode")} className="connectspotify back">
                Back
            </Button>
            <Button onClick={() => history.push("/displayqr")} className="connectspotify connectbutton">
                Connect Spotify
            </Button>
        </BaseContainer>
    );
};

export default ConnectSpotify;

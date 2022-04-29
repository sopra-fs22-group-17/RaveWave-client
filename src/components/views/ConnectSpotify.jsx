import {Button} from "@mantine/core";
import {useHistory} from "react-router-dom";
import spotifyURL from 'model/SpotifyURL';

import {handleError} from "helpers/api";
import {remote} from "api/Api";

import BaseContainer from "components/ui/BaseContainer";

import "styles/views/ConnectSpotify.scss";
import SpotifyWebApi from "spotify-web-api-js";
import SpotifyURLAuthorizationCode from "../../model/SpotifyURLAuthorizationCode";

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

    async function fetchSpotifyURI() {
        try {
            const response = await remote.getAuthorizationCodeUri();
            redirectUser(response);
        } catch (error) {
            console.error(`Something went wrong while fetching the URL: \n${handleError(error)}`);
            console.error("Details:", error);
            alert("Something went wrong while fetching the URL! See the console for details.");
        }
    }

        function redirectUser(response) {
        try {
            // until here fine
            let URL = JSON.stringify(response.data);

            const redirectURL = new spotifyURL(response.data);

            window.location.href = redirectURL.redirectionURL;

            new Promise(resolve => setTimeout(resolve, 1000));
            const queryString = window.location.search;

            //window.location.refresh();

            const urlParams = new URLSearchParams(queryString);

            const code = urlParams.get('code')
            console.log(code);

            let authCodeRequest = JSON.stringify({code});
            console.log(authCodeRequest);
            spotifyApi.setAccessToken(remote.postAuthorizationCode(authCodeRequest));

        } catch (error) {
            console.error(`Something went wrong while redirecting the user: \n${handleError(error)}`);
            console.error("Details:", error);
            alert("Something went wrong while fetching the URL! See the console for details.");
        }
    }


    //fetchSpotifyURI();
    //redirectUser()

    //SPOTIFY sound output is implemented in GuessArtist, GuessLyrics and GuessSong

    return (
        <BaseContainer className="connectspotify">
            <Button onClick={() => history.push("/selectgamemode")} className="connectspotify back">
                Back
            </Button>
            <Button onClick={fetchSpotifyURI} className="connectspotify connectbutton">
                Connect Spotify
            </Button>
        </BaseContainer>
    );
};

export default ConnectSpotify;

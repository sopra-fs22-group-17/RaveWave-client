import { Button, Container, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { Link } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";

import BaseContainer from "components/ui/BaseContainer";
import { remote } from "../../api/Api";
import { handleError } from "../../helpers/api";
import spotifyURL from "../../model/SpotifyURL";

let spotifyApi = new SpotifyWebApi();

export const ConnectSpotify: FC<{}> = ({}) => {
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

            new Promise((resolve) => setTimeout(resolve, 1000));
            const queryString = window.location.search;

            //window.location.refresh();

            const urlParams = new URLSearchParams(queryString);

            const code = urlParams.get("code");
            console.log(code);

            let authCodeRequest = JSON.stringify({ code });
            console.log(authCodeRequest);
            //spotifyApi.setAccessToken(remote.postAuthorizationCode(authCodeRequest));
        } catch (error) {
            console.error(`Something went wrong while redirecting the user: \n${handleError(error)}`);
            console.error("Details:", error);
            alert("Something went wrong while fetching the URL! See the console for details.");
        }
    }

    return (
        <BaseContainer>
            <Container size="sm">
                <Stack align="center">
                    <Title order={1} sx={{ color: "white", padding: 20 }}>
                        Connect Spotify
                    </Title>{" "}
                    <Stack align="stretch">
                        <Button color="green" component={Link} to="/selectGameMode">
                            Authorize Spotify
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </BaseContainer>
    );
};

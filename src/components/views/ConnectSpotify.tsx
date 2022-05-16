import { Button, Container, Group, Image, Stack, Text } from "@mantine/core";
import BaseContainer from "components/ui/BaseContainer";
import { FC, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SpotifyURL } from "../../api/SpotifyModel";
import { GameContext } from "../../contexts/GameContext";
import { useQueryParam } from "../../hooks/useQuery";
import spotifyURL from "../../model/SpotifyURL";

export const ConnectSpotify: FC<{}> = ({}) => {
    const context = useContext(GameContext);
    const { api, currentURL } = context;
    const [spotifyAuthorized, setSpotifyAuthorized] = useState(false);
    const spotifyCodeParam = useQueryParam("code");

    let search = useLocation().search;

    console.log("RENDER " + spotifyCodeParam);

    useEffect(() => {
        context.setUserRole("host");
        context.setPlayerName("Host");
    }, []);

    async function fetchSpotifyURI() {
        try {
            const response = await api.getAuthorizationCodeUri();
            redirectUser(response);
        } catch (error) {
            console.error(`Something went wrong while fetching the URL: \n${api.handleError(error)}`);
            console.error("Details:", error);
            alert("Something went wrong while fetching the URL! See the console for details.");
        }
    }

    function redirectUser(response) {
        try {
            // until here fine

            //let URL = JSON.stringify(response.data);

            const redirectURL = new spotifyURL(response.data);

            window.location.href = redirectURL.redirectionURL;

            new Promise((resolve) => setTimeout(resolve, 5000));
            const queryString = window.location.search;

            //window.location.refresh();

            const urlParams = new URLSearchParams(queryString);

            const code = urlParams.get('code');
            console.log(code);

            let authCodeRequest = JSON.stringify({ code });
            console.log(authCodeRequest);
            api.setAuthorizationCode(authCodeRequest);
            setSpotifyAuthorized(true);
        } catch (error) {
            console.error(`Something went wrong while redirecting the user: \n${api.handleError(error)}`);
            console.error("Details:", error);
            alert("Something went wrong while fetching the URL! See the console for details.");
        }
    }

    const connectionMessage = spotifyAuthorized ? "Connected to Spotify" : "Connecting...";

    return (
        <BaseContainer>
            <Container size="sm">
                <Stack align="center">
                    <Container size={500}>
                        <Image src="/images/spotify-logo-white.svg" sx={{ padding: 40 }} />
                    </Container>
                    <Text>{connectionMessage}</Text>
                    <Stack align="stretch">
                        <Button onClick={fetchSpotifyURI}>
                            Authorize Spotify
                        </Button>
                        <Button onClick={fetchSpotifyURI} disabled={!spotifyAuthorized}>
                            Continue
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </BaseContainer>
    );
};

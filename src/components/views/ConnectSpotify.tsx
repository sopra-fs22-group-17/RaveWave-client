import { Button, Container, Group, Image, Stack, Text } from "@mantine/core";
import BaseContainer from "components/ui/BaseContainer";
import { FC, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SpotifyURL } from "../../api/SpotifyModel";
import { GameContext } from "../../contexts/GameContext";
import { useQueryParam } from "../../hooks/useQuery";

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

    useEffect(() => {
        const handler = async () => {
            if (!spotifyCodeParam) {
                await connectSpotify();
                new Promise(resolve => setTimeout(resolve, 1000));
                console.log("Here We are");

                await sendSpotifyCode();
            } else {
                await sendSpotifyCode();
            }
        };
        handler();
    }, []);

    // useEffect(() => {
    //     const handler = async () => {
    //         if (!spotifyAuthorized) {
    //             if (!spotifyCodeParam) {
    //                 connectSpotify();
    //             } else {
    //                 sendSpotifyCode();
    //             }
    //         } else {
    //         }
    //     };
    //     handler();
    // }, [spotifyAuthorized, spotifyCodeParam]);

    const connectSpotify = async () => {
        try {
            const response = await api.getAuthorizationCodeUri();
            const spotifyLink = new SpotifyURL(response.data);
            context.info("Redirecting " + (spotifyLink.redirectionURL.substring(0, 30) + "..."));
            //window.location.href = spotifyLink.redirectionURL;
            window.location.assign(spotifyLink.redirectionURL);
            console.log(document.location)
        } catch (error) {
            context.error(error.toString());
        }
    };

    const sendSpotifyCode = async () => {
        console.log(currentURL);
        const authCodeRequest = JSON.stringify({ code: spotifyCodeParam });
        console.log(authCodeRequest);
        try {
            await api.setAuthorizationCode(authCodeRequest);
            context.info("Spotify code sent");
        } catch {
            context.info("Spotify code send failed");
        } finally {
            setSpotifyAuthorized(true);
        }
    };

    const connectionMessage = spotifyAuthorized ? "Connected to Spotify" : "Connecting...";
    return (
        <BaseContainer>
            <Container size="sm">
                <Stack align="center">
                    <Container size={500}>
                        <Image src="/images/spotify-logo-white.svg" sx={{ padding: 40 }} />
                    </Container>
                    <Text>{connectionMessage}</Text>
                    <Group sx={{ paddingTop: 50, visibility: !spotifyAuthorized ? "hidden" : "visible" }}>
                        <Button component={Link} to="/login">
                            Login
                        </Button>
                        <Button component={Link} to="/register">
                            Register
                        </Button>
                    </Group>
                </Stack>
            </Container>
        </BaseContainer>
    );
};

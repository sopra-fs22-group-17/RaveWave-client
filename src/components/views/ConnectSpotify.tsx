import { Button, Container, Group, Image, Stack, Text } from "@mantine/core";
import BaseContainer from "components/ui/BaseContainer";
import { FC, useContext, useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { SpotifyURL } from "../../api/SpotifyModel";
import { GameContext } from "../../contexts/GameContext";
import { useQueryParam } from "../../hooks/useQuery";

export const ConnectSpotify: FC<{}> = ({}) => {
    const context = useContext(GameContext);
    const { api } = context;
    const [spotifyAuthorized, setSpotifyAuthorized] = useState(false);
    const spotifyCodeParam = useQueryParam("code");

    useEffect(() => {
        context.setUserRole("host");
        context.setPlayerName("Host");
    }, []);

    useEffect(() => {
        const handler = async () => {
            if (spotifyCodeParam) {
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
            window.location.href = spotifyLink.redirectionURL;
        } catch (error) {
            context.error(error.toString());
        }
    };

    const sendSpotifyCode = async () => {
        const authCodeRequest = JSON.stringify({ code: spotifyCodeParam });
        try {
            await api.setAuthorizationCode(authCodeRequest);
            context.info("Spotify code sent");
        } catch {
            context.info("Spotify code send failed");
        } finally {
            setSpotifyAuthorized(true);
        }
    };

    const connectionMessage = spotifyAuthorized ? "Connected to Spotify" : "You will need Spotify premium";

    return (
        <BaseContainer>
            <Container size="sm">
                <Stack align="center">
                    <Container size={500}>
                        <Image src="/images/spotify-logo-white.svg" sx={{ padding: 40 }} />
                    </Container>
                    <Text>{connectionMessage}</Text>
                    <Stack align="stretch">
                        <Button onClick={connectSpotify} disabled={spotifyAuthorized}>
                            Authorize Spotify
                        </Button>
                        <Link to="/selectgamemode">
                            <Button disabled={!spotifyAuthorized}>
                                Continue
                            </Button>
                        </Link>
                    </Stack>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
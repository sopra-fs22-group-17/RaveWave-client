import { Button, Container, Group, Image, Stack, Text, Title } from "@mantine/core";
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
        const handler = async () => {
            if (spotifyCodeParam) {
                await sendSpotifyCode();
            }
        };
        handler();
    }, []);

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

    const setPlayerPar = async () => {
        const nameofPlayer = sessionStorage.getItem('name');
        const roleofPlayer = sessionStorage.getItem('role');
        if (roleofPlayer === "host") {
            context.setUserRole("host");
        } else {
            context.setUserRole("player");
        }
        context.setPlayerName(nameofPlayer);
    }

    const connectionMessage = spotifyAuthorized ? "Connected to Spotify" : "You will need Spotify premium";

    return (
        <BaseContainer>
            <Container size="sm">
                <Stack align="center">
                    <Container size={500}>
                        <Image src="/images/spotify-logo-white.svg" sx={{ padding: 40 }} />
                    </Container>
                    <Title order={4}>{connectionMessage}</Title>
                    <Group align="center" sx={{ paddingTop: 10 }}>
                        <Button onClick={connectSpotify} disabled={spotifyAuthorized} size="md">
                            Authorize Spotify
                        </Button>
                        <Link to="/selectgamemode">
                            <Button onClick={setPlayerPar} disabled={!spotifyAuthorized} size="md">
                                Continue
                            </Button>
                        </Link>
                    </Group>
                </Stack>
            </Container>
        </BaseContainer>
    );
};
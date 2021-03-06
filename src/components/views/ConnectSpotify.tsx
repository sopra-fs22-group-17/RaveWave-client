import { Button, Container, Group, Image, LoadingOverlay, Stack, Title } from "@mantine/core";
import { FC, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";

import { SpotifyURL } from "../../api/SpotifyModel";
import { GameContext } from "../../contexts/GameContext";
import { useQueryParam } from "../../hooks/useQuery";
import RWLogo from "./RWLogo";

export const ConnectSpotify: FC<{}> = () => {
    const context = useContext(GameContext);
    const { api } = context;
    const [spotifyAuthorized, setSpotifyAuthorized] = useState(false);
    const spotifyCodeParam = useQueryParam("code");
    const history = useHistory();

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handler = async () => {
            if (spotifyCodeParam) {
                await sendSpotifyCode();
            }
        };
        context.setPlayerName(sessionStorage.getItem('name'));
        context.setLobbyId(sessionStorage.getItem('lobbyId'));
        handler();
    }, []);

    const connectSpotify = async () => {
        try {
            setVisible(true);
            const response = await api.getAuthorizationCodeUri();
            const spotifyLink = new SpotifyURL(response.data);
            window.location.href = spotifyLink.redirectionURL;
        } catch (error) {

            context.error(error.toString());
            setVisible(false);
        }
    };

    const sendSpotifyCode = async () => {
        const authCodeRequest = JSON.stringify({ code: spotifyCodeParam });
        try {
            setVisible(true);
            await api.setAuthorizationCode(authCodeRequest);
            setSpotifyAuthorized(true);
            setVisible(false);
            sessionStorage.setItem("spotifyAccess", "granted")
        } catch {
            sessionStorage.clear();
            context.error("Spotify access denied! Are you sure you are using a Spotify-Premium account?");
            setVisible(false);
        }
    };

    const setPlayerPar = async () => {
        setVisible(true);
        const nameofPlayer = sessionStorage.getItem("name");
        const roleofPlayer = sessionStorage.getItem("role");
        if (roleofPlayer === "host") {
            context.setUserRole("host");
            context.setPlayerName(nameofPlayer);
            history.push("/selectgamemode");
        } else {
            context.setUserRole("player");
            context.setPlayerName(nameofPlayer);
            const lobbyId = sessionStorage.getItem("lobbyId");
            if (lobbyId) {
                context.setLobbyId(lobbyId);
            }
            await api.addPlayer(context.lobbyId, context.playerName);
            history.push("/game");
        }
    };

    const connectionMessage = spotifyAuthorized ? "Connected to Spotify" : "You will need Spotify premium";

    return (
        <BaseContainer>
            <LoadingOverlay visible={visible} loader={RWLogo} />
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
                        <Button onClick={setPlayerPar} disabled={!spotifyAuthorized} size="md">
                            Continue
                        </Button>
                    </Group>
                </Stack>
            </Container>
        </BaseContainer>
    );
};

import {Button, Container, Group, Image, Stack, Text, Title, LoadingOverlay} from "@mantine/core";
import BaseContainer from "components/ui/BaseContainer";
import {FC, useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {SpotifyURL} from "../../api/SpotifyModel";
import {GameContext} from "../../contexts/GameContext";
import {useQueryParam} from "../../hooks/useQuery";

export const ConnectSpotify: FC<{}> = ({}) => {
    const context = useContext(GameContext);
    const {api} = context;
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
        handler();
    }, []);

    const connectSpotify = async () => {
        try {
            setVisible(true);
            const response = await api.getAuthorizationCodeUri();
            const spotifyLink = new SpotifyURL(response.data);
            context.info("Redirecting " + (spotifyLink.redirectionURL.substring(0, 30) + "..."));
            window.location.href = spotifyLink.redirectionURL;
        } catch (error) {
            context.error(error.toString());
            setVisible(false);
        }
    };

    const sendSpotifyCode = async () => {
        const authCodeRequest = JSON.stringify({code: spotifyCodeParam});
        try {
            setVisible(true);
            await api.setAuthorizationCode(authCodeRequest);
            context.info("Spotify access granted!");
            setSpotifyAuthorized(true);
            setVisible(false);
        } catch {
            //context.info();
            context.error("Spotify access denied! Are you sure you are using a Spotify-Premium account?")
            setVisible(false);
        }
    };

    const setPlayerPar = async () => {
        setVisible(true);
        const nameofPlayer = sessionStorage.getItem('name');
        const roleofPlayer = sessionStorage.getItem('role');
        if (roleofPlayer === "host") {
            context.setUserRole("host");
            context.setPlayerName(nameofPlayer);
            history.push('/selectgamemode');
        } else {
            context.setUserRole("player");
            context.setPlayerName(nameofPlayer);
            const lobbyId = sessionStorage.getItem('lobbyId')
            if (lobbyId) {
                context.setLobbyId(lobbyId);
            }
            history.push('/game');
        }

    }

    const connectionMessage = spotifyAuthorized ? "Connected to Spotify" : "You will need Spotify premium";

    return (
        <BaseContainer>
            <LoadingOverlay visible={visible} />
            <Container size="sm">
                <Stack align="center">
                    <Container size={500}>
                        <Image src="/images/spotify-logo-white.svg" sx={{padding: 40}}/>
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
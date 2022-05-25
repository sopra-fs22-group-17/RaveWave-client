import {Box, Button, Container, Stack} from "@mantine/core";
import {FC, useContext, useEffect, useState} from "react";

import {SpotifyURL} from "../../api/SpotifyModel";
import {GameContext} from "../../contexts/GameContext";
import {useQueryParam} from "../../hooks/useQuery";
import {SpotifyPlayer} from "./SpotifyPlayer";

/**
 * Used to debug the server API behaviors
 */
export const DebugView: FC<{}> = ({}): any => {
    const context = useContext(GameContext);
    const [connected, setConnected] = useState(false);
    const [player, setPlayer] = useState<any>({});
    const spotifyCodeParam = useQueryParam("code");
    const [spotifyAuthorized, setSpotifyAuthorized] = useState(false);

    const {lobbyId, playerName, gameConfiguration, api, stomp} = context;

    useEffect(() => {
        context.setPlayerName("Sheena");
    }, []);

    useEffect(() => {
        const sendSpotifyCode = async () => {
            const authCodeRequest = JSON.stringify({code: spotifyCodeParam});
            console.log(authCodeRequest);
            await api.setAuthorizationCode(authCodeRequest);
            console.info("Spotify code sent");
            console.log("Spotify code sent");
            setSpotifyAuthorized(true);
        };
        if (spotifyCodeParam) {
            if (!spotifyAuthorized) {
                console.log("Sending spotify code");
                sendSpotifyCode();
            } else {
                console.log("Spotify code ignored");
            }
        }
    }, [spotifyCodeParam]);

    const createLobby = async () => {
        console.log(">>> createLobby");
        const lobbyId = await api.createLobbyAndGetId();
        console.log(JSON.stringify(lobbyId, null, 4));
        context.setLobbyId(lobbyId);
    };

    const addPlayer = async () => {
        console.log(">>> addPlayer");
        const response = await api.addPlayer(lobbyId, playerName);
        setPlayer(response);
        console.log("Response:\n" + JSON.stringify(response, null, 4));
    };

    const connect = async () => {
        console.log(">>> connect");
        console.log("CONNECT 1");
        const response = await context.stomp.connect(lobbyId);
        console.log("Response:\n" + JSON.stringify(response, null, 4));
    };

    const setConfiguration = async () => {
        console.log(">>> setConfiguration");

        // const gameConfiguration: any = {
        //     gameMode: "ARTISTGAME",
        //     roundDuration: "FOURTEEN",
        //     playBackDuration: "FOURTEEN",
        //     songPool: "SWITZERLAND",
        //     gameRounds: "12",
        // };

        const gameConfiguration: any = {
            gameMode: "ARTISTGAME",
            roundDuration: "SIXTEEN",
            playBackDuration: "SIXTEEN",
            songPool: "SWITZERLAND",
            gameRounds: "12",
        };

        const response = stomp.sendSettings(lobbyId, gameConfiguration);
        console.log("Response:\n" + JSON.stringify(response, null, 4));
    };

    const startGame = () => {
        console.log(">>> startGame");
        const response = stomp.startGame(context.lobbyId);
        console.log("Response:\n" + JSON.stringify(response, null, 4));
    };

    const nextRound = () => {
        console.log(">>> nextRound");
        const response = stomp.nextRound(context.lobbyId);
        console.log("Response:\n" + JSON.stringify(response, null, 4));
    };

    const connectSpotify = async () => {
        try {
            const response = await api.getAuthorizationCodeUri();
            const spotifyLink = new SpotifyURL(response.data);
            context.info("Redirecting " + (spotifyLink.redirectionURL.substring(0, 30) + "..."));
            window.location.href = spotifyLink.redirectionURL;
        } catch (error) {
            console.error(error);
            context.error(error.toString());
        }
    };

    return (
        <Container size={300} sx={{padding: 20}}>
            <Stack>
                <Box>Connected: {"" + connected}</Box>
                <Box>LobbyId: {lobbyId}</Box>
                <Box>Player: {playerName}</Box>
                <Button onClick={() => connectSpotify()}>Connect Spotify</Button>
                <Button onClick={() => createLobby()}>Create Lobby</Button>
                <Button onClick={() => addPlayer()}>Add Player</Button>
                <Button onClick={() => connect()}>Connect</Button>
                {/* <Button onClick={() => registerPlayer()}>Register Player</Button> */}
                <Button onClick={() => setConfiguration()}>SetConfiguration</Button>
                <Button onClick={() => startGame()}>Start Game</Button>
                <Button onClick={() => nextRound()}>Next Round</Button>
                <SpotifyPlayer
                    url="https://p.scdn.co/mp3-preview/518cd91a39bf1c7b547bd9bcca004455ec2d936e?cid=a798a655a9ed4c578a58d9febc02bc2e"
                    duration={10}
                />
            </Stack>
        </Container>
    );
};

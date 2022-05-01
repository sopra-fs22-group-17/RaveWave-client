import { Button, Container, Group, Slider, Stack, Text } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { IGameConfiguration, TQuestionType } from "../../api/@def";
import { GameContext } from "../../contexts/GameContext";
import { GameModeButton } from "../ui/GameModeButton";
import { SONG_POOLS, SongPoolSelector } from "../ui/SongPoolSelector";

export const SelectGameMode = (props) => {
    const context = useContext(GameContext);
    const [connected, setConnected] = useState(false);
    const [stompConnected, setStompConnected] = useState(false);
    const [gameMode, setGameMode] = useState<TQuestionType>("Guess the song");
    const [gameRounds, setGameRounds] = useState(15);
    const [playBackDuration, setPlayBackDuration] = useState(15);
    const [songPool, setSongPool] = useState<string>(SONG_POOLS[0].id);
    const [roundDuration, setRoundDuration] = useState();

    useEffect(() => {
        async function connect() {
            const lobbyId = await context.api.createLobbyAndGetId();
            context.setLobbyId(lobbyId);
            setConnected(true);
        }
        connect();
    }, []);

    const config: IGameConfiguration = {
        gameMode: String(gameMode),
        gameRounds: String(gameRounds),
        playBackDuration: String(playBackDuration),
        songPool: "SWITZERLAND", //FIXME
        roundDuration: String(roundDuration),
    };
    const gameModes: TQuestionType[] = ["Guess the song", "Guess the artist", "Guess the lyrics"];
    const message = connected ? "Connected " + context.lobbyId : "Connecting...";
    const stompMessage = stompConnected ? "StompConnected" : "Stomp not connected";
    const connectServer = () => {
        context.api.connect(context.lobbyId, () => {
            setStompConnected(true);
        });
    };
    const saveConfiguration = () => {
        context.api.sendSettings(context.lobbyId, config);
    };

    return (
        <Container size={500}>
            <Stack align="center">
                <h1>Game Configuration</h1>
                <Text>{message}</Text>
                <Text>{stompMessage}</Text>
                <Group spacing={0} sx={{ paddingBottom: 50 }}>
                    {gameModes.map((mode, i) => {
                        return <GameModeButton key={i} type={mode} selected={gameMode === mode} onSelect={() => setGameMode(mode)} />;
                    })}
                </Group>
            </Stack>
            <Stack>
                <Text>{`Number of rounds: ${gameRounds}`}</Text>
                <Slider min={10} max={20} label={(value) => value.toFixed(0)} value={gameRounds} step={2} onChange={setGameRounds}></Slider>

                <Text>{`Playback duration: ${playBackDuration} seconds`}</Text>
                <Slider min={10} max={20} label={(value) => value.toFixed(2)} value={playBackDuration} step={2} onChange={setPlayBackDuration}></Slider>
            </Stack>
            <SongPoolSelector items={SONG_POOLS} selection={songPool} onSelect={setSongPool} />
            <Stack align="center" sx={{ paddingTop: 60 }}>
                <Button onClick={() => connectServer()}>Connect server</Button>
                <Button onClick={() => saveConfiguration()}>Save configuration</Button>
                <Button component={Link} to="/displayqr">
                    Invite players
                </Button>
            </Stack>
        </Container>
    );
};

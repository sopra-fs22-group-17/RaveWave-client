import { Button, Container, Group, Slider, Stack, Text } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IGameConfiguration, TQuestionType } from "../../api/@def";
import { SONG_POOLS } from "../../api/StompApi";
import { GameContext } from "../../contexts/GameContext";
import { GameModeButton } from "../ui/GameModeButton";
import { SongPoolSelector } from "../ui/SongPoolSelector";

export const SelectGameMode = (props) => {
    const context = useContext(GameContext);
    const { gameConfiguration, setGameConfiguration } = context;
    const history = useHistory();
    const [gameConfigurationSaved, setGameConfigurationSaved] = useState(false);
    const [connected, setConnected] = useState(false);
    const [gameMode, setGameMode] = useState(gameConfiguration.gameMode);
    const [gameRounds, setGameRounds] = useState(gameConfiguration.gameRounds);
    const [playBackDuration, setPlayBackDuration] = useState(gameConfiguration.playBackDuration);
    const [songPool, setSongPool] = useState(gameConfiguration.songPool);
    const [roundDuration, setRoundDuration] = useState(gameConfiguration.roundDuration);

    useEffect(() => {
        async function connect() {
            const lobbyId = await context.api.createLobbyAndGetId();
            context.setLobbyId(lobbyId);
            setConnected(true);
            context.info(`Lobby '${lobbyId}' created`);
        }
        connect();
    }, []);

    // const config: IStompGameConfiguration = {
    //     gameMode: gameMode,
    //     gameRounds: String(gameRounds),
    //     playBackDuration: String(playBackDuration),
    //     songPool: "SWITZERLAND", //FIXME
    //     roundDuration: String(roundDuration),
    // };
    const gameModes: TQuestionType[] = ["Guess the song", "Guess the artist", "Guess the lyrics"];
    const message = connected ? "Connected " + context.lobbyId : "Connecting...";
    const saveConfiguration = () => {
        // context.api.sendSettings(context.lobbyId, config);
        const config: IGameConfiguration = {
            gameMode,
            gameRounds,
            playBackDuration,
            songPool,
            roundDuration,
        };
        const gameConfiguration: any = {
            gameMode: "ARTISTGAME",
            roundDuration: "SIXTEEN",
            playBackDuration: "SIXTEEN",
            songPool: "SWITZERLAND",
            gameRounds: "2",
        };
        context.setGameConfiguration(gameConfiguration);
        setGameConfigurationSaved(true);
        context.info("Game configuration successfully saved.");
    };

    return (
        <Container size={500}>
            <Stack align="center">
                <h1>Game Configuration</h1>
                <Text>{message}</Text>
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
                <Button onClick={() => saveConfiguration()}>Save configuration</Button>
                <Button disabled={!gameConfigurationSaved} onClick={() => history.push("/displayqr")}>
                    Invite players
                </Button>
            </Stack>
        </Container>
    );
};

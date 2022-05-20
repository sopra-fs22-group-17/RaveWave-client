import {Button, Container, Group, Slider, Stack, Text} from "@mantine/core";
import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {IGameConfiguration, TQuestionType} from "../../api/@def";
import {SONG_POOLS} from "../../api/StompApi";
import {GameContext} from "../../contexts/GameContext";
import {GameModeButton} from "../ui/GameModeButton";
import {SongPoolSelector} from "../ui/SongPoolSelector";
import {getDomain} from "../../api/getDomain";

export const SelectGameMode = (props) => {
    const context = useContext(GameContext);
    const {gameConfiguration, setGameConfiguration, userRole} = context;
    const [gameConfigurationSaved, setGameConfigurationSaved] = useState(false);
    const [connected, setConnected] = useState(false);
    const [gameMode, setGameMode] = useState(gameConfiguration.gameMode);
    const [gameRounds, setGameRounds] = useState(gameConfiguration.gameRounds);
    const [songPool, setSongPool] = useState(gameConfiguration.songPool);
    const [playBackDuration, setPlayBackDuration] = useState(gameConfiguration.playBackDuration);
    let roundDuration = playBackDuration;

    useEffect(() => {

        async function connect() {
            const lobbyId = await context.api.createLobbyAndGetId();
            const addHosttoLobby = await context.api.addPlayer(lobbyId, sessionStorage.getItem('name'));
            context.setLobbyId(lobbyId);
            setConnected(true);
            context.info(`Lobby '${lobbyId}' created`);
        }

        connect();
    }, []);

    const gameModes: TQuestionType[] = ["Guess the song", "Guess the artist", "Guess the lyrics"];
    const message = connected ? "Connected " + context.lobbyId : "Connecting...";
    const saveConfiguration = () => {
        roundDuration = playBackDuration;
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

        context.setGameConfiguration(config);
        setGameConfigurationSaved(true);
        context.info("Game configuration successfully saved.");
        console.log(gameConfiguration);
        console.log("FROM CONFIG" + JSON.stringify(config));
    };

    return (
        <Container size={500}>
            <Stack align="center">
                <h1>Game Configuration</h1>
                <Text>{message}</Text>
                <Group spacing={0} sx={{paddingBottom: 50}}>
                    {gameModes.map((mode, i) => {
                        return <GameModeButton key={i} type={mode} selected={gameMode === mode}
                                               onSelect={() => setGameMode(mode)}/>;
                    })}
                </Group>
            </Stack>
            <Stack>
                <Text>{`Number of rounds: ${gameRounds}`}</Text>
                <Slider min={10} max={20} label={(value) => value.toFixed(0)} value={gameRounds} defaultValue={14}
                        step={2} onChange={setGameRounds}></Slider>

                <Text>{`Playback duration: ${playBackDuration} seconds`}</Text>
                <Slider
                    min={10}
                    max={20}
                    label={(value) => value.toFixed(0)}
                    value={playBackDuration}
                    defaultValue={14}
                    step={2}
                    onChange={setPlayBackDuration}
                ></Slider>
            </Stack>
            <SongPoolSelector items={SONG_POOLS} selection={songPool} onSelect={setSongPool}/>
            <Stack align="center" sx={{paddingTop: 60}}>
                <Button onClick={() => saveConfiguration()}>Save configuration</Button>
                <Link to="/displayqr">
                    <Button disabled={!gameConfigurationSaved}>
                        Invite players
                    </Button>
                </Link>
            </Stack>
        </Container>
    );
};

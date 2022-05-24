import {Button, Container, Group, Slider, Stack, Text, Title} from "@mantine/core";
import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {IGameConfiguration, TQuestionType} from "../../api/@def";
import {LIKED_SONG_POOLS, SONG_POOLS} from "../../api/StompApi";
import {GameContext} from "../../contexts/GameContext";
import {GameModeButton} from "../ui/GameModeButton";
import {SongPoolSelector} from "../ui/SongPoolSelector";

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
            const addHosttoLobby = await context.api.addPlayer(lobbyId, sessionStorage.getItem("name"));
            context.setLobbyId(lobbyId);
            if (sessionStorage.getItem("role") === "host") {
                context.setUserRole("host");
            } else {
                context.setUserRole("player");
            }
            context.setPlayerName(sessionStorage.getItem("name"));

            setConnected(true);
            context.info(`Lobby '${lobbyId}' created`);
        }

        connect();
    }, []);

    const gameModes: TQuestionType[] = ["Guess the song title", "Guess the song artist", "Guess the liked song"];
    const message = connected ? "Connected to Lobby" + context.lobbyId : "Connecting...";
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
                <Title order={2} sx={{color: "white", paddingTop: 20}}>
                    Game configuration
                </Title>
                <Text>{message}</Text>
                <Group spacing={0}
                       sx={{paddingBottom: 50, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
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

                <Text sx={{paddingTop: 20}}>{`Playback duration: ${playBackDuration} seconds`}</Text>
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
            {gameMode === "Guess the liked song" ? (
                <SongPoolSelector items={LIKED_SONG_POOLS} selection={songPool} onSelect={setSongPool}/>
            ) : (
                <SongPoolSelector items={SONG_POOLS} selection={songPool} onSelect={setSongPool}/>
            )}

            <Stack align="center" sx={{paddingTop: 60}}>
                <Link to="/displayqr">
                    <Button onClick={saveConfiguration}>Invite players</Button>
                </Link>
            </Stack>
        </Container>
    );
};


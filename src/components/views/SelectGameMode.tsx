import {Button, Container, Group, Slider, Stack, Text} from "@mantine/core";
import {useState} from "react";
import {Link} from "react-router-dom";

import {TQuestionType} from "../../api/@def";
import {GameModeButton} from "../ui/GameModeButton";
import {SONG_POOLS, SongPoolSelector} from "../ui/SongPoolSelector";

export const SelectGameMode = (props) => {
    const [gameMode, setGameMode] = useState<TQuestionType>("Guess the song");
    const [numberOfRounds, setNumberOfRounds] = useState(10);
    const [playbackDuration, setPlaybackDuration] = useState(10);
    const [songPool, setSongPool] = useState<string>(SONG_POOLS[0].id);

    const config = {
        gameMode,
        numberOfRounds,
        playbackDuration,
        songPool,
    };
    const gameModes: TQuestionType[] = ["Guess the song", "Guess the artist", "Guess the lyrics"];

    return (
        <Container size={500}>
            <Stack align="center">
                <h1>Game Configuration</h1>
                <Group spacing={0} sx={{paddingBottom: 50}}>
                    {gameModes.map((mode, i) => {
                        return <GameModeButton key={i} type={mode} selected={gameMode === mode}
                                               onSelect={() => setGameMode(mode)}/>;
                    })}
                </Group>
            </Stack>
            <Stack>
                <Text>{`Number of rounds: ${numberOfRounds}`}</Text>
                <Slider min={10} max={20} label={(value) => value.toFixed(0)} value={numberOfRounds} step={2}
                        onChange={setNumberOfRounds}></Slider>

                <Text>{`Playback duration: ${playbackDuration} seconds`}</Text>
                <Slider min={10} max={20} label={(value) => value.toFixed(0)} value={playbackDuration} step={2}
                        onChange={setPlaybackDuration}></Slider>
            </Stack>
            <SongPoolSelector items={SONG_POOLS} selection={songPool} onSelect={setSongPool}/>
            <Stack align="center" sx={{paddingTop: 60}}>
                <Button component={Link} to="/displayqr">
                    Invite players
                </Button>
            </Stack>
        </Container>
    );
};

import { Box, Button, Container, Group, Image, Slider, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";

import "styles/views/SelectGameMode.scss";

export type TSongPool = "a" | "b" | "c" | "d";

export const SelectGameMode = (props) => {
    const [songPool, setSongPool] = useState();
    const [gameMode, setGameMode] = useState("guessartist");
    const [numberOfRounds, setNumberOfRounds] = useState(5);
    const [playbackDuration, setPlaybackDuration] = useState(10);

    enum GameParA {
        TEN = 10,
        TWELVE = 12,
        FOURTEEN = 14,
        SIXTEEN = 16,
        EIGHTEEN = 18,
        TWENTY = 20,
    }

    const config = {
        gameMode,
        numberOfRounds,
        playbackDuration,
    };
    const iconSize = 60;
    const genreSize = 100;

    const genres = [
        {
            key: "Country",
            label: "Country",
            color: "#8C67AB",
        },
        {
            key: "CH",
            label: "CH",
            color: "#487D95",
        },
        {
            key: "TopHits",
            label: "Top Hits",
            color: "#1F3264",
        },
        {
            key: "Rock",
            label: "Rock",
            color: "#E8125C",
        },
        {
            key: "R&B",
            label: "R&B",
            color: "#BB5D19",
        },
        {
            key: "Hip Hop",
            label: "Hip Hop",
            color: "#777777",
        },
        {
            key: "Pop",
            label: "Pop",
            color: "#8C67AB",
        },
        {
            key: "Latino",
            label: "Latino",
            color: "#26856A",
        },
    ];

    return (
        <Container size={500}>
            <Stack align="center">
                <h1>Game Configuration</h1>
                <Group spacing={30} sx={{ paddingBottom: 50 }}>
                    <Stack align="center">
                        <Box sx={{ padding: 10, background: "#ffffff88", borderRadius: 60 }}>
                            <Image width={iconSize} height={iconSize} src="/images/artist.svg" />
                        </Box>
                        <Text style={{ color: "white" }}>Guess the artist</Text>
                    </Stack>
                    <Stack align="center">
                        <Box sx={{ padding: 10, background: "#ffffff22", borderRadius: 60 }}>
                            <Image width={iconSize} height={iconSize} src="/images/song.svg" />
                        </Box>
                        <Text>Guess the song</Text>
                    </Stack>
                    <Stack align="center">
                        <Box sx={{ padding: 10, background: "#ffffff22", borderRadius: 60 }}>
                            <Image width={iconSize} height={iconSize} src="/images/lyrics.svg" />
                        </Box>
                        <Text>Guess the lyrics</Text>
                    </Stack>
                </Group>
            </Stack>
            <Stack>
                <Text>{`Number of rounds: ${numberOfRounds}`}</Text>
                <Slider min={10} max={20} label={(value) => value.toFixed(0)} value={numberOfRounds} step={2} onChange={setNumberOfRounds}></Slider>

                <Text>{`Playback duration: ${playbackDuration} seconds`}</Text>
                <Slider min={10} max={20} label={(value) => value.toFixed(2)} value={playbackDuration} step={2} onChange={setPlaybackDuration}></Slider>
            </Stack>
            <Box sx={{ display: "flex", flexWrap: "wrap", padding: "50px 0 0 0", gap: 20 }}>
                {genres.map((genre, i) => {
                    return (
                        <Box key={i} sx={{ width: genreSize, height: genreSize, borderRadius: 10, backgroundColor: genre.color, padding: "10px 0 0 10px" }}>
                            <Text sx={{ fontSize: 20, fontWeight: "700" }}>{genre.label}</Text>
                        </Box>
                    );
                })}
            </Box>

            <Stack align="center" sx={{ paddingTop: 60 }}>
                <Button component={Link} to="/displayqr">
                    Invite players
                </Button>
            </Stack>
        </Container>
    );
};

import { Anchor, Button, Container, Image, SimpleGrid, Stack, Text } from "@mantine/core";
import { FC, useContext } from "react";

import { IGameResult } from "../../api/@def";
import { GameContext } from "../../contexts/GameContext";
import { GameResult } from "../ui/GameResult";
import { IGameController } from "./GameController";

export interface IPostRoundProps {
    controller: IGameController;
    result: IGameResult;
}

export const PostRound: FC<IPostRoundProps> = ({ controller, result }) => {
    const context = useContext(GameContext);

    if (!result) return null;

    const me = result.players.find((d) => d.playerName === context.playerName);
    const correct = me.streak > 0;
    const correctness = correct ? "Correct!" : "Wrong!";

    const nextRound = () => {
        context.stomp.nextRound(context.lobbyId);
    };

    const isHost = context.userRole === "host";

    return (
        <Container size={500}>
            <Stack align="center">
                <h1>{correctness}</h1>
                {result.correctAnswer === undefined ? (
                    <Text>correctAnswer undefined</Text>
                ) : (
                    <Text>
                        The correct answer is <b> {result.correctAnswer}</b>
                    </Text>
                )}
                <GameResult result={result} />

                <SimpleGrid
                    cols={2}
                    sx={{
                        justify: "center",
                        align: "center",
                        color: "white",
                        textAlign: "center",
                        backgroundColor: "#00000040",
                        borderRadius: "16px",
                        padding: "20px",
                        alignItems: "center",
                    }}
                >
                    <Stack spacing={0}>
                        <Image width="100px" height="100px" radius="lg" src={result.coverUrl} />
                        <Anchor href={result.spotifyLink} target="_blank" rel="noopener noreferrer" sx={{ paddingTop: "10px", textAlign: "left" }}>
                            Open Song in Spotify
                        </Anchor>
                    </Stack>
                    <Stack spacing={0}>
                        <Text weight={700}>{result.songTitle}</Text>
                        <Text>{" by "}</Text>
                        <Text weight={700}>{result.artist}</Text>
                    </Stack>
                </SimpleGrid>
            </Stack>
            {isHost && (
                <Stack sx={{ paddingTop: 20 }} align="center">
                    <Button onClick={() => nextRound()}>Continue</Button>
                </Stack>
            )}
        </Container>
    );
};

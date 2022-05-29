import { Anchor, Button, Group, Image, LoadingOverlay, SimpleGrid, Stack, Text } from "@mantine/core";
import { FC, useContext, useState } from "react";

import { IGameResult } from "../../api/@def";
import { GameContext } from "../../contexts/GameContext";
import BaseContainer from "../ui/BaseContainer";
import { GameResult } from "../ui/GameResult";
import { IGameController } from "./GameController";
import customLoader from "./RWLogo";

export interface IPostRoundProps {
    controller: IGameController;
    result: IGameResult;
}

export const PostRound: FC<IPostRoundProps> = ({ controller, result }) => {
    const context = useContext(GameContext);
    const [visible, setVisible] = useState(false);

    if (!result) return null;

    const me = result.players.find((d) => d.playerName === context.playerName);
    const correct = me.streak > 0;
    const correctness = correct ? "Correct!" : "Wrong!";

    const nextRound = () => {
        setVisible(true);
        context.stomp.nextRound(context.lobbyId);
    };

    const isHost = context.userRole === "host";

    //TODO: make bold correct answer!!!

    return (
        <BaseContainer>
            <LoadingOverlay visible={visible} loader={customLoader} />
            <Stack align="center" justify="center">
                <h1>{correctness}</h1>
                {result.correctAnswer === undefined ? (
                    <Text lineClamp={1} align="center">
                        correctAnswer undefined
                    </Text>
                ) : (
                    <Group spacing={5}>
                        <Text lineClamp={1} align="center">
                            The correct answer is
                        </Text>
                        <Text lineClamp={1} align="center" weight={700}>
                            {result.correctAnswer}
                            <span style={{ fontWeight: 400 }}>.</span>
                        </Text>
                    </Group>
                )}

                <Stack align="center" sx={{ paddingTop: 20, display: "flex", flexDirection: "column" }}>
                    <GameResult result={result} GameScreen={"PostRound"} />
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
                            width: "100%",
                            paddingTop: "20px",
                        }}
                    >
                        <Stack spacing={0}>
                            <Image width="100px" height="100px" radius="lg" src={result.coverUrl} />
                            <Anchor href={result.spotifyLink} target="_blank" rel="noopener noreferrer" sx={{ textAlign: "left" }}>
                                Open in Spotify
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
                        {result.gameOver === false ? <Button onClick={() => nextRound()}>Continue</Button> : <div></div>}
                    </Stack>
                )}
            </Stack>
        </BaseContainer>
    );
};

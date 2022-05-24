import {Anchor, Box, Button, Container, Image, Stack} from "@mantine/core";
import {FC, useContext} from "react";

import {IGameResult} from "../../api/@def";
import {GameContext} from "../../contexts/GameContext";
import {GameResult} from "../ui/GameResult";
import {IGameController} from "./GameController";

export interface IPostRoundProps {
    controller: IGameController;
    result: IGameResult;
}

export const PostRound: FC<IPostRoundProps> = ({controller, result}) => {
    const context = useContext(GameContext);

    if (!result) return null;

    const me = result.players.find((d) => d.playerName === context.playerName);
    const list = result.players.filter((d) => d !== me);
    list.unshift(me);
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
                {result.correctAnswer === undefined ? <div>correctAnswer undefined</div> :
                    <div>{"The correct answer is " + result.correctAnswer}</div>}
                <GameResult result={result}/>

                <Box
                    sx={{
                        color: "white",
                        textAlign: "center",
                        backgroundColor: "#00000040",
                        borderRadius: "16px",
                        padding: "20px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Image width="100px" height="100px" radius="lg" src={result.coverUrl}/>
                    <div>
                        {result.songTitle}
                        {" by "}
                        {result.artist}
                    </div>
                    <Anchor href={result.spotifyLink} target="_blank" rel="noopener noreferrer">
                        Open Song in Spotify
                    </Anchor>
                </Box>
            </Stack>
            {isHost && (
                <Stack sx={{paddingTop: 20}} align="center">
                    <Button onClick={() => nextRound()}>Continue</Button>
                </Stack>
            )}
        </Container>
    );
};

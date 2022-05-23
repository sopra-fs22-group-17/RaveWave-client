import { Button, Container, Stack } from "@mantine/core";
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

    console.log("PLAYERNAME: " + context.playerName);
    const me = result.players.find((d) => d.playerName === context.playerName);
    console.log("ME: " + me);
    const list = result.players.filter((d) => d !== me);
    console.log("LIST: " + JSON.stringify(list, null, 4));
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
                <GameResult result={result} />
            </Stack>
            {isHost && (
                <Stack sx={{ paddingTop: 20 }} align="center">
                    <Button onClick={() => nextRound()}>Continue</Button>
                </Stack>
            )}
        </Container>
    );
};

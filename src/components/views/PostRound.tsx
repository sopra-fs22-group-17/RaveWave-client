import {Button, Container, LoadingOverlay, Stack} from "@mantine/core";
import {FC, useContext, useState} from "react";
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
    const [visible, setVisible] = useState(false);

    if (!result) return null;

    const me = result.players.find((d) => d.playerName === context.playerName);
    const list = result.players.filter((d) => d !== me);
    list.unshift(me);
    const correct = me.streak > 0;
    const correctness = correct ? "Correct!" : "Wrong!";

    const nextRound = () => {
        setVisible(true);
        context.stomp.nextRound(context.lobbyId);
    };

    const isHost = context.userRole === "host";

    return (
        <Container size={500}>
            <LoadingOverlay visible={visible} />
            <Stack align="center">
                <h1>{correctness}</h1>
                <GameResult result={result}/>
            </Stack>
            {isHost && (
                <Stack sx={{paddingTop: 20}} align="center">
                    <Button onClick={() => nextRound()}>Continue</Button>
                </Stack>
            )}
        </Container>
    );
};

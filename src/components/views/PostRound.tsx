import {Button, Container, Stack} from "@mantine/core";
import {FC} from "react";
import {IGameResult} from "../../api/@def";
import {GameResult} from "../ui/GameResult";
import {IGameController} from "./GameController";
import {Link} from "react-router-dom";

export interface IPostRoundProps {
    controller: IGameController;
    result: IGameResult;
}

export const PostRound: FC<IPostRoundProps> = ({controller, result}) => {
    if (!result) return null;

    const ME = "3";
    const me = result.players.find((d) => d.playerId === ME);
    const list = result.players.filter((d) => d !== me);
    list.unshift(me);
    const correct = me.streak > 0;
    const correctness = correct ? "Correct!" : "Wrong!";

    return (
        <Container size={500}>
            <Stack align="center">
                <h1>{correctness}</h1>
                <GameResult result={result}/>
            </Stack>
            <Stack align="center" sx={{paddingTop: 60}}>
                <Button component={Link} to="/guesstheartist">
                    Next round
                </Button>
            </Stack>
        </Container>
    );
};

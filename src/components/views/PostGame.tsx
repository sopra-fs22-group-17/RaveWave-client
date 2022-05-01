import {Container, Stack} from "@mantine/core";
import {FC} from "react";
import {IGameResult} from "../../api/@def";
import {GameResult} from "../ui/GameResult";
import {IGameController} from "./GameController";

export interface IPostGameProps {
    controller: IGameController;
    result: IGameResult;
}

export const PostGame: FC<IPostGameProps> = ({controller, result}) => {
    if (!result) return null;

    return (
        <Container size={500}>
            <Stack align="center">
                <h1>Final Results</h1>
                <GameResult result={result}/>
            </Stack>
        </Container>
    );
};

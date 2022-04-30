import { Container } from "@mantine/core";
import { FC } from "react";
import { IGameResult } from "../../api/@def";
import { IGameController } from "./GameController";

export interface IPostGameProps {
    controller: IGameController;
    result: IGameResult;
}

export const PostGame: FC<IPostGameProps> = ({ controller, result }) => {
    return <Container size={500}>FIXME</Container>;
};

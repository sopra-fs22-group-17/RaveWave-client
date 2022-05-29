import { Button, Container, Stack } from "@mantine/core";
import { FC, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { IGameResult } from "../../api/@def";
import { GameContext } from "../../contexts/GameContext";
import { GameResult } from "../ui/GameResult";
import Podium from "../ui/Podium";
import { IGameController } from "./GameController";

export interface IPostGameProps {
    controller: IGameController;
    result: IGameResult;
}

export const PostGame: FC<IPostGameProps> = ({ controller, result }) => {
    const history = useHistory();

    const [visible, setVisible] = useState(false);
    const context = useContext(GameContext);
    if (!result) return null;

    const podiumData = result.players.map((player, position) => ({ ...player, position }));

    async function playAgain() {
        setVisible(true);
        history.push("/selectgamemode");
    }
    return (
        <Container size={500}>
            <Stack align="center">
                <h1>Final Results</h1>
                <Podium players={podiumData} />
                <GameResult result={result} GameScreen={"PostGame"} />
                {sessionStorage.getItem("role") === "host" ? <Button onClick={() => playAgain()}>Play again</Button> : <div></div>}
            </Stack>
        </Container>
    );
};

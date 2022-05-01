import {FC, useContext} from "react";

import {GameContext} from "../../contexts/GameContext";
import {GameController} from "./GameController";

export const GameView: FC<{}> = ({}) => {
    const context = useContext(GameContext);

    return <GameController role={context.userRole}/>;
};

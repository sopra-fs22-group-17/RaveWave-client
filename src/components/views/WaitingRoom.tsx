import { Button, Stack } from "@mantine/core";
import { IGameController } from "./GameController";

import "styles/views/WaitingRoom.scss";

export interface IWaitingRoomProps {
    controller: IGameController;
}

export const WaitingRoom = ({ controller }) => {
    return (
        <Stack align="center">
            <div className="waitingroom column-item">Waiting Room</div>
            <div className="waitingroom column-item">Game Mode: {localStorage.getItem("gameMode")}</div>
            <div className="waitingroom column-item">Number of Rounds: {localStorage.getItem("numberOfRounds")}</div>
            <div className="waitingroom column-item">Playback Speed: {localStorage.getItem("playbackSpeed")}</div>
            <div className="waitingroom column-item">Playback Duartion: {localStorage.getItem("playbackDuration")}</div>
            <div className="waitingroom column-item">Song Pool: {localStorage.getItem("songPool")}</div>
            <Button onClick={() => controller.startGame()}>Start Game (FIXME REMOVE)</Button>
        </Stack>
    );
};

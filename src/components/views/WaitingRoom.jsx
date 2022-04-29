import { useHistory } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";

import "styles/views/WaitingRoom.scss";
import { Button } from "@mantine/core";
import { api } from "../../helpers/api";

const WaitingRoom = (controller) => {
    return (
        <BaseContainer className="waitingroom">
            <div className="waitingroom column-item">Waiting Room</div>
            <div className="waitingroom column-item">Game Mode: {localStorage.getItem("gameMode")}</div>
            <div className="waitingroom column-item">Number of Rounds: {localStorage.getItem("numberOfRounds")}</div>
            <div className="waitingroom column-item">Playback Speed: {localStorage.getItem("playbackSpeed")}</div>
            <div className="waitingroom column-item">Playback Duartion: {localStorage.getItem("playbackDuration")}</div>
            <div className="waitingroom column-item">Song Pool: {localStorage.getItem("songPool")}</div>
            <Button onClick={api.send("ch1", "command", { method: "start" })} className="selectgamemode addplayers">
                Add players
            </Button>
        </BaseContainer>
    );
};

export default WaitingRoom;

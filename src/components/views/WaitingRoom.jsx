import { useHistory } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";

import "styles/views/WaitingRoom.scss";

const WaitingRoom = (props) => {
    return (
        <BaseContainer className="game container">
            <div>Waiting Room</div>
            <div>Game Mode: {localStorage.getItem("gameMode")}</div>
            <div>Number of Rounds: {localStorage.getItem("numberOfRounds")}</div>
            <div>Playback Speed: {localStorage.getItem("playbackSpeed")}</div>
            <div>Playback Duartion: {localStorage.getItem("playbackDuration")}</div>
            <div>Song Pool: {localStorage.getItem("songPool")}</div>
        </BaseContainer>
    );
};

export default WaitingRoom;

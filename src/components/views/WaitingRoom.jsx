import { useHistory } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";

import "styles/views/WaitingRoom.scss";

const WaitingRoom = (props) => {
    return (
        <BaseContainer className="game container">
            <p>Waiting Room</p>
            <p>Game Mode: {localStorage.getItem("gameMode")}</p>
            <p>Number of Rounds: {localStorage.getItem("numberOfRounds")}</p>
            <p>Playback Speed: {localStorage.getItem("playbackSpeed")}</p>
            <p>Playback Duartion: {localStorage.getItem("playbackDuration")}</p>
            <p>Song Pool: {localStorage.getItem("songPool")}</p>
        </BaseContainer>
    );
};

export default WaitingRoom;

import { Box } from "@mantine/core";
import { FC } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "styles/views/SpotifyPlayer.scss";

export interface ISpotifyPlayerProps {
    url: string;
    duration: number;
}

export const SpotifyPlayer: FC<ISpotifyPlayerProps> = ({ url, duration }) => {
    console.log(url);
    console.log(duration);

    return (
        <Box>
            <AudioPlayer
                className="audiopl"
                src={url}
                autoPlay={true}
                volume={0.5}
                showJumpControls={false}
                showFilledVolume={true}
                showDownloadProgress={false}
                hasDefaultKeyBindings={false}
                customProgressBarSection={[]}
                customControlsSection={[<div>Song Name: </div>, RHAP_UI.MAIN_CONTROLS]}
            />
        </Box>
    );
};

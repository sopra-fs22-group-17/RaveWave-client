import { Box } from "@mantine/core";
import { FC } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export interface ISpotifyPlayerProps {
    url: string;
    duration: number;
}

const styles = {
    container: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
    },
} as const;

export const SpotifyPlayer: FC<ISpotifyPlayerProps> = ({ url, duration }) => {
    console.log(url);
    console.log(duration);

    return (
        <Box>
            <AudioPlayer
                className="audiopl"
                style={styles.container}
                src={url}
                autoPlay={true}
                volume={0.5}
                showJumpControls={false}
                showFilledVolume={true}
                showDownloadProgress={false}
                hasDefaultKeyBindings={false}
                customProgressBarSection={[RHAP_UI.CURRENT_TIME, RHAP_UI.PROGRESS_BAR, RHAP_UI.DURATION]}
                customControlsSection={[<div>Song Name: </div>, RHAP_UI.MAIN_CONTROLS]}
            />
        </Box>
    );
};

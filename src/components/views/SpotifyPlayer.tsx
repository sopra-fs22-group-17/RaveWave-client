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
        padding: 0,
        backgroundColor: "transparent",
        boxShadow: "none",
    },
} as const;

export const samplePause = <svg role="img" xmlns="http://www.w3.org/2000/svg"></svg>;
export const samplePlay = (
    <svg>
        <circle cx="20" cy="20" r="18" stroke="#50d65d" strokeWidth="3" fill="none" />
        <polygon fill="none" stroke="#50d65d" strokeWidth="2" points="16,27 16,13 28,20"></polygon>
    </svg>
);

export const SpotifyPlayer: FC<ISpotifyPlayerProps> = ({ url }) => {
    return (
        <Box>
            <AudioPlayer
                style={styles.container}
                src={url}
                autoPlay={true}
                volume={0.5}
                showJumpControls={false}
                showFilledVolume={true}
                showDownloadProgress={false}
                hasDefaultKeyBindings={false}
                customProgressBarSection={[]}
                customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
                customIcons={{ pause: samplePause, play: samplePlay }}
            />
        </Box>
    );
};

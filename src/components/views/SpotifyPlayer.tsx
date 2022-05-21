import {Box} from "@mantine/core";
import {FC} from "react";
import AudioPlayer, {RHAP_UI} from "react-h5-audio-player";

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

export const SpotifyPlayer: FC<ISpotifyPlayerProps> = ({url, duration}) => {

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
                customControlsSection={[<div>Song Name: </div>, RHAP_UI.MAIN_CONTROLS]}
            />
        </Box>
    );
};

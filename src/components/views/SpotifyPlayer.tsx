import {Box} from "@mantine/core";
import {FC} from "react";
import AudioPlayer, {RHAP_UI} from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';
import "styles/views/SpotifyPlayer.scss";

export interface ISpotifyPlayerProps {
    url: string;
    duration: number;
}

export const SpotifyPlayer: FC<ISpotifyPlayerProps> = ({url, duration}) => {
    console.log(url);
    console.log(duration);

    return (
        <Box>
            <AudioPlayer className="audiopl"
                         src={url}
                         autoPlay={true}
                         showJumpControls={false}
                         showDownloadProgress={false}
                         hasDefaultKeyBindings={false}
                         customProgressBarSection={
                             [
                                 RHAP_UI.CURRENT_TIME,
                                 RHAP_UI.PROGRESS_BAR,
                                 RHAP_UI.DURATION
                             ]
                         }
                         customControlsSection={
                             [
                                 <div>Song Name: Heat Waves</div>,
                                 RHAP_UI.MAIN_CONTROLS,
                             ]
                         }
            />
        </Box>
    );
};
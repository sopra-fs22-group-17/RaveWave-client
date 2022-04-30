import React, { FC, useCallback } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mantine/core";
import Slider from "@mui/material/Slider";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/GuessArtist.scss";

import { WebPlaybackSDK, usePlaybackState, useSpotifyPlayer } from "react-spotify-web-playback-sdk";

import PropTypes from "prop-types";

// SPOTIFY STUFF
const SongTitle = () => {
    const playbackState = usePlaybackState();

    if (playbackState === null) return null;

    return <p>Current song: {playbackState.track_window.current_track.name}</p>;
};

const AUTH_TOKEN =
    "BQAajVDWR38cFQFBYLRO_YpH0hoY2s944tZZH-H23GMwUQSLD7JOqQlJrKaf-60-EuDLe0SwfDx74ph3s08n-DXRFQVPevJdyg55j980ZfFM_8dtV-1aKeted4Jj1owFtuAXEDATtbSYEKxUsp6NhKhT_AQAI2ilvg56UIBpDreGZcPTsgKI7UU";

const MySpotifyPlayer = () => {
    const getOAuthToken = useCallback((callback) => callback(AUTH_TOKEN), []);

    return (
        <WebPlaybackSDK deviceName="RaveWave" getOAuthToken={getOAuthToken} volume={1.0}>
            {/* `TogglePlay` and `SongTitle` will be defined later. Use player.resume() for init */}
            <SongTitle />
        </WebPlaybackSDK>
    );
};

// END SPOTIFY STUFF

const Widget = styled("div")(({ theme }) => ({
    padding: 16,
    borderRadius: 16,
    width: 343,
    maxWidth: "100%",
    margin: "auto",
    position: "relative",
    zIndex: 1,
    backgroundColor: theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
    backdropFilter: "blur(40px)",
}));

const CoverImage = styled("div")({
    width: 100,
    height: 100,
    objectFit: "cover",
    overflow: "hidden",
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.08)",
    "& > img": {
        width: "100%",
    },
});

const TinyText = styled(Typography)({
    fontSize: "0.75rem",
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});

function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
}

export const SpotifyPlayer: FC<{}> = ({}) => {
    //props.answer
    const theme = useTheme();
    const duration = 200; // seconds
    const [position, setPosition] = React.useState(32);

    return (
        <Box>
            <Widget>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CoverImage>
                        <img alt="can't win - Chilling Sunday" src="lotties/chilling-sunday.jpg" />
                    </CoverImage>
                    <Box sx={{ ml: 1.5, minWidth: 0 }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={500}>
                            Jun Pulse
                        </Typography>
                        <Typography noWrap>
                            <b>asd (Can&apos;t win)</b>
                        </Typography>
                        <Typography noWrap letterSpacing={-0.25}>
                            Chilling Sunday &mdash; คนเก่าเขาทำไว้ดี
                        </Typography>
                    </Box>
                </Box>
                <Slider
                    aria-label="time-indicator"
                    size="small"
                    value={position}
                    min={0}
                    step={1}
                    max={duration}
                    onChange={(_, value) => setPosition(value)}
                    sx={{
                        color: theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
                        height: 4,
                        "& .MuiSlider-thumb": {
                            width: 8,
                            height: 8,
                            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                            "&:before": {
                                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                            },
                            "&:hover, &.Mui-focusVisible": {
                                boxShadow: `0px 0px 0px 8px ${theme.palette.mode === "dark" ? "rgb(255 255 255 / 16%)" : "rgb(0 0 0 / 16%)"}`,
                            },
                            "&.Mui-active": {
                                width: 20,
                                height: 20,
                            },
                        },
                        "& .MuiSlider-rail": {
                            opacity: 0.28,
                        },
                    }}
                />
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: -2,
                    }}
                >
                    <TinyText>{formatDuration(position)}</TinyText>
                    <TinyText>-{formatDuration(duration - position)}</TinyText>
                </Box>
            </Widget>
            <div className="guessartist column-item">
                <MySpotifyPlayer />
            </div>
        </Box>
    );
};
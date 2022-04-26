import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";

import BaseContainer from "components/ui/BaseContainer";

import "styles/views/GuessArtist.scss";

const buttons = [<Button key="one">One</Button>, <Button key="two">Two</Button>, <Button key="three">Three</Button>, <Button key="four">Four</Button>];

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

const GuessArtist = (props) => {
    const theme = useTheme();
    const duration = 200; // seconds
    const [position, setPosition] = React.useState(32);
    const [paused, setPaused] = React.useState(false);
    const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";
    const lightIconColor = theme.palette.mode === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";

    return (
        <BaseContainer>
            <div>How is this song called?</div>
            <Box
                sx={{
                    display: "flex",
                    "& > *": {
                        m: 1,
                    },
                }}
            >
                <ButtonGroup orientation="vertical" aria-label="vertical contained button group" variant="contained">
                    {buttons}
                </ButtonGroup>
            </Box>
            <Box sx={{ width: "100%", overflow: "hidden" }}>
                <Widget>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CoverImage>
                            <img alt="can't win - Chilling Sunday" src="lotties/albumcover.png" />
                        </CoverImage>
                        <Box sx={{ ml: 1.5, minWidth: 0 }}>
                            <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                Jun Pulse
                            </Typography>
                            <Typography noWrap>
                                <b>คนเก่าเขาทำไว้ดี (Can&apos;t win)</b>
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
            </Box>
        </BaseContainer>
    );
};

export default GuessArtist;

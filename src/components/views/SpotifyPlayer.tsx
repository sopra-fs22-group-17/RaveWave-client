import { Box } from "@mantine/core";
import { FC } from "react";

export interface ISpotifyPlayerProps {
    url: string;
    duration: number;
}

export const SpotifyPlayer: FC<ISpotifyPlayerProps> = ({ url, duration }) => {
    return <Box>Player</Box>;
};

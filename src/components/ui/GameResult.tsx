import { Avatar, Box, Grid, Image, Sx } from "@mantine/core";
import { FC } from "react";

import { IGameResult } from "../../api/@def";

export interface IGameResultProps {
    result: IGameResult;
}

export const GameResult: FC<IGameResultProps> = ({ result }) => {
    if (!result) return null;

    const list = result.players;

    const wrapperStyleCorrect: Sx = {
        borderRadius: 40,
        padding: 10,
        backgroundColor: "#ffffff55",
        borderStyle: "solid",
        borderColor: "#2F9E44",
        borderWidth: "thick",
        display: "flex",
        alignItems: "center",
        flexWrap: "nowrap",
        gap: 12,
        width: "100%",
        maxHeight: "100px",
    };

    const wrapperStyleWrong: Sx = {
        borderRadius: 40,
        padding: 10,
        backgroundColor: "#ffffff55",
        borderStyle: "solid",
        borderColor: "red",
        borderWidth: "thick",
        display: "flex",
        alignItems: "center",
        flexWrap: "nowrap",
        gap: 12,
        width: "100%",
        maxHeight: "100px",
    };

    return (
        <Grid gutter={40} justify="center" sx={{ width: "100%", paddingBottom: "20px" }}>
            {list.map((player, i) => {
                return (
                    <Grid.Col key={i} span={12} sx={{ padding: "5px 0px", display: "flex", maxHeight: "100px" }}>
                        {player.streak > 0 ? (
                            <Box sx={wrapperStyleCorrect}>
                                <Avatar radius="xl" src={player.profilePicture} alt="it's me" />
                                <Box sx={{ paddingLeft: 10, fontSize: 24, fontWeight: 700, flex: 1 }}>{player.playerName}</Box>
                                <Box sx={{ fontSize: 20, fontWeight: 700, paddingRight: 20 }}>{player.totalScore}</Box>
                                <Image src="/images/flame.png" height="25px"></Image>
                                <Box sx={{ fontSize: 20, fontWeight: 700, paddingRight: 20 }}>{player.streak}</Box>
                            </Box>
                        ) : (
                            <Box sx={wrapperStyleWrong}>
                                <Avatar radius="xl" src={player.profilePicture} alt="it's me" />
                                <Box sx={{ paddingLeft: 10, fontSize: 24, fontWeight: 700, flex: 1 }}>{player.playerName}</Box>
                                <Box sx={{ fontSize: 20, fontWeight: 700, paddingRight: 20 }}>{player.totalScore}</Box>
                                <Image src="/images/flame.png" height="25px"></Image>
                                <Box sx={{ fontSize: 20, fontWeight: 700, paddingRight: 20 }}>{player.streak}</Box>
                            </Box>
                        )}
                    </Grid.Col>
                );
            })}
        </Grid>
    );
};

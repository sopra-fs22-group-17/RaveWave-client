import {Avatar, Box, Grid, Sx} from "@mantine/core";
import {FC} from "react";
import {IGameResult} from "../../api/@def";

export interface IGameResultProps {
    result: IGameResult;
}

export const GameResult: FC<IGameResultProps> = ({result}) => {
    if (!result) return null;

    const list = result.players;
    const wrapperStyle: Sx = {
        borderRadius: 40,
        padding: 10,
        backgroundColor: "#ffffff55",
        display: "flex",
        alignItems: "center",
        flexWrap: "nowrap",
        gap: 12,
    };

    return (
        <Grid gutter={40} justify="center">
            {list.map((player, i) => {
                return (
                    <Grid.Col key={i} span={12}>
                        <Box sx={wrapperStyle}>
                            <Avatar color="brightPink" radius="xl">
                                {player.playerName.substring(0, 1)}
                            </Avatar>
                            <Box
                                sx={{paddingLeft: 10, fontSize: 24, fontWeight: 700, flex: 1}}>{player.playerName}</Box>
                            <Box sx={{fontSize: 20, fontWeight: 700, paddingRight: 20}}>{player.totalScore}</Box>
                        </Box>
                    </Grid.Col>
                );
            })}
        </Grid>
    );
};

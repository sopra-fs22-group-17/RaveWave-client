import { Avatar, Box, Container, Grid, Group, Stack } from "@mantine/core";
import { FC } from "react";
import { IGameResult } from "../../api/@def";
import { IGameController } from "./GameController";

export interface IPostRoundProps {
    controller: IGameController;
    result: IGameResult;
}

export const PostRound: FC<IPostRoundProps> = ({ controller, result }) => {
    if (!result) return null;

    const ME = "3";
    const me = result.players.find((d) => d.playerId === ME);
    const list = result.players.filter((d) => d !== me);
    list.unshift(me);
    const correct = me.streak > 0;
    const correctness = correct ? "Correct!" : "Wrong!";

    return (
        <Container size={500}>
            <Stack align="center">
                <h1>{correctness}</h1>
                <Grid gutter={40} justify="center">
                    {list.map((player, i) => {
                        return (
                            <Grid.Col key={i} span={12}>
                                <Box>
                                    <Group key={i}>
                                        <Avatar color="cyan" radius="xl">
                                            {player.playerName.substring(0, 1)}
                                        </Avatar>
                                        <Box>{player.totalScore}</Box>
                                    </Group>
                                </Box>
                            </Grid.Col>
                        );
                    })}
                </Grid>
            </Stack>
        </Container>
    );
};

import {Avatar, Box, Grid, Image, Text, Sx} from "@mantine/core";
import {FC} from "react";

import {IGameResult} from "../../api/@def";

export interface IGameResultProps {
    result: IGameResult;
    GameScreen: string;
}

let textWidth = 80;
let minWidth = 0;

export const GameResult: FC<IGameResultProps> = ({result, GameScreen}) => {
    if (!result) return null;

    const list = result.players;

    let windowSize = window.innerWidth;

    if (windowSize >= 375) {
        textWidth = 100;
        minWidth = 365;
    }

    if (windowSize >= 390) {
        textWidth = 115;
        minWidth = 380;
    }

    if (windowSize >= 412) {
        textWidth = 140;
        minWidth = 400;
    }

    if (windowSize >= 500) {
        textWidth = 200;
        minWidth = 490;
    }

    if (windowSize >= 600) {
        textWidth = 300;
        minWidth = 590;
    }

    if (windowSize >= 700) {
        textWidth = 400;
        minWidth = 690;
    }

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
        mindWidth: minWidth,
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
        mindWidth: minWidth,
    };

    const wrapperStyleEnd: Sx = {
        borderRadius: 40,
        padding: 10,
        backgroundColor: "#ffffff55",
        display: "flex",
        alignItems: "center",
        flexWrap: "nowrap",
        gap: 12,
        width: "100%",
        maxHeight: "100px",
        mindWidth: minWidth,
    };

    if (GameScreen === "PostGame") {
        return (
            <Grid gutter={40} justify="center" sx={{width: "100%", paddingBottom: "20px"}}>
                {list.map((player, i) => {
                    return (
                        <Grid.Col key={i} span={12} sx={{padding: "5px 0px", display: "flex", maxHeight: "100px"}}>
                            <Box sx={wrapperStyleEnd}>
                                <Avatar radius="xl" src={player.profilePicture} alt="it's me"/>
                                <Box sx={{paddingLeft: 5, flex: 1}}>
                                    {player.playerName.includes("[RW]") ? (
                                        <Text sx={{fontSize: 24, fontWeight: 700, maxWidth: textWidth}}
                                              lineClamp={1}>{player.playerName.substring(5, player.playerName.length)}</Text>
                                    ) : (
                                        <Text sx={{fontSize: 24, fontWeight: 700, maxWidth: textWidth}}
                                              lineClamp={1}>{player.playerName}</Text>
                                    )}
                                </Box>
                                <Box sx={{fontSize: 20, fontWeight: 700, paddingRight: 20}}>{player.totalScore}</Box>
                                <Image src="/images/flame.png" height="25px" width="15px"></Image>
                                <Box sx={{fontSize: 20, fontWeight: 700, paddingRight: 20}}>{player.streak}</Box>
                            </Box>
                        </Grid.Col>
                    );
                })}
            </Grid>
        );
    } else {
        return (
            <Grid gutter={40} justify="center" sx={{width: "100%", paddingBottom: "20px"}}>
                {list.map((player, i) => {
                    if (player.playerName.includes("[RW]")) {
                        return (
                            <Grid.Col key={i} span={12} sx={{padding: "5px 0px", display: "flex", maxHeight: "100px"}}>
                                {player.streak > 0 ? (
                                    <Box sx={wrapperStyleCorrect}>
                                        <Avatar radius="xl" src={player.profilePicture} alt="it's me"/>
                                        <Box sx={{paddingLeft: 5, flex: 1}}>
                                            <Text sx={{fontSize: 24, fontWeight: 700, maxWidth: textWidth}}
                                                  lineClamp={1}>{player.playerName.substring(5, player.playerName.length)}</Text>
                                        </Box>
                                        <Box sx={{
                                            fontSize: 20,
                                            fontWeight: 700,
                                            paddingRight: 20
                                        }}>{player.totalScore}</Box>
                                        <Image src="/images/flame.png" height="25px" width="15px"></Image>
                                        <Box
                                            sx={{fontSize: 20, fontWeight: 700, paddingRight: 20}}>{player.streak}</Box>
                                    </Box>
                                ) : (
                                    <Box sx={wrapperStyleWrong}>
                                        <Avatar radius="xl" src={player.profilePicture} alt="it's me"/>
                                        <Box sx={{paddingLeft: 5, flex: 1}}>
                                            <Text sx={{fontSize: 24, fontWeight: 700, maxWidth: textWidth}}
                                                  lineClamp={1}>{player.playerName.substring(5, player.playerName.length)}</Text>
                                        </Box>
                                        <Box sx={{
                                            fontSize: 20,
                                            fontWeight: 700,
                                            paddingRight: 20
                                        }}>{player.totalScore}</Box>
                                        <Image src="/images/flame.png" height="25px" width="15px"></Image>
                                        <Box
                                            sx={{fontSize: 20, fontWeight: 700, paddingRight: 20}}>{player.streak}</Box>
                                    </Box>
                                )}
                            </Grid.Col>
                        );
                    } else {
                        return (
                            <Grid.Col key={i} span={12} sx={{padding: "5px 0px", display: "flex", maxHeight: "100px"}}>
                                {player.streak > 0 ? (
                                    <Box sx={wrapperStyleCorrect}>
                                        <Avatar radius="xl" src={player.profilePicture} alt="it's me"/>
                                        <Box sx={{paddingLeft: 5, flex: 1}}>
                                            <Text sx={{fontSize: 24, fontWeight: 700, maxWidth: textWidth}}
                                                  lineClamp={1}>{player.playerName}</Text>
                                        </Box>
                                        <Box sx={{
                                            fontSize: 20,
                                            fontWeight: 700,
                                            paddingRight: 20
                                        }}>{player.totalScore}</Box>
                                        <Image src="/images/flame.png" height="25px" width="15px"></Image>
                                        <Box
                                            sx={{fontSize: 20, fontWeight: 700, paddingRight: 20}}>{player.streak}</Box>
                                    </Box>
                                ) : (
                                    <Box sx={wrapperStyleWrong}>
                                        <Avatar radius="xl" src={player.profilePicture} alt="it's me"/>
                                        <Box sx={{paddingLeft: 5, flex: 1}}>
                                            <Text sx={{fontSize: 24, fontWeight: 700, maxWidth: textWidth}}
                                                  lineClamp={1}>{player.playerName}</Text>
                                        </Box>
                                        <Box sx={{
                                            fontSize: 20,
                                            fontWeight: 700,
                                            paddingRight: 20
                                        }}>{player.totalScore}</Box>
                                        <Image src="/images/flame.png" height="25px" width="15px"></Image>
                                        <Box
                                            sx={{fontSize: 20, fontWeight: 700, paddingRight: 20}}>{player.streak}</Box>
                                    </Box>
                                )}
                            </Grid.Col>
                        );
                    }
                })}
            </Grid>
        );
    }
};

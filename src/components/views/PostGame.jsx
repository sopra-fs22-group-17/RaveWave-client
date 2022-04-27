import {Button, Group} from "@mantine/core";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useHistory } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";

import { IGameResult } from "./GameController"; // how to import tsx interfaces in jsx?

import "styles/views/PostGame.scss";

const PostGame = (props) => {
    const history = useHistory();

    let result = IGameResult; // or do we need IGameResult.result here?

    if (!result) return null;

    return (
        <BaseContainer className="postgame">
            <div className="postgame column-item">End Results</div>
            <div>{result.correctAnswer.label}</div>
            {result.results.map((res, i) => {
                return (
                    <Group key={i}>
                        <Avatar color="cyan" radius="xl">
                            {res.username.substring(0, 1)}
                        </Avatar>
                        {res.correctness ? "OK" : "FAIL"}
                        {res.currentPoints}
                        {res.currentRank}
                    </Group>
                );
            })}
            <br></br>
            <Button onClick={() => history.push("/login")} className="postgame logout">Logout</Button>
            <Button onClick={() => history.push("/selectgamemode")} className="postgame playagain">Play Again</Button>
        </BaseContainer>
    );
};

export default PostGame;

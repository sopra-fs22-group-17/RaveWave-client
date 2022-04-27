import { Button } from "@mantine/core";
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

import "styles/views/PostGame.scss";

const PostGame = (props) => {
    const history = useHistory();

    return (
        <BaseContainer className="postgame">
            <div className="postgame column-item">End Results</div>
            <Stack direction="row" spacing={2} className="postgame column-item">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <div>Player 1</div>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                <div>Player 2</div>
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                <div>Player 3</div>
            </Stack>

            <br></br>

            <div className="postgame column-item">
                <Avatar alt="Cindy Baker" src="/static/images/avatar/4.jpg" />
                <div>Player 4</div>
            </div>

            <div className="postgame column-item">
                <Avatar alt="Cindy Baker" src="/static/images/avatar/5.jpg" />
                <div>Player 5</div>
            </div>
            <br></br>
            <Button onClick={() => history.push("/login")} className="postgame logout">Logout</Button>
            <Button onClick={() => history.push("/selectgamemode")} className="postgame playagain">Play Again</Button>
        </BaseContainer>
    );
};

export default PostGame;

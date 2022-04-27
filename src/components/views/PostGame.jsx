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
        <BaseContainer>
            <div>End Results</div>
            <Stack direction="row" spacing={2}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <div>Player 1</div>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                <div>Player 2</div>
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                <div>Player 3</div>
            </Stack>
            <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                <nav aria-label="main mailbox folders">
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </ListItemIcon>
                                <ListItemText primary="Player 4" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </ListItemIcon>
                                <ListItemText primary="Player 5" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
            </Box>

            <Button onClick={() => history.push("/selectgamemode")}>Play Again</Button>
            <Button onClick={() => history.push("/login")} class="logout Button">
                Logout
            </Button>
        </BaseContainer>
    );
};

export default PostGame;

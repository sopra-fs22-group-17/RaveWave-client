import { Button } from "@mantine/core";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
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
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                <Button onClick={() => history.push("/selectgamemode")} class="play again Button">
                    Play Again
                </Button>
                <Button onClick={() => history.push("/login")} class="logout Button">
                    Logout
                </Button>
            </Stack>
        </BaseContainer>
    );
};

export default PostGame;

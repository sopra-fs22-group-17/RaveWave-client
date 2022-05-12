import { Button, Container, Stack } from "@mantine/core";
import { FC } from "react";
import { Link } from "react-router-dom";

export const GameMenu: FC<{}> = ({}): any => {
    const routes = [
        {
            label: "Communication Debugger",
            route: "/debug",
        },
        {
            label: "GameView",
            route: "/game",
        },
        {
            label: "LandingHost",
            route: "/landinghost",
        },
        {
            label: "LandingPlayer",
            route: "/landingplayer/1234",
        },
        {
            label: "Login",
            route: "/login",
        },
        {
            label: "Register",
            route: "/register",
        },
        {
            label: "Guest",
            route: "/guest",
        },
        {
            label: "ConnectSpotify",
            route: "/connectspotify",
        },
        {
            label: "WaitingRoom",
            route: "/waitingroom",
        },
        {
            label: "SelectGameMode",
            route: "/selectgamemode",
        },
        {
            label: "DisplayQR",
            route: "/displayqr",
        },
        {
            label: "Post round",
            route: "/postround",
        },
        {
            label: "Post game",
            route: "/postgame",
        },
        {
            label: "Home",
            route: "/",
        },
    ];

    return (
        <Container size={300} sx={{ padding: 20 }}>
            <Stack>
                {routes.map((item, i) => {
                    return (
                        <Button key={i} component={Link} to={item.route}>
                            {item.label}
                        </Button>
                    );
                })}
            </Stack>
        </Container>
    );
};

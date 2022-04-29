import { Button, Stack } from "@mantine/core";
import { FC } from "react";
import { Link } from "react-router-dom";

export const GameMenu: FC<{}> = ({}): any => {
    const routes = [
        {
            label: "GameView",
            route: "/game/1",
        },
        {
            label: "LandingHost",
            route: "/landinghost",
        },
        {
            label: "LandingPlayer",
            route: "/landingplayer",
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
            label: "Home",
            route: "/",
        },
    ];

    return (
        <Stack>
            {routes.map((item, i) => {
                return (
                    <Button key={i}>
                        <Link to={item.route}>{item.label}</Link>
                    </Button>
                );
            })}
        </Stack>
    );
};

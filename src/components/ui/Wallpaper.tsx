import {createStyles} from "@mantine/core";
import {FC} from "react";

export interface IWallpaperProps {
}

export const Wallpaper: FC<IWallpaperProps> = () => {
    const {classes} = useStyles();

    return <div className={classes.root}></div>;
};

export const useStyles = createStyles((theme) => ({
    root: {
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        overflow: "hidden",
        zIndex: -1,
        background: "linear-gradient(rgb(63 29 126) 0%, rgb(172 2 208) 100%)",
        transition: "all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s",
        "&:before": {
            content: '""',
            opacity: 0.7,
            width: "140%",
            height: "140%",
            position: "absolute",
            top: "-40%",
            right: "-50%",
            background: "radial-gradient(at center center, rgb(190 15 227) 0%, rgba(62, 79, 249, 0) 64%)",
        },
        "&:after": {
            content: '""',
            opacity: 0.5,
            width: "150%",
            height: "150%",
            position: "absolute",
            bottom: "-65%",
            left: "-20%",
            background: "radial-gradient(at center center, rgb(216 99 59) 0%, rgba(247, 237, 225, 0) 70%)",
            transform: "rotate(30deg)",
        },
    },
}));

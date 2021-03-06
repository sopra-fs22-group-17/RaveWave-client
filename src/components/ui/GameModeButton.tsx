import { Box, createStyles, Image, Stack, Text, UnstyledButton } from "@mantine/core";
import { FC } from "react";

import { TQuestionType } from "../../api/@def";

export interface IGameModeButtonProps {
    type: TQuestionType;
    selected: boolean;
    iconSize?: number;
    onSelect?: () => void;
}

export const GameModeButton: FC<IGameModeButtonProps> = ({ type, selected, iconSize = 40, onSelect }) => {
    const { classes, cx } = useStyles({ iconSize });
    const icons: Record<TQuestionType, string> = {
        "Guess the song title": "/images/song.svg",
        "Guess the song artist": "/images/artist.svg",
        "Guess the liked song": "/images/likedsong.svg",
    };

    return (
        <UnstyledButton>
            <Stack align="center" className={cx(classes.root, { [classes.selected]: selected })} onClick={onSelect}>
                <Box className={cx(classes.button, { [classes.buttonSelected]: selected })}>
                    <Image width={iconSize} height={iconSize} src={icons[type]} />
                </Box>
                <Stack spacing={0}>
                    <Text>{type.substring(0, 9)}</Text>
                    <Text>{type.substring(10)}</Text>
                </Stack>
            </Stack>
        </UnstyledButton>
    );
};

interface IStylesParams {
    iconSize?: number;
}

export const useStyles = createStyles((theme, { iconSize }: IStylesParams) => ({
    root: {
        ...theme.fn.fontStyles(),
        fontWeight: "normal",
        padding: 10,
        borderRadius: 10,
        minWidth: 104,
        "&:hover": {
            background: "#ffffff11",
        },
    },
    selected: {
        fontWeight: "bold",
    },
    button: {
        padding: 10,
        background: "#ffffff22",
        borderRadius: iconSize,
        border: "1px solid transparent",
        "&:hover": {
            background: "#ffffffaa",
            border: "1px solid white",
        },
    },
    buttonSelected: {
        background: "#ffffff88",
        borderRadius: 60,
        border: "1px solid white",
    },
}));

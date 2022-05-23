import {Box, createStyles, Text, UnstyledButton} from "@mantine/core";
import {FC} from "react";

import {ISongPool} from "../../api/StompApi";

export interface ISongPoolSelectorProps {
    items: ISongPool[];
    selection: string;
    onSelect?: (selection: string) => void;
}

export const SongPoolSelector: FC<ISongPoolSelectorProps> = ({items, selection, onSelect}) => {
    const buttonSize = 100;
    const {classes, cx} = useStyles({buttonSize});

    return (
        <Box className={cx(classes.root)}>
            {items.map((item, i) => {
                const selected = item.id === selection;
                return (
                    <UnstyledButton
                        key={i}
                        className={cx(classes.button, selected && classes.buttonSelected)}
                        sx={{ backgroundColor: item.color, wordWrap: "break-word", overflow: "hidden", textOverflow: "ellipsis" }}
                        onClick={() => onSelect(item.id)}
                    >
                        <Text className={cx(classes.label)}>{item.label}</Text>
                    </UnstyledButton>
                );
            })}
        </Box>
    );
};

interface IStylesParams {
    buttonSize?: number;
}

export const useStyles = createStyles((theme, {buttonSize}: IStylesParams) => ({
    root: {
        ...theme.fn.fontStyles(),
        display: "flex",
        flexWrap: "wrap",
        padding: "60px 0 0 0",
        gap: 20,
    },
    button: {
        width: buttonSize,
        height: buttonSize,
        borderRadius: 10,
        padding: "10px 0 0 10px",
        "&:hover": {
            opacity: 0.8,
        },
        border: "1px solid transparent",
    },
    buttonSelected: {
        border: "1px solid white",
    },
    label: {
        fontSize: 20,
        fontWeight: "bold",
    },
}));

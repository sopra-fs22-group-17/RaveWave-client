import {Box, createStyles, Text, UnstyledButton, Group} from "@mantine/core";
import {FC} from "react";

import {ISongPool} from "../../api/StompApi";

export interface ISongPoolSelectorProps {
    items: ISongPool[];
    selection: string;
    onSelect?: (selection: string) => void;
}

export const SongPoolSelector: FC<ISongPoolSelectorProps> = ({items, selection, onSelect}) => {
    const buttonSize = 95;
    const {classes, cx} = useStyles({buttonSize});

    return (
        <Group className={cx(classes.root)}>
            {items.map((item, i) => {
                const selected = item.id === selection;
                return (
                    <UnstyledButton
                        key={i}
                        className={cx(classes.button, selected && classes.buttonSelected)}
                        sx={{
                            wordWrap: "break-word",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}
                        onClick={() => onSelect(item.id)}
                    >
                        <Text className={cx(classes.label)}>{item.label}</Text>
                    </UnstyledButton>
                );
            })}
        </Group>
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
        padding: "50px 0 0 0",
        gap: 20,
    },
    button: {
        width: buttonSize,
        height: buttonSize,
        borderRadius: 10,
        //background: "linear-gradient(127deg, rgb(63 29 126) 57%, rgb(172 2 208) 43%)",
        background: "linear-gradient(127deg, rgb(195 20 233) 0%, rgb(63 29 126) 105%)",
        backgroundAttachment: "fixed",
        //transform: "rotate(30deg)",
        padding: "7px 7px 7px 7px",
        "&:hover": {
            opacity: 1,
        },
        border: "1px solid transparent",
    },
    buttonSelected: {
        border: "3px solid white",
    },
    label: {
        fontSize: 20,
        fontWeight: "bold",
    },
}));

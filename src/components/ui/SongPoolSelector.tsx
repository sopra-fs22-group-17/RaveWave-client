import {Box, createStyles, Text, UnstyledButton, Group} from "@mantine/core";
import {FC} from "react";

import {ISongPool} from "../../api/StompApi";

export interface ISongPoolSelectorProps {
    items: ISongPool[];
    selection: string;
    onSelect?: (selection: string) => void;
}

export const SongPoolSelector: FC<ISongPoolSelectorProps> = ({items, selection, onSelect}) => {
    const buttonSize = 90;
    const {classes, cx} = useStyles({buttonSize});

    return (
        <Group position="center" className={cx(classes.root)}>
            {items.map((item, i) => {
                const selected = item.id === selection;
                return (
                    <UnstyledButton
                        key={i}
                        className={cx(classes.button, selected && classes.buttonSelected)}
                        sx={{
                            wordWrap: "break-word",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            boxShadow: "rgba(0, 0, 0, 0.3) 15px 34px 53px, rgba(0, 0, 0, 0.22) 15px 30px 27px",
                            transition: "transform 130ms ease-out",
                            zIndex: 1,
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
        background: "linear-gradient(127deg, rgb(215 40 253) 0%, rgb(72, 37, 158) 80%)",
        backgroundAttachment: "fixed",
        //transform: "rotate(1deg)",
        padding: "7px 7px 7px 7px",
        "&:hover": {
            transform: "translateY(-2px) scale(0.985)",
            //opacity: 0.85,
            //zIndex: 0,
        },
        textAlign: "center",
    },
    buttonSelected: {
        border: "3px solid white",
    },
    label: {
        fontWeight: "bold",
        wordWrap: "break-word",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
}));

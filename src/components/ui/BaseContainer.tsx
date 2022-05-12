import { Box } from "@mantine/core";
import { FCC } from "../@def";

export const BaseContainer: FCC<{}> = ({ children }) => {
    return <Box>{children}</Box>;
};

export default BaseContainer;

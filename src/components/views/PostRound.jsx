import { Avatar, Group, ScrollArea, Table, Text } from "@mantine/core";

import BaseContainer from "components/ui/BaseContainer";

import "styles/views/PostRound.scss";

const PostRound = (props) => {
    const user = {
        name: "Player",
        points: 0,
    };
    const rows = user.map((item) => (
        <tr key={item.name}>
            <td>
                <Group spacing="sm">
                    <Avatar size={40} src={item.avatar} radius={40} />
                    <div>
                        <Text size="sm" weight={500}>
                            {item.name}
                        </Text>
                    </div>
                </Group>
            </td>
            <td>
                <Text size="sm">{item.points}</Text>
            </td>
        </tr>
    ));

    return (
        <BaseContainer>
            <div>Wrong/Right</div>
            <ScrollArea>
                <Table sx={{ minWidth: 800 }} verticalSpacing="md">
                    <tbody>{rows}</tbody>
                </Table>
            </ScrollArea>
        </BaseContainer>
    );
};

export default PostRound;

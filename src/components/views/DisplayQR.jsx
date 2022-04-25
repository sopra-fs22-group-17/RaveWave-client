import { Director } from "../../model/Director";
import { Button, Center, Stack } from "@mantine/core";
import { QRCodeCanvas } from "qrcode.react";
import { useHistory } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";

import "styles/views/DisplayQR.scss";

const DisplayQR = (props) => {
    const history = useHistory();

    const direcor = new Director();
    direcor.ping();

    return (
        <>
            <BaseContainer className="game container">
                <p>Let other Players join via QR Code</p>
                <Button onClick={() => history.push("/selectgamemode")} className="displayqr backbutton">
                    Back
                </Button>
            </BaseContainer>
            <Stack>
                <Center>
                    <QRCodeCanvas value="https://frontwerks.com/" size={250} />,
                </Center>
                <Button onClick={() => history.push("/guesssong")} className="displayqr startgamebutton">
                    Start Game 2
                </Button>
            </Stack>
        </>
    );
};

export default DisplayQR;

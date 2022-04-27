import { Director } from "../../model/Director";
import { Button, Center, Stack } from "@mantine/core";
import { QRCodeCanvas } from "qrcode.react";
import { useHistory } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";

import "styles/views/DisplayQR.scss";

import PropTypes from "prop-types";
import React, { useState } from "react";

import "styles/views/Guest.scss";

const DisplayQR = (props) => {
    const history = useHistory();

    const direcor = new Director();
    direcor.ping();

    return (
        <>
            <BaseContainer className="displayqr">
                <div className="displayqr column-item">Let other Players join via QR Code</div>
                { // make button redirect to right game mode (via localstorage)
                }
            </BaseContainer>
            <Stack>
                <Center>
                    <QRCodeCanvas value="https://frontwerks.com/" size={250} />,
                </Center>
                <Button onClick={() => history.push("/selectgamemode")} className="displayqr back">
                    Back
                </Button>
                <Button onClick={() => history.push("/guesssong")} className="displayqr start">
                    Start Game
                </Button>
            </Stack>
        </>
    );
};

export default DisplayQR;

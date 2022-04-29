import { Button, Center, Stack } from "@mantine/core";
import PropTypes from "prop-types";
import { QRCodeCanvas } from "qrcode.react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import BaseContainer from "components/ui/BaseContainer";

import { Director } from "../../model/Director";

import "styles/views/DisplayQR.scss";
import "styles/views/Guest.scss";

const DisplayQR = (controller) => {
    const startAction = () => controller.startGame();

    return (
        <BaseContainer className="displayqr">
                <div className="displayqr column-item">Let other Players join via QR Code</div>
                {
                    // make button redirect to right game mode (via localstorage)
                }
                <Center className="displayqr column-item">
                    <QRCodeCanvas value="https://frontwerks.com/" size={250} />
                </Center>
                <Button onClick={startAction} className="displayqr start">
                    Start Game
                </Button>
        </BaseContainer>
    );
};

export default DisplayQR;

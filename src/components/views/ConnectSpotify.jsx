import { Button } from "@mantine/core";
import { Link } from "react-router";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import React, { useState } from "react";

import BaseContainer from "components/ui/BaseContainer";

import "styles/views/ConnectSpotify.scss";

const ConnectSpotify = (props) => {
    const history = useHistory();

    return (
        <BaseContainer className="container">
            <Button onClick={() => history.push('/')} class="container connectSpotify">Connect Spotify</Button>
        </BaseContainer>
    );
};

export default ConnectSpotify;

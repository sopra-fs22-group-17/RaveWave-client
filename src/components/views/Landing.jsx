import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import { Button } from '@mantine/core';
import Lottie from 'react-lottie';
import animationData from './lotties/RaveWaveAnimation.json';
import "styles/views/Landing.scss";

const Landing = (props) => {
    // use react-router-dom's hook to access the history
    const history = useHistory();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <BaseContainer className="game container">
            <p className="game paragraph">RaveWave Host</p>
            <Lottie options={defaultOptions} height={200} width={200} speed={0.1}/>
            <Button onClick={() => history.push('/register')} width="100%">Register</Button>
            <Button onClick={() => history.push('/login')} width="100%">Login</Button>
        </BaseContainer>
    );
}

export default Landing;

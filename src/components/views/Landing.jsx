import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import { Button } from '@mantine/core';

const Landing = (props) => {
    // use react-router-dom's hook to access the history
    const history = useHistory();

    return (
        <BaseContainer className="game container">
            <Button onClick={() => history.push('/login')} width="100%">login</Button>
            <Button onClick={() => history.push('/register')} width="100%">register</Button>
        </BaseContainer>
    );
}

export default Landing;

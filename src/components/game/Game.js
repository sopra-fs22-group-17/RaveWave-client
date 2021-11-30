import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import Player from '../../views/Player';
import {Spinner} from '../../views/design/Spinner';
import {Button} from '../../views/design/Button';
import {useHistory} from 'react-router-dom';

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Game = () => {
  const history = useHistory();
  const [users, setUsers] = useState(null);

  const logout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  }

  useEffect(async () => {
    try {
      const response = await api.get('/users');

      // delays continuous execution of an async operation for 1 second.
      // This is just a fake async call, so that the spinner can be displayed
      // feel free to remove it :)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get the returned users and update the state.
      setUsers(response.data);

      // This is just some data for you to see what is available.
      // Feel free to remove it.
      console.log('request to:', response.request.responseURL);
      console.log('status code:', response.status);
      console.log('status text:', response.statusText);
      console.log('requested data:', response.data);

      // See here to get more data.
      console.log(response);
    } catch (error) {
      console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
      console.error("Details:", error);
      alert("Something went wrong while fetching the users! See the console for details.");
    }
  }, []);

  let content = <Spinner/>;

  if (users) {
    content = (
      <div>
        <Users>
          {users.map(user => (
            <PlayerContainer key={user.id}>
              <Player user={user}/>
            </PlayerContainer>
          ))}
        </Users>
        <Button
          width="100%"
          onClick={() => logout()}
        >
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Container>
      <h2>Happy Coding! </h2>
      <p>Get all users from secure end point:</p>
      {content}
    </Container>
  );
}

export default Game;

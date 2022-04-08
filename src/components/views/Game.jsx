import React, {useCallback, useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import { motion } from "framer-motion"
import SpotifyPlayer from 'react-spotify-web-playback';
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { usePlaybackState } from "react-spotify-web-playback-sdk";
import { useSpotifyPlayer } from "react-spotify-web-playback-sdk";

const SongTitle: React.VFC = () => {
    const playbackState = usePlaybackState();

    if (playbackState === null) return null;

    return <p>Current song: {playbackState.track_window.current_track.name}</p>;
};

const AUTH_TOKEN = "BQDgWfbrw3LJMr056Fom7lZx19GcB98M6Zp0p38oT-Mdwd-esqpgjF2082KiQXYX2mMDZRqJO5SJK-NO2iJb-FQ0gRigRhA7CfS19ZQsmpVA156Dbpx0T534QyHxzcT4tex9pp41c3Ez3b8vrramxdr-R6ptm_Sm2osM1j3S1ab0UK1pVQEnzIk";

const PauseResumeButton = () => {
    const player = useSpotifyPlayer();

    if (player === null) return null;

    return (
        <div>
            <button onClick={() => player.pause()}>pause</button>
            <button onClick={() => player.resume()}>resume</button>
        </div>
    );
};

const MySpotifyPlayer: React.VFC = () => {
    const getOAuthToken = useCallback(callback => callback(AUTH_TOKEN), []);

    return (
        <WebPlaybackSDK
            deviceName="My awesome Spotify app"
            getOAuthToken={getOAuthToken}
            volume={0.5}>
            {/* `TogglePlay` and `SongTitle` will be defined later. */}
            <PauseResumeButton />
            <SongTitle />
        </WebPlaybackSDK>
    );
};

const Player = ({user}) => (
  <div className="player container">
    <div className="player username">{user.username}</div>
    <div className="player name">{user.name}</div>
    <div className="player id">id: {user.id}</div>
  </div>
);

Player.propTypes = {
  user: PropTypes.object
};

const Game = () => {
    // use react-router-dom's hook to access the history
    const history = useHistory();

    // define a state variable (using the state hook).
    // if this variable changes, the component will re-render, but the variable will
    // keep its value throughout render cycles.
    // a component can have as many state variables as you like.
    // more information can be found under https://reactjs.org/docs/hooks-state.html
    const [users, setUsers] = useState(null);

    const logout = () => {
        localStorage.removeItem('token');
        history.push('/login');
    }

  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {
        //const response = await api.get('/users');
        // delays continuous execution of an async operation for 1 second.
        // This is just a fake async call, so that the spinner can be displayed
        // feel free to remove it :)
        //await new Promise(resolve => setTimeout(resolve, 1000));

        // Get the returned users and update the state.
        //setUsers(response.data);

        // This is just some data for you to see what is available.
        // Feel free to remove it.
        //console.log('request to:', response.request.responseURL);
        //console.log('status code:', response.status);
        //console.log('status text:', response.statusText);
        //console.log('requested data:', response.data);

        // See here to get more data.
        //console.log(response);
      } catch (error) {
        console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
        console.error("Details:", error);
        alert("Something went wrong while fetching the users! See the console for details.");
      }
    }

    fetchData();
  }, []);

  let content = <Spinner/>;

  if (users) {
    content = (
      <div className="game">
        <ul className="game user-list">
          {users.map(user => (
            <Player user={user} key={user.id}/>
          ))}
        </ul>
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
    <BaseContainer className="game container">
      <h2>SprbaaBuBiBo!</h2>
        <MySpotifyPlayer/>
      <p className="game paragraph">
      </p>
    </BaseContainer>
  );
}

export default Game;

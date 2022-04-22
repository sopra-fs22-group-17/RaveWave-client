import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameGuard } from "components/routing/routeProtectors/GameGuard";
import { LoginGuard } from "components/routing/routeProtectors/LoginGuard";
import Landing from "components/views/Landing";
import JoinByQR from "components/views/JoinByQR";
import Login from "components/views/Login";
import Register from "components/views/Register";
import Guest from "components/views/Guest";
import ConnectSpotify from "components/views/ConnectSpotify";
import WaitingRoom from "components/views/WaitingRoom";
import SelectGameMode from "components/views/SelectGameMode";
import DisplayQR from "components/views/DisplayQR";
import GuessArtist from "components/views/GuessArtist";
import GuessLyrics from "components/views/GuessLyrics";
import GuessSong from "components/views/GuessSong";
import PostRound from "components/views/PostRound";
import PostGame from "components/views/PostGame";

import { WebSocket } from "API/websocket";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/landing">
                    <LoginGuard>
                        <Landing />
                    </LoginGuard>
                </Route>

                <Route exact path="/joinbyqr">
                    <JoinByQR />
                </Route>

                <Route exact path="/login">
                    <GameGuard>
                        <Login />
                    </GameGuard>
                </Route>

                <Route exact path="/register">
                    <GameGuard>
                        <Register />
                    </GameGuard>
                </Route>

                <Route exact path="/guest">
                    <GameGuard>
                        <Guest />
                    </GameGuard>
                </Route>

                <Route exact path="/connectspotify">
                    <GameGuard>
                        <ConnectSpotify />
                    </GameGuard>
                </Route>

                <Route exact path="/waitingroom">
                    <GameGuard>
                        <WaitingRoom />
                    </GameGuard>
                </Route>

                <Route exact path="/selectgamemode">
                    <GameGuard>
                        <SelectGameMode />
                    </GameGuard>
                </Route>

                <Route exact path="/displayqr">
                    <GameGuard>
                        <DisplayQR />
                    </GameGuard>
                </Route>

                <Route exact path="/guessartist">
                    <GameGuard>
                        <GuessArtist />
                    </GameGuard>
                </Route>

                <Route exact path="/guesslyrics">
                    <GameGuard>
                        <GuessLyrics />
                    </GameGuard>
                </Route>

                <Route exact path="/guesssong">
                    <GameGuard>
                        <GuessSong />
                    </GameGuard>
                </Route>

                <Route exact path="/postround">
                    <GameGuard>
                        <PostRound />
                    </GameGuard>
                </Route>

                <Route exact path="/postgame">
                    <GameGuard>
                        <PostGame />
                    </GameGuard>
                </Route>

                <Route exact path="/">
                    <Redirect to="/landing" />
                </Route>

                <Route exact path="/websocketdemo">
                    <WebSocket />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

/*
 * Don't forget to export your component!
 */
export default AppRouter;

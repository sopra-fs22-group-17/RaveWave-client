import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

// import { WebSocket } from "API/websocket";
// import { GameGuard } from "components/routing/routeProtectors/GameGuard";
// import { LoginGuard } from "components/routing/routeProtectors/LoginGuard";
// import ConnectSpotify from "components/views/ConnectSpotify";
// import DisplayQR from "components/views/DisplayQR";
// import GuessArtist from "components/views/GuessArtist";
// import GuessLyrics from "components/views/GuessLyrics";
// import GuessSong from "components/views/GuessSong";
// import Guest from "components/views/Guest";
// import LandingHost from "components/views/LandingHost";
// import LandingPlayer from "components/views/LandingPlayer";
// import Login from "components/views/Login";
// import PostGame from "components/views/PostGame";
// import PostRound from "components/views/PostRound";
// import Register from "components/views/Register";
// import SelectGameMode from "components/views/SelectGameMode";
// import WaitingRoom from "components/views/WaitingRoom";
import { GameView } from "../../views/GameView";

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
                <Route path="/game/:id?">
                    <GameView />
                </Route>

                {/* <Route exact path="/landinghost">
                    <LandingHost />
                </Route>

                <Route exact path="/landingplayer">
                    <LandingPlayer />
                </Route>

                <Route exact path="/login">
                    <Login />
                </Route>

                <Route exact path="/register">
                    <Register />
                </Route>

                <Route exact path="/guest">
                    <Guest />
                </Route>

                <Route exact path="/connectspotify">
                    <ConnectSpotify />
                </Route>

                <Route exact path="/waitingroom">
                    <WaitingRoom />
                </Route>

                <Route exact path="/selectgamemode">
                    <SelectGameMode />
                </Route>

                <Route exact path="/displayqr">
                    <DisplayQR />
                </Route>

                <Route exact path="/guessartist">
                    <GuessArtist />
                </Route>

                <Route exact path="/guesslyrics">
                    <GuessLyrics />
                </Route>

                <Route exact path="/guesssong">
                    <GuessSong />
                </Route>

                <Route exact path="/postround">
                    <PostRound />
                </Route>

                <Route exact path="/postgame">
                    <PostGame />
                </Route>

                <Route exact path="/">
                    <Redirect to="/landinghost" />
                </Route>

                <Route exact path="/websocketdemo">
                    <WebSocket />
                </Route> */}
            </Switch>
        </BrowserRouter>
    );
};

/*
 * Don't forget to export your component!
 */
export default AppRouter;

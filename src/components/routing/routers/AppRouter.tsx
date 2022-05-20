import { ConnectSpotify } from "components/views/ConnectSpotify";
import { DisplayQR } from "components/views/DisplayQR";
import { GameMenu } from "components/views/GameMenu";
import { Guest } from "components/views/Guest";
import { LandingHost } from "components/views/LandingHost";
import { LandingPlayer } from "components/views/LandingPlayer";
import { Login } from "components/views/Login";
import { Register } from "components/views/Register";
import { WaitingRoom } from "components/views/WaitingRoom";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { DebugView } from "../../views/DebugView";
import { GameView } from "../../views/GameView";
import { SelectGameMode } from "../../views/SelectGameMode";
import {PlayerGuard} from "../routeProtectors/PlayerGuard";
import {RaveWaverGuard} from "../routeProtectors/RaveWaverGuard";

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
                <Route path="/debug">
                    <DebugView />
                </Route>

                <Route exact path="/landinghost">
                    <LandingHost />
                </Route>

                <Route exact path="/landingplayer/:id?">
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

                <RaveWaverGuard>
                <Route exact path="/connectspotify">
                    <ConnectSpotify />
                </Route>
                </RaveWaverGuard>

                <PlayerGuard>
                <Route exact path="/waitingroom">
                    <WaitingRoom controller={null} />
                </Route>
                </PlayerGuard>

                <RaveWaverGuard>
                <Route exact path="/selectgamemode">
                    <SelectGameMode />
                </Route>
                </RaveWaverGuard>

                <Route exact path="/displayqr">
                    <DisplayQR controller={null} />
                </Route>

                <Route exact path="/menu">
                    <GameMenu />
                </Route>

                <Route exact path="/">
                    <Redirect to="/landinghost" />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

/*
 * Don't forget to export your component!
 */
export default AppRouter;

import {ConnectSpotify} from "components/views/ConnectSpotify";
import {DisplayQR} from "components/views/DisplayQR";
import {GameMenu} from "components/views/GameMenu";
import {Guest} from "components/views/Guest";
import {LandingHost} from "components/views/LandingHost";
import {LandingPlayer} from "components/views/LandingPlayer";
import {Login} from "components/views/Login";
import {Register} from "components/views/Register";
import {WaitingRoom} from "components/views/WaitingRoom";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {DebugView} from "../../views/DebugView";
import {GameView} from "../../views/GameView";
import {SelectGameMode} from "../../views/SelectGameMode";
import {PlayerGuard} from "../routeProtectors/PlayerGuard";
import {RaveWaverGuard} from "../routeProtectors/RaveWaverGuard";
import {LoginGuard} from "../routeProtectors/LoginGuard";

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
                    <PlayerGuard>
                        <GameView/>
                    </PlayerGuard>
                </Route>
                <Route path="/debug">
                    <DebugView/>
                </Route>

                <Route exact path="/landinghost">
                    <LoginGuard>
                        <LandingHost/>
                    </LoginGuard>
                </Route>

                <Route exact path="/landingplayer/:id?">
                    <LoginGuard>
                        <LandingPlayer/>
                    </LoginGuard>
                </Route>

                <Route exact path="/login">
                    <LoginGuard>
                        <Login/>
                    </LoginGuard>
                </Route>

                <Route exact path="/register">
                    <LoginGuard>
                        <Register/>
                    </LoginGuard>
                </Route>

                <Route exact path="/guest">
                    <Guest/>
                </Route>

                <Route exact path="/connectspotify">
                    <RaveWaverGuard>
                        <ConnectSpotify/>
                    </RaveWaverGuard>
                </Route>

                <Route exact path="/waitingroom">
                    <PlayerGuard>
                        <WaitingRoom controller={null}/>
                    </PlayerGuard>
                </Route>

                <Route exact path="/selectgamemode">
                    <RaveWaverGuard>
                        <SelectGameMode/>
                    </RaveWaverGuard>
                </Route>

                <Route exact path="/displayqr">
                    <RaveWaverGuard>
                        <DisplayQR controller={null}/>
                    </RaveWaverGuard>
                </Route>

                <Route exact path="/menu">
                    <GameMenu/>
                </Route>

                <Route exact path="/">
                    <LoginGuard>
                        <Redirect to="/landinghost"/>
                    </LoginGuard>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

/*
 * Don't forget to export your component!
 */
export default AppRouter;

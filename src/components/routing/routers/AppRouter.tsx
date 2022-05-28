import { ConnectSpotify } from "components/views/ConnectSpotify";
import { DisplayQR } from "components/views/DisplayQR";
import { Guest } from "components/views/Guest";
import { LandingHost } from "components/views/LandingHost";
import { LandingPlayer } from "components/views/LandingPlayer";
import { Login } from "components/views/Login";
import { Register } from "components/views/Register";
import { WaitingRoom } from "components/views/WaitingRoom";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameView } from "../../views/GameView";
import { SelectGameMode } from "../../views/SelectGameMode";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import { PlayerGuard } from "../routeProtectors/PlayerGuard";
import { RaveWaverGuard } from "../routeProtectors/RaveWaverGuard";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/game/:id?">
                    <PlayerGuard>
                        <GameView />
                    </PlayerGuard>
                </Route>
                <Route exact path="/landinghost">
                    <LoginGuard>
                        <LandingHost />
                    </LoginGuard>
                </Route>

                <Route exact path="/landingplayer/:id?">
                    <LoginGuard>
                        <LandingPlayer />
                    </LoginGuard>
                </Route>

                <Route exact path="/login">
                    <LoginGuard>
                        <Login />
                    </LoginGuard>
                </Route>

                <Route exact path="/register">
                    <LoginGuard>
                        <Register />
                    </LoginGuard>
                </Route>

                <Route exact path="/guest">
                    <Guest />
                </Route>

                <Route exact path="/connectspotify">
                    <RaveWaverGuard>
                        <ConnectSpotify />
                    </RaveWaverGuard>
                </Route>

                <Route exact path="/waitingroom">
                    <PlayerGuard>
                        <WaitingRoom controller={null} />
                    </PlayerGuard>
                </Route>

                <Route exact path="/selectgamemode">
                    <RaveWaverGuard>
                        <SelectGameMode />
                    </RaveWaverGuard>
                </Route>

                <Route exact path="/displayqr">
                    <RaveWaverGuard>
                        <DisplayQR controller={null} />
                    </RaveWaverGuard>
                </Route>

                <Route exact path="/">
                    <LoginGuard>
                        <Redirect to="/landinghost" />
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

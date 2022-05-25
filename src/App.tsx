import {NotificationsProvider} from "@mantine/notifications";

import AppRouter from "components/routing/routers/AppRouter";
import {Wallpaper} from "components/ui/Wallpaper";

import {GameProvider} from "./contexts/GameContext";
import HttpsRedirect from 'react-https-redirect'


const App = () => {


    return (
        <NotificationsProvider>
            <GameProvider>
                <HttpsRedirect>
                <Wallpaper/>
                <AppRouter/>
                </HttpsRedirect>
            </GameProvider>
        </NotificationsProvider>
    );
};

export default App;

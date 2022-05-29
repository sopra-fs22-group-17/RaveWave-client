import {NotificationsProvider} from "@mantine/notifications";

import AppRouter from "components/routing/routers/AppRouter";
import {Wallpaper} from "components/ui/Wallpaper";

import HttpsRedirect from 'react-https-redirect';
import {GameProvider} from "./contexts/GameContext";


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

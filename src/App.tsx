import {NotificationsProvider} from "@mantine/notifications";

import AppRouter from "components/routing/routers/AppRouter";
import {Wallpaper} from "components/ui/Wallpaper";

import {GameProvider} from "./contexts/GameContext";

const App = () => {

    return (
        <NotificationsProvider>
            <GameProvider>
                <Wallpaper/>
                <AppRouter/>
            </GameProvider>
        </NotificationsProvider>
    );
};

export default App;

import AppRouter from "components/routing/routers/AppRouter";
import { MantineProvider } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { stompClient } from "./api/StompApi";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 */
const App = () => {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        stompClient.connect(setIsConnected(true));
    }, []);

    if (!isConnected) {
        return null;
    }

    return <AppRouter />;
};

export default App;

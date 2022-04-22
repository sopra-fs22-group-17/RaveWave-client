import AppRouter from "components/routing/routers/AppRouter";
import { MantineProvider } from '@mantine/core';

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 */
const App = () => {
  return (
      <MantineProvider withCSSVariables>
          <AppRouter/>
      </MantineProvider>
  );
};

export default App;

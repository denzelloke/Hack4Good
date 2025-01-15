import ReactDOM from "react-dom/client";
import App from "./App";

import "@mantine/core/styles.css";
import { theme } from "./theme";
import { MantineProvider } from "@mantine/core";

import store from "./store";
import { Provider as ReduxProvider } from "react-redux";

import { AuthProvider } from "./backend/authProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthProvider>
    <ReduxProvider store={store}>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </ReduxProvider>
  </AuthProvider>
);

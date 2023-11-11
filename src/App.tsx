import { BrowserRouter } from 'react-router-dom';
import { Router } from "./Router";
import { CyclesContextProvider } from "./context/CyclesContext";

import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";


export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />   
    </ThemeProvider>
  )
}

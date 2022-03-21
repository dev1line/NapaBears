import { Suspense } from 'react';
import 'assets/fonts/stylesheet.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { BaseCSS, GridThemeProvider } from 'styled-bootstrap-grid';

import { useFontObserver } from 'hooks/useFontObserver';

import { Routes } from 'pages/Routes';
import { gridTheme, lightTheme } from 'styles/theme';
import { GlobalStyle } from 'styles/global';
import Web3 from 'web3';
import { Web3ReactProvider } from '@web3-react/core';
import { ToastContainer } from 'react-toastify';
import Layout from 'components/layout';

const loading = <div>Loading ...</div>;

const getLibrary = (provider: any): Web3 => new Web3(provider);

function App() {
  const fontLoaded = useFontObserver();
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {!fontLoaded && loading}
      <Suspense fallback={loading}>
        <ThemeProvider theme={lightTheme}>
          <GridThemeProvider gridTheme={gridTheme}>
            <>
              <GlobalStyle />
              <BaseCSS />
              <Router>
                <Layout>
                  <Routes />
                </Layout>
              </Router>
            </>
          </GridThemeProvider>
        </ThemeProvider>
        <ToastContainer />
      </Suspense>
    </Web3ReactProvider>
  );
}

export default App;

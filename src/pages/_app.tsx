import { useEffect } from "react";
import "@estilos/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@mui/material";
import temaOficial from "visual/temas/temas";
import Cabecalho from "visual/componentes/superficies/Header/Header";
import Rodape from "visual/componentes/superficies/Footer/Footer";
import { AppContainer } from "@estilos/pages/_app.styled";

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        document.querySelector("#jss-server-side")?.remove();
    }, []);

    return (
        <>
            <Head>
                <title>e-diaristas {pageProps.título && ` - ${pageProps.título}`}</title>
            </Head>
            <ThemeProvider theme={temaOficial}>
                <AppContainer>
                    <Cabecalho />
                    <main>
                        <Component {...pageProps} />
                    </main>
                    <Rodape />
                </AppContainer>
            </ThemeProvider>
        </>
    );
}

export default MyApp;

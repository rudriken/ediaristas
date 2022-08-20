import React from "react";
import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
    DocumentInitialProps,
} from "next/document";
import { ServerStyleSheets } from "@mui/styles";

export default class QualquerNome extends Document {
    static async getInitialProps(contexto: DocumentContext): Promise<DocumentInitialProps> {
        const folhas = new ServerStyleSheets(),
            renderizaçãoPáginaOriginal = contexto.renderPage;
        contexto.renderPage = () =>
            renderizaçãoPáginaOriginal({
                enhanceApp: (Aplicação) => (propriedades) =>
                    folhas.collect(<Aplicação {...propriedades} />),
            });
        const propriedadesIniciais = await Document.getInitialProps(contexto);
        return {
            ...propriedadesIniciais,
            styles: [
                ...React.Children.toArray(propriedadesIniciais.styles),
                folhas.getStyleElement(),
            ],
        };
    }

    render(): JSX.Element {
        return (
            <Html lang="pt-BR">
                <Head>
                    <link
                        rel="stylesheet"
                        href="
                        https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&
                        display=swap
                    "
                    />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                        rel="stylesheet"
                    />
                    <link href="/fontes/tw-icons/css/treinaweb-icons.css" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

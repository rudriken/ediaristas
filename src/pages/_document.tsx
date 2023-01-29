import React from "react";
import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import createEmotionCache from "logica/servicos/EmotionCache";

export default class QualquerNome extends Document {
	static async getInitialProps(contexto: DocumentContext) {
		const renderizacaoPaginaOriginal = contexto.renderPage;
		const cache = createEmotionCache();
		const { extractCriticalToChunks } = createEmotionServer(cache);
		contexto.renderPage = () =>
			renderizacaoPaginaOriginal({
				enhanceApp: (Aplicacao: any) =>
					function EnhanceApp(propriedades) {
						return (
							<Aplicacao emotionCache={cache} {...propriedades} />
						);
					},
			});
		const propriedadesIniciais = await Document.getInitialProps(contexto);
		const emotionStyles = extractCriticalToChunks(
			propriedadesIniciais.html
		);
		const emotionStyleTags = emotionStyles.styles.map((estilo) => (
			<style
				data-emotion={`${estilo.key} ${estilo.ids.join(" ")}`}
				key={estilo.key}
				dangerouslySetInnerHTML={{ __html: estilo.css }}
			/>
		));

		return {
			...propriedadesIniciais,
			emotionStyleTags,
		};
	}

	render(): JSX.Element {
		return (
			<Html lang="pt-BR">
				<Head>
					{(this.props as any).emotionStyleTags}
					<link
						rel="stylesheet"
						href="
                        https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&
                        display=swap
                    "
					/>
					<link
						rel="preconnect"
						href="https://fonts.googleapis.com"
					/>
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin=""
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
						rel="stylesheet"
					/>
					<link
						href="/fontes/tw-icons/css/treinaweb-icons.css"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

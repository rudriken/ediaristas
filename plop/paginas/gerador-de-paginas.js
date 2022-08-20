module.exports = function (gerarCódigoAutomático, manipuladores) {
    gerarCódigoAutomático.setGenerator("Página", {
        description: "Cria uma página automaticamente",
        prompts: [
            { 
				name: "nomePag", 
				type: "input", 
				message: "Nome da Página: " 
			},
            { 
				name: "pastaPag", 
				type: "input", 
				message: "Nome da Pasta: " 
			},
        ],
        actions(dado) {
            const ações = [
                {
                    type: "add",
                    path: `src/pages/${dado.pastaPag.toLowerCase()}/${
						manipuladores.createFilename(dado.nomePag)
					}.tsx`,
                    templateFile: "plop/paginas/pagina-modelo.hbs",
                },
                {
                    type: "add",
                    path: `src/visual/estilos/pages/${dado.pastaPag.toLowerCase()}/${
						manipuladores.createFilename(dado.nomePag)
					}.styled.tsx`,
                    templateFile: "plop/paginas/pagina-style-modelo.hbs",
                },
            ];
            return ações;
        },
    });
};

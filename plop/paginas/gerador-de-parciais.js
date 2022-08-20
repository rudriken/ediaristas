module.exports = function (gerarCódigoAutomático, manipuladores) {
    gerarCódigoAutomático.setGenerator("Parcial", {
        description: "Cria uma página parcial automaticamente",
        prompts: [
            {
                name: "nomePar",
                type: "input",
                message: "Nome da Parcial: ",
            },
            {
                name: "pastaPar",
                type: "input",
                message: "Nome da Pasta: ",
            },
        ],
        actions(dado) {
            const ações = [
                {
                    type: "add",
                    path: `src/visual/parciais/${dado.pastaPar.toLowerCase()}/_${
						manipuladores.createFilename(dado.nomePar)
					}.tsx`,
                    templateFile: "plop/paginas/parcial-modelo.hbs",
                },
                {
                    type: "add",
                    path: `src/visual/parciais/${dado.pastaPar.toLowerCase()}/_${
						manipuladores.createFilename(dado.nomePar)
					}.styled.tsx`,
                    templateFile: "plop/paginas/pagina-style-modelo.hbs",
                },
            ];
            return ações;
        },
    });
};

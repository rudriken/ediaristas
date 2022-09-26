module.exports = function (gerarCódigoAutomático) {
    gerarCódigoAutomático.setGenerator("componente", {
        description: "Cria um componente automaticamente",
        prompts: [
            { name: "nomeC", type: "input", message: "Nome do Componente: " },
            {
                name: "tipoC",
                type: "list",
                message: "Tipo do Componente: ",
                choices: [
                    { name: "Entradas", value: "entradas" },
                    { name: "Exibe Dados", value: "exibe-dados" },
                    { name: "Navegação", value: "navegacao" },
                    { name: "Retorno", value: "retorno" },
                    { name: "Superfícies", value: "superficies" },
                ],
            },
        ],
        actions(dado) {
            const caminhoBase = `src/visual/componentes/${dado.tipoC}/${dado.nomeC}/`;
            const ações = [
                {
                    type: "add",
                    path: `${caminhoBase}${dado.nomeC}.tsx`,
                    templateFile: "plop/componentes/componente-modelo.hbs",
                },
                {
                    type: "add",
                    path: `${caminhoBase}${dado.nomeC}.style.tsx`,
                    templateFile: "plop/componentes/componente-style-modelo.hbs",
                },
                {
                    type: "add",
                    path: `${caminhoBase}${dado.nomeC}.stories.tsx`,
                    templateFile: "plop/componentes/componente-story-modelo.hbs",
                },
                {
                    type: "add",
                    path: `${caminhoBase}${dado.nomeC}.test.tsx`,
                    templateFile: "plop/componentes/componente-teste-modelo.hbs",
                },
            ];
            return ações;
        },
    });
};

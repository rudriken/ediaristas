const geradorDeComponentes = require("./plop/componentes/gerador-de-componentes");
const geradorDePaginas = require("./plop/paginas/gerador-de-paginas");
const geradorDeParciais = require("./plop/paginas/gerador-de-parciais");

module.exports = function (automatizar) {
    Object.keys(manipuladores).forEach((função) => {
        automatizar.setHelper(função, manipuladores[função]);
    });

    geradorDeComponentes(automatizar, manipuladores);
    geradorDePaginas(automatizar, manipuladores);
    geradorDeParciais(automatizar, manipuladores);
};

const manipuladores = {
    getPath(pasta, nome) {
        let caminho = "";
        if (pasta) {
            caminho += `${pasta.toLowerCase()}/`;
        }
        caminho += `${nome.toLowerCase()}`;
        return caminho;
    },
    createFilename(nomeDoComponentePáginaOuParcial) {
        return nomeDoComponentePáginaOuParcial
            .replace(/([A-Z])/g, " $1")
            .trim()
            .toLowerCase()
            .split(" ")
            .join("-");
    },
};

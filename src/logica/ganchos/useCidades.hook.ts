import { useEffect, useState } from "react";
import { CidadeInterface } from "logica/@tipos/EnderecoInterface";
import { ServiçoLocalizacao } from "logica/servicos/ServicoLocalizacao";

export default function useCidades(estado: string): CidadeInterface[] {
	const [listaCidades, alterarListaCidades] = useState<CidadeInterface[]>([]);

	useEffect(() => {
		if (estado) {
			alterarListaCidades([]);
			ServiçoLocalizacao.listarCidades(estado).then((listaCidades) => {
				listaCidades && alterarListaCidades(listaCidades);
			});
		}
	}, [estado]);

	return listaCidades;
}

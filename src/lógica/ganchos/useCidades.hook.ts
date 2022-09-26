import { useEffect, useState } from "react";
import { CidadeInterface } from "lógica/@tipos/EndereçoInterface";
import { ServiçoLocalização } from "lógica/serviços/ServiçoLocalização";

export default function useCidades(estado: string): CidadeInterface[] {
	const [listaCidades, alterarListaCidades] = useState<CidadeInterface[]>([]);

	useEffect(() => {
		if (estado) {
			alterarListaCidades([]);
			ServiçoLocalização.listarCidades(estado).then((listaCidades) => {
				listaCidades && alterarListaCidades(listaCidades);
			});
		}
	}, [estado]);

	return listaCidades;
}

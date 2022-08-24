import useCidades from "lógica/ganchos/useCidades.hook";
import { ServiçoLocalização } from "lógica/serviços/ServiçoLocalização";
import { useFormContext } from "react-hook-form";
import { useMemo, useEffect } from "react";

export default function useFormularioEndereço() {
	const {
			register,
			control,
			watch,
			setValue,
			formState: { errors },
		} = useFormContext<{
			endereço: {
				cep: string;
				estado: string;
				cidade: string;
				bairro: string;
				logradouro: string;
				número: string;
				complemento: string;
				código_ibge: number;
			};
		}>(),
		[endereçoEstado, endereçoCidade, endereçoCEP] = watch([
			"endereço.estado",
			"endereço.cidade",
			"endereço.cep",
		]),
		estados = ServiçoLocalização.listarEstados(),
		listaCidades = useCidades(endereçoEstado),
		opçõesCidades = useMemo(
			() => listaCidades.map((item) => item.cidade),
			[listaCidades]
		);

	useEffect(() => {
		register("endereço.código_ibge");
	}, []);

	useEffect(() => {
		if (endereçoCidade) {
			const cidade = listaCidades.find((item) => {
				item.cidade === endereçoCidade;
			});
			if (cidade) {
				setValue("endereço.código_ibge", cidade.código_ibge);
			}
		}
	}, [endereçoCidade]);

	useEffect(() => {
		const cep = (endereçoCEP || "").replaceAll("_", "");
		if (cep.length === 10) {
			ServiçoLocalização.localizarCEP(cep).then((novoEndereço) => {
				if (novoEndereço) {
					novoEndereço.uf &&
						setValue("endereço.estado", novoEndereço.uf);
					novoEndereço.localidade &&
						setValue("endereço.cidade", novoEndereço.localidade);
					novoEndereço.ibge &&
						setValue("endereço.código_ibge", novoEndereço.ibge);
					novoEndereço.bairro &&
						setValue("endereço.bairro", novoEndereço.bairro);
					novoEndereço.logradouro &&
						setValue(
							"endereço.logradouro",
							novoEndereço.logradouro
						);
				}
			});
		}
	}, [endereçoCEP]);
	return {
		control,
		errors,
		estados,
		opçõesCidades,
		endereçoEstado,
		endereçoCidade,
		endereçoCEP,
		register,
	};
}

import useCidades from "lógica/ganchos/useCidades.hook";
import { ServiçoLocalização } from "lógica/serviços/ServiçoLocalização";
import { useFormContext } from "react-hook-form";
import { useMemo, useEffect, useContext } from "react";
import { NovaDiáriaFormulárioDeDadosInterface } from "lógica/@tipos/FormulárioInterface";
import { ContextoUsuario } from "lógica/contextos/ContextoUsuario";

export default function useFormularioEndereço() {
	const { enderecoUsuario, usuario } =
			useContext(ContextoUsuario).estadoUsuario,
		{
			register,
			control,
			watch,
			setValue,
			formState: { errors },
		} = useFormContext<NovaDiáriaFormulárioDeDadosInterface>(),
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
		register("endereço.codigo_ibge");
	}, []);

	useEffect(() => {
		if (endereçoCidade) {
			const cidade = listaCidades.find((item) => {
				item.cidade === endereçoCidade;
			});
			if (cidade) {
				setValue("endereço.codigo_ibge", cidade.codigo_ibge);
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
						setValue("endereço.codigo_ibge", novoEndereço.ibge);
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
		enderecoUsuario,
		usuario,
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

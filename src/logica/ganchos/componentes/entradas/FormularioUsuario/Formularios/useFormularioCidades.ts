import { CidadeInterface } from "logica/@tipos/EnderecoInterface";
import { ContextoUsuario } from "logica/contextos/ContextoUsuario";
import useCidades from "logica/ganchos/useCidades.hook";
import { useContext, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";

export default function useFormularioCidades(estado: string) {
	const { listaDeEnderecos } = useContext(ContextoUsuario).estadoUsuario,
		{ register, setValue, watch } = useFormContext(),
		listaDeCidades: CidadeInterface[] = useCidades(estado),
		cidadesAtendidas: CidadeInterface[] = watch("cidadesAtendidas", []),
		cidadesSelecionadas: string[] = useMemo(() => {
			return (cidadesAtendidas || []).map((item: CidadeInterface) => {
				return item.cidade;
			});
		}, [cidadesAtendidas]),
		cidadesASeremSelecionadas: CidadeInterface[] = useMemo(() => {
			return listaDeCidades.filter((item) => {
				return !cidadesSelecionadas.includes(item.cidade);
			});
		}, [listaDeCidades, cidadesSelecionadas]);

	useEffect(() => {
		register("cidadesAtendidas", { value: [] });
	}, []);

	useEffect(() => {
		listaDeEnderecos.length &&
			setValue("cidadesAtendidas", listaDeEnderecos);
	}, [listaDeEnderecos]);

	function aoSelecionarCidade(cidade: string | null) {
		if (cidade) {
			const novaCidade: CidadeInterface | undefined =
				cidadesASeremSelecionadas.find((item) => {
					return item.cidade === cidade;
				});
			novaCidade &&
				setValue("cidadesAtendidas", [...cidadesAtendidas, novaCidade]);
		}
	}

	function aoDesselecionarCidade(cidade: string) {
		setValue(
			"cidadesAtendidas",
			cidadesAtendidas.filter((item) => {
				return item.cidade !== cidade;
			})
		);
	}

	return {
		listaDeCidades,
		cidadesASeremSelecionadas,
		cidadesSelecionadas,
		aoSelecionarCidade,
		aoDesselecionarCidade,
	};
}

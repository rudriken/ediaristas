import useCidades from "lógica/ganchos/useCidades.hook";
import { ServiçoLocalização } from "lógica/serviços/ServiçoLocalização";
import { useFormContext } from "react-hook-form";
import { useMemo } from "react";

export default function useFormularioEndereço() {
	const {
			register,
			control,
			watch,
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
}

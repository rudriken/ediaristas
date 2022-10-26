import { Oportunidade } from "logica/@tipos/OportunidadeInterface";
import useMovelAtivo from "../useMovelAtivo";

export default function useOportunidadesTrabalho() {
	const movel = useMovelAtivo(),
		oportunidades = [] as Oportunidade[];
	return { movel, oportunidades };
}

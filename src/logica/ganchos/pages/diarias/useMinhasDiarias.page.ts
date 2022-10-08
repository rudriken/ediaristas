import { useContext } from "react";
import useMovelAtivo from "logica/ganchos/useMovelAtivo";
import { ContextoDiaria } from "logica/contextos/ContextoDiarias";

export default function useMinhasDiarias() {
	const movel = useMovelAtivo(),
		{ estadoDiaria } = useContext(ContextoDiaria),
		{ diarias } = estadoDiaria;
	return {
		movel,
	};
}

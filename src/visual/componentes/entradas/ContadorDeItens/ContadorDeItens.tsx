import React from "react";
// import {  } from "@mui/material";
import {ContainerContadorDeItens, BotaoCircular } from "./ContadorDeItens.style";

export interface ContadorDeItensProps {
	rótulo: string;
	plural: string;
	contador: number;
	incrementar: () => void;
	decrementar: () => void;
}

const ContadorDeItens: React.FC<ContadorDeItensProps> = ({
	rótulo,
	plural,
	contador = 0,
	incrementar,
	decrementar,
}) => {
	return (
		<ContainerContadorDeItens>
			<BotaoCircular onClick={decrementar}>
				<i className={"twf-minus"} />
			</BotaoCircular>
			<span>
				{contador} {contador > 1 ? plural : rótulo}
			</span>
			<BotaoCircular onClick={incrementar}>
				<i className={"twf-plus"} />
			</BotaoCircular>
		</ContainerContadorDeItens>
	);
};

export default ContadorDeItens;

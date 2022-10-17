import React from "react";
// import {  } from "@mui/material";
import { ContainerLasca, LascaEstilizada } from "./CampoDeLasca.style";

export interface CampoDeLascaProps {
	listaDeItens: string[];
	mensagemQuandoVazio?: string;
	paraDeletar?: (item: string) => void;
}

const CampoDeLasca: React.FC<CampoDeLascaProps> = ({
	listaDeItens,
	mensagemQuandoVazio = "Nada selecionado ainda",
	...outras
}) => {
	function paraExcluir(item: string) {
		if (outras.paraDeletar) {
			outras.paraDeletar(item);
		}
	}

	return (
		<ContainerLasca>
			{listaDeItens.length ? (
				listaDeItens.map((item, indice) => {
					return (
						<li key={indice}>
							<LascaEstilizada
								label={item}
								deleteIcon={<i className={"twf-times"} />}
								onDelete={() => paraExcluir(item)}
							/>
						</li>
					);
				})
			) : (
				<span>{mensagemQuandoVazio}</span>
			)}
		</ContainerLasca>
	);
};

export default CampoDeLasca;

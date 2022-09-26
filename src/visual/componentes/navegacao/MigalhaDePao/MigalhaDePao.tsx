import React from "react";
// import {  } from "@mui/material";
import { ContainerMigalhaDePao, ItemMigalhaDePao } from "./MigalhaDePao.style";

export interface MigalhaDePaoProps {
	selecionado: string;
	itens: string[];
}

const MigalhaDePao: React.FC<MigalhaDePaoProps> = ({ selecionado, itens }) => {
	return (
		<ContainerMigalhaDePao>
			{itens.map((item, índice) => (
				<React.Fragment key={item}>
					<ItemMigalhaDePao estaSelecionado={selecionado === item}>
						{item}
					</ItemMigalhaDePao>
					{índice !== itens.length - 1 && <span> &gt; </span>}
				</React.Fragment>
			))}
		</ContainerMigalhaDePao>
	);
};

export default MigalhaDePao;

import React, { ReactNode } from "react";
import {
	AccordionActions,
	AccordionDetails,
	AccordionSummary,
} from "@mui/material";
import { AcordeonEstilizado } from "./ListaDeDados.style";

export interface ListaDeDadosProps {
	cabecalho?: ReactNode;
	corpo?: ReactNode;
	acoes?: ReactNode;
}

const ListaDeDados: React.FC<ListaDeDadosProps> = ({
	cabecalho,
	corpo,
	acoes,
}) => {
	return (
		<AcordeonEstilizado>
			<AccordionSummary expandIcon={<i className={"twf-caret-down"} />}>
				{cabecalho}
			</AccordionSummary>
			<AccordionDetails>{corpo}</AccordionDetails>
			{acoes && <AccordionActions>{acoes}</AccordionActions>}
		</AcordeonEstilizado>
	);
};

export default ListaDeDados;

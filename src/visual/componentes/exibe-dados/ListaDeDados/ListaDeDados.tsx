import React, { ReactNode } from "react";
import {
	AccordionActions,
	AccordionDetails,
	AccordionSummary,
} from "@mui/material";
import { AcordeonEstilizado } from "./ListaDeDados.style";

export interface ListaDeDadosProps {
	cabeçalho?: ReactNode;
	corpo?: ReactNode;
	ações?: ReactNode;
}

const ListaDeDados: React.FC<ListaDeDadosProps> = ({
	cabeçalho,
	corpo,
	ações,
}) => {
	return (
		<AcordeonEstilizado>
			<AccordionSummary expandIcon={<i className={"twf-caret-down"} />}>
				{cabeçalho}
			</AccordionSummary>
			<AccordionDetails>{corpo}</AccordionDetails>
			{ações && <AccordionActions>{ações}</AccordionActions>}
		</AcordeonEstilizado>
	);
};

export default ListaDeDados;

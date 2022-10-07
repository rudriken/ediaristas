import React, { createContext } from "react";
import {
	RedutorDiariaInterface,
	estadoInicial,
	useRedutorDiaria,
} from "../redutores/RedutorDiarias";

const valorInicial: RedutorDiariaInterface = {
	estadoDiaria: estadoInicial,
	despachoDiaria: () => {},
};

export const ContextoDiaria = createContext(valorInicial);

export const ProvedorDiaria: React.FC = ({ children }) => {
	const redutor = useRedutorDiaria();
	return (
		<ContextoDiaria.Provider value={redutor}>
			{children}
		</ContextoDiaria.Provider>
	);
};

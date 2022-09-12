import React, { createContext } from "react";
import {
	RedutorServicosExternosInterface,
	estadoInicial,
	useRedutorServicosExternos,
} from "../redutores/RedutorServicosExternos";

const valorInicial: RedutorServicosExternosInterface = {
	estadoServicosExternos: estadoInicial,
	despachoServicosExternos: () => {},
};

export const ContextoServicosExternos = createContext(valorInicial);

export const ProvedorServicosExternos: React.FC = ({ children }) => {
	const redutor = useRedutorServicosExternos();
	return (
		<ContextoServicosExternos.Provider value={redutor}>
			{children}
		</ContextoServicosExternos.Provider>
	);
};

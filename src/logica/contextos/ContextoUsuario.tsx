import React, { createContext, PropsWithChildren } from "react";
import {
	RedutorUsuarioInterface,
	estadoInicial,
	useRedutorUsuario,
} from "../redutores/RedutorUsuario";

const valorInicial: RedutorUsuarioInterface = {
	estadoUsuario: estadoInicial,
	despachoUsuario: () => {},
};

export const ContextoUsuario = createContext(valorInicial);

export const ProvedorUsuario: React.FC<PropsWithChildren> = ({ children }) => {
	const redutor = useRedutorUsuario();
	return (
		<ContextoUsuario.Provider value={redutor}>
			{children}
		</ContextoUsuario.Provider>
	);
};

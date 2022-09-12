import React from "react";
import { ProvedorServicosExternos } from "./ContextoServicosExternos";

export const ProvedorPrincipal: React.FC = ({ children }) => {
	return (
		<>
			<ProvedorServicosExternos>{children}</ProvedorServicosExternos>
		</>
	);
};

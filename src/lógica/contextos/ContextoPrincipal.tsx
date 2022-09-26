import React from "react";
import { ProvedorServicosExternos } from "./ContextoServicosExternos";
import { ProvedorUsuario } from "./ContextoUsuario";

export const ProvedorPrincipal: React.FC = ({ children }) => {
	return (
		<>
			<ProvedorServicosExternos>
				<ProvedorUsuario>
					{children}
				</ProvedorUsuario>
			</ProvedorServicosExternos>
		</>
	);
};

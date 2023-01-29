import React, { PropsWithChildren } from "react";
import { ProvedorServicosExternos } from "./ContextoServicosExternos";
import { ProvedorUsuario } from "./ContextoUsuario";

export const ProvedorPrincipal: React.FC<PropsWithChildren> = ({
	children,
}) => {
	return (
		<>
			<ProvedorServicosExternos>
				<ProvedorUsuario>{children}</ProvedorUsuario>
			</ProvedorServicosExternos>
		</>
	);
};

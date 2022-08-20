import React from "react";
import { passwordStrength } from "check-password-strength";
import { Typography } from "@mui/material";
import { ForcaDaSenhaRótulo, ForcaDaSenhaBarra } from "./ForcaDaSenha.style";

export interface ForcaDaSenhaProps {
	senha: string;
}

const ForcaDaSenha: React.FC<ForcaDaSenhaProps> = ({ senha }) => {
	const força = senha ? passwordStrength(senha).id : 0,
		porcentagemDaForça = ((força + 1) / 4) * 100;
	return (
		<div style={{ gridArea: "senha-força" }}>
			<Typography
				variant={"body2"}
				component={"span"}
				color={"textSecondary"}
			>
				Nível da senha: &nbsp;
				<ForcaDaSenhaRótulo value={porcentagemDaForça}>
					{força === 0 && "FRACA"}
					{força === 1 && "MÉDIA"}
					{força === 2 && "FORTE"}
					{força === 3 && "PERFEITA"}
				</ForcaDaSenhaRótulo>
			</Typography>
			<ForcaDaSenhaBarra
				value={porcentagemDaForça}
				variant={"determinate"}
			/>
		</div>
	);
};

export default ForcaDaSenha;

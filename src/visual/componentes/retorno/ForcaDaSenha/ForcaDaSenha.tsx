import React from "react";
import { passwordStrength } from "check-password-strength";
import { Typography } from "@mui/material";
import { ForcaDaSenhaRotulo, ForcaDaSenhaBarra } from "./ForcaDaSenha.style";

export interface ForcaDaSenhaProps {
	senha: string;
}

const ForcaDaSenha: React.FC<ForcaDaSenhaProps> = ({ senha }) => {
	const forca = senha ? passwordStrength(senha).id : 0,
		porcentagemDaForca = ((forca + 1) / 4) * 100;
	return (
		<div style={{ gridArea: "senha-forca" }}>
			<Typography
				variant={"body2"}
				component={"span"}
				color={"textSecondary"}
			>
				Nível da senha: &nbsp;
				<ForcaDaSenhaRotulo value={porcentagemDaForca}>
					{forca === 0 && "FRACA"}
					{forca === 1 && "MÉDIA"}
					{forca === 2 && "FORTE"}
					{forca === 3 && "PERFEITA"}
				</ForcaDaSenhaRotulo>
			</Typography>
			<ForcaDaSenhaBarra
				value={porcentagemDaForca}
				variant={"determinate"}
			/>
		</div>
	);
};

export default ForcaDaSenha;

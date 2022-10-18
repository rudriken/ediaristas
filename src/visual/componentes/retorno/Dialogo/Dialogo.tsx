import { Button } from "@mui/material";
import useMovelAtivo from "logica/ganchos/useMovelAtivo";
import React from "react";
// import {  } from "@mui/material";
import {
	DialogoContainer,
	DialogoTitulo,
	DialogoConteudo,
	DialogoConteudoSubtitulo,
	DialogoAcoes,
	BotaoFechar,
} from "./Dialogo.style";

export interface DialogoProps {
	children?: React.ReactNode;
	titulo?: string;
	subtitulo?: string;
	aberto: boolean;
	rotuloConfirmar?: string;
	rotuloCancelar?: string;
	naoTerBotaoConfirmar?: boolean;
	naoTerBotaoCancelar?: boolean;
	aoConfirmar?: () => void;
	aoCancelar?: () => void;
	aoFechar: () => void;
}

const Dialogo: React.FC<DialogoProps> = (propriedades) => {
	const movel = useMovelAtivo();
	return (
		<DialogoContainer
			open={propriedades.aberto}
			onClose={propriedades.aoFechar}
			fullWidth
			fullScreen={movel}
		>
			{propriedades.titulo && (
				<DialogoTitulo>
					{propriedades.titulo}
					<BotaoFechar
						onClick={
							propriedades.aoCancelar || propriedades.aoFechar
						}
					>
						<i className={"twf-times"} />
					</BotaoFechar>
				</DialogoTitulo>
			)}

			<DialogoConteudo>
				{propriedades.subtitulo && (
					<DialogoConteudoSubtitulo>
						{propriedades.subtitulo}
					</DialogoConteudoSubtitulo>
				)}
				{propriedades.children}
			</DialogoConteudo>
			<DialogoAcoes>
				{!propriedades.naoTerBotaoCancelar && (
					<Button
						size={"large"}
						variant={"outlined"}
						onClick={
							propriedades.aoCancelar || propriedades.aoFechar
						}
					>
						{propriedades.rotuloCancelar || "Fechar"}
					</Button>
				)}
				{!propriedades.naoTerBotaoConfirmar && (
					<Button
						size={"large"}
						variant={"contained"}
						color={"secondary"}
						onClick={
							propriedades.aoConfirmar || propriedades.aoFechar
						}
					>
						{propriedades.rotuloConfirmar || "Confirmar"}
					</Button>
				)}
			</DialogoAcoes>
		</DialogoContainer>
	);
};

export default Dialogo;

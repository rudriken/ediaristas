import React, { useState, ChangeEvent } from "react";
import { TextFieldProps } from "@mui/material";
import { ContainerCampoDeArquivo, IconeDeCarregamento } from "./CampoDeArquivo.style";
import CampoDeTextoEstilizado from "../CampoDeTexto/CampoDeTexto";

export interface CampoDeArquivoProps extends Omit<TextFieldProps, "onChange"> {
	onChange: (arquivos: FileList) => void;
}

const CampoDeArquivo: React.FC<CampoDeArquivoProps> = ({ onChange, ...outras }) => {
	const [caminhoDoArquivo, alterarCaminhoDoArquivo] = useState("");

	function tratarEscolhaArquivo(evento: ChangeEvent) {
		const alvo = evento.target as HTMLInputElement, arquivos = alvo.files;

		if (arquivos !== null && arquivos.length) {
			alterarCaminhoDoArquivo(arquivos[0]?.name || "");
			onChange(arquivos);
		}
	}

	return (
		<ContainerCampoDeArquivo>
			<CampoDeTextoEstilizado
				label={"Selecione o arquivo"}
				value={caminhoDoArquivo}
				InputProps={{
					endAdornment: (<IconeDeCarregamento className={"twf-upload"} />),
				}}
				{...outras}
				fullWidth
			/>
			<CampoDeTextoEstilizado type="file" fullWidth onChange={tratarEscolhaArquivo} />
		</ContainerCampoDeArquivo>
	);
};

export default CampoDeArquivo;

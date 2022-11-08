import React from "react";
import { DiariaInterface } from "logica/@tipos/DiariaInterface";
import InformacoesDoServico from "visual/componentes/exibe-dados/InformacoesDoServico/InformacoesDoServico";
import { ServicoFormatadorDeTexto } from "logica/servicos/ServicoFormatadorDeTexto";
import { ServicoData } from "logica/servicos/ServicoData";
import Dialogo from "visual/componentes/retorno/Dialogo/Dialogo";
import InformacaoDoUsuario from "visual/componentes/exibe-dados/InformacaoDoUsuario/InformacaoDoUsuario";
import { Typography } from "@mui/material";

interface DialogoProps {
	diaria: DiariaInterface;
	aoConfirmar: (diaria: DiariaInterface) => void;
	aoCancelar: () => void;
}

const CaixinhaDeTrabalho: React.FC<{ diaria: DiariaInterface }> = ({
	diaria,
}) => {
	return (
		<InformacoesDoServico>
			<>
				<div>
					Data:{" "}
					<strong>
						{ServicoFormatadorDeTexto.reverterFormatoDeData(
							diaria.data_atendimento as string
						)}{" "}
						às{" "}
						{ServicoData.pegarTempoDeData(
							diaria.data_atendimento as string
						)}
					</strong>
				</div>
				<div>
					Endereço: {ServicoFormatadorDeTexto.pegarEndereco(diaria)}
				</div>
				<div>
					<strong>
						Valor:{" "}
						{ServicoFormatadorDeTexto.formatarMoeda(diaria.preco)}
					</strong>
				</div>
			</>
		</InformacoesDoServico>
	);
};

export const ConfirmarDialogo: React.FC<DialogoProps> = (propriedades) => {
	const { diaria, aoCancelar, aoConfirmar } = propriedades;
	return (
		<Dialogo
			aberto={true}
			aoFechar={aoCancelar}
			aoConfirmar={() => aoConfirmar(diaria)}
			titulo={"Confirmar presença do(a) diarista"}
			subtitulo={
				"Você confirma a presença do(a) diarista na diária abaixo?"
			}
		>
			<CaixinhaDeTrabalho diaria={diaria} />
			<InformacaoDoUsuario
				nome={diaria.diarista?.nome_completo || ""}
				avaliacao={diaria.diarista?.reputacao || 1}
				descricao={
					"Telefone: " +
					ServicoFormatadorDeTexto.formatarTelefone(
						diaria.diarista?.telefone || ""
					)
				}
				foto={diaria.diarista?.foto_usuario || ""}
			/>
			<Typography
				sx={{ py: 2 }}
				variant={"subtitle2"}
				color={"textSecondary"}
			>
				Ao confirmar a presença do(a) diarista, você está definindo que
				o serviço foi realizado em sua residência e autoriza a
				plataforma a fazer o repasse do valor para o(a) profissional.
				Caso você tenha algum problema, pode entrar em contato com a
				nossa equipe pelo e-mail sac@e-diaristas.com.br
			</Typography>
		</Dialogo>
	);
};

import React, { useContext, useState } from "react";
import { DiariaInterface } from "logica/@tipos/DiariaInterface";
import InformacoesDoServico from "visual/componentes/exibe-dados/InformacoesDoServico/InformacoesDoServico";
import { ServicoFormatadorDeTexto } from "logica/servicos/ServicoFormatadorDeTexto";
import { ServicoData } from "logica/servicos/ServicoData";
import Dialogo from "visual/componentes/retorno/Dialogo/Dialogo";
import InformacaoDoUsuario from "visual/componentes/exibe-dados/InformacaoDoUsuario/InformacaoDoUsuario";
import { Divider, Rating, Snackbar, Typography } from "@mui/material";
import { CaixinhaDeAvaliacao } from "./_minhas-diarias.styled";
import CampoDeTexto from "visual/componentes/entradas/CampoDeTexto/CampoDeTexto";
import useMovelAtivo from "logica/ganchos/useMovelAtivo";
import { ContextoUsuario } from "logica/contextos/ContextoUsuario";
import { TipoDoUsuario } from "logica/@tipos/InterfaceDoUsuario";

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

interface AvaliarDialogoProps extends Omit<DialogoProps, "aoConfirmar"> {
	aoConfirmar: (
		diaria: DiariaInterface,
		avaliacao: { descricao: string; nota: number }
	) => void;
}

export const AvaliarDialogo: React.FC<AvaliarDialogoProps> = (propriedades) => {
	const { diaria, aoCancelar, aoConfirmar } = propriedades;
	const movel = useMovelAtivo(),
		{ usuario } = useContext(ContextoUsuario).estadoUsuario,
		usuarioAvaliado =
			usuario.tipo_usuario === TipoDoUsuario.Cliente
				? diaria?.diarista
				: diaria?.cliente,
		[descricao, alterarDescricao] = useState(""),
		[nota, alterarNota] = useState(3),
		[erro, alterarErro] = useState("");

	function tentarAvaliar() {
		if (descricao.length > 3) {
			aoConfirmar(diaria, { descricao, nota });
		} else {
			alterarErro("Escreva um depoimento");
		}
	}

	return (
		<Dialogo
			aberto={true}
			aoFechar={aoCancelar}
			aoConfirmar={tentarAvaliar}
			titulo={"Avaliar uma diária"}
			subtitulo={"Avalie a diária abaixo"}
		>
			<CaixinhaDeTrabalho diaria={diaria} />
			<InformacaoDoUsuario
				nome={usuarioAvaliado?.nome_completo || ""}
				avaliacao={usuarioAvaliado?.reputacao || 1}
				descricao={
					"Telefone: " +
					ServicoFormatadorDeTexto.formatarTelefone(
						usuarioAvaliado?.telefone || ""
					)
				}
				foto={usuarioAvaliado?.foto_usuario || ""}
			/>
			<Divider sx={{ my: 4 }} />
			<Typography>Deixe a sua avaliação</Typography>
			<CaixinhaDeAvaliacao>
				<strong>Nota</strong>
				<Rating
					value={nota}
					onChange={(_evento, valor) => alterarNota(valor || 1)}
					size={movel ? "large" : "small"}
				/>
				<strong>Depoimento</strong>
				<CampoDeTexto
					label={"Digite aqui seu depoimento"}
					fullWidth
					multiline
					rows={3}
					value={descricao}
					onChange={(evento) => alterarDescricao(evento.target.value)}
				/>
			</CaixinhaDeAvaliacao>
			<Snackbar
				open={erro.length > 0}
				autoHideDuration={4000}
				message={erro}
				onClose={() => alterarErro("")}
			/>
		</Dialogo>
	);
};

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

interface CancelarDialogoProps extends Omit<DialogoProps, "aoConfirmar"> {
	aoConfirmar: (diaria: DiariaInterface, motivo: string) => void;
}

export const CancelarDialogo: React.FC<CancelarDialogoProps> = (
	propriedades
) => {
	const { diaria, aoCancelar, aoConfirmar } = propriedades;
	const { usuario } = useContext(ContextoUsuario).estadoUsuario,
		[motivo, alterarMotivo] = useState(""),
		[erro, alterarErro] = useState("");

	function tentarCancelar() {
		if (motivo.length > 3) {
			aoConfirmar(diaria, motivo);
		} else {
			alterarErro("Digite o motivo do cancelamento");
		}
	}

	function pegarAviso(): string {
		if (usuario.id) {
			if (usuario.tipo_usuario === TipoDoUsuario.Diarista) {
				return (
					"Ao cancelar uma diária, você pode ser penalizado(a) com a " +
					"diminuição da sua reputação. Quanto menor a sua reputação, menos " +
					"chance de ser selecionado(a) para as próximas oportunidades. " +
					"O cancelamento de diárias deve ser feito somente em situações de " +
					"exceção."
				);
			} else {
				const dataAtendimento = new Date(diaria.data_atendimento);
				if (ServicoData.pegarDiferencaDeHoras(dataAtendimento) < 24) {
					return (
						"Ao cancelar a diária, devido à proximidade com o horário de " +
						"agendamento do serviço, o sistema cobrará uma multa de 50% " +
						"sobre o valor da diária. O cancelamento de diárias deve ser " +
						"feito somente em situações de exceção."
					);
				}
				return (
					"Ao cancelar uma diária o(a) profissional que já havia agendado " +
					"um dia na sua agenda acaba sendo prejudicado(a). O cancelamento de " +
					"diárias deve ser feito somente em situações de exceção."
				);
			}
		}
		return "";
	}

	return (
		<Dialogo
			aberto={true}
			aoFechar={aoCancelar}
			aoConfirmar={tentarCancelar}
			titulo={"Cancelar diária?"}
			subtitulo={"Tem certeza que deseja cancelar a diária abaixo?"}
		>
			<CaixinhaDeTrabalho diaria={diaria} />

			<CampoDeTexto
				label={"Digite o motivo do cancelamento"}
				fullWidth
				multiline
				rows={5}
				value={motivo}
				onChange={(evento) => alterarMotivo(evento.target.value)}
			/>

			<Typography
				sx={{ py: 2 }}
				variant={"subtitle2"}
				color={"textSecondary"}
			>
				{pegarAviso()}
			</Typography>

			<Snackbar
				open={erro.length > 0}
				autoHideDuration={4000}
				message={erro}
				onClose={() => alterarErro("")}
			/>
		</Dialogo>
	);
};

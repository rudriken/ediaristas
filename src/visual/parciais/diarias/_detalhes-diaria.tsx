import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { DiariaStatus } from "logica/@tipos/DiariaInterface";
import useDetalhesDiaria from "logica/ganchos/pages/diarias/useDetalhesDiaria.page";
import { ServicoData } from "logica/servicos/ServicoData";
import { ServicoDiaria } from "logica/servicos/ServicoDiaria";
import { ServicoFormatadorDeTexto } from "logica/servicos/ServicoFormatadorDeTexto";
import React from "react";
import InformacaoDoUsuario from "visual/componentes/exibe-dados/InformacaoDoUsuario/InformacaoDoUsuario";
import Status from "visual/componentes/exibe-dados/Status/Status";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import {
	CartoesContainer,
	TituloDoServico,
	DetalhesDoServico,
	TituloDoUsuario,
	CartaoDoUsuario,
} from "./_detalhes-diaria.styled";

const DetalhesDiaria: React.FC<{ id: string }> = ({ id }) => {
	const { diaria, diarista, cliente } = useDetalhesDiaria(id);
	console.log(diarista);
	if (!diaria.id) {
		return (
			<Container sx={{ textAlign: "center", my: 10 }}>
				<CircularProgress />
			</Container>
		);
	}

	return (
		<Container>
			<TituloPagina titulo={`Detalhes da diária: #${id}`} />
			<CartoesContainer>
				<DetalhesDoServico>
					<TituloDoServico>Detalhes da diária</TituloDoServico>
					<Box sx={{ mb: 2 }}>
						Status:{" "}
						<Status
							cor={
								ServicoDiaria.pegarStatus(
									diaria.status as DiariaStatus
								).cor
							}
						>
							{
								ServicoDiaria.pegarStatus(
									diaria.status as DiariaStatus
								).rotulo
							}
						</Status>
					</Box>
					<div>
						Data:{" "}
						<strong>
							{ServicoFormatadorDeTexto.reverterFormatoDeData(
								diaria.data_atendimento as string
							)}
						</strong>
						<br />
						Horário:{" "}
						<strong>
							{ServicoData.pegarTempoDeData(
								diaria.data_atendimento as string
							)}
						</strong>
						<br />
						Endereço:{" "}
						<strong>
							{ServicoFormatadorDeTexto.pegarEndereco(diaria)}
						</strong>
					</div>
				</DetalhesDoServico>
				<CartaoDoUsuario>
					<TituloDoUsuario>Diarista</TituloDoUsuario>
					{diarista.id ? (
						<>
							<InformacaoDoUsuario
								foto={diarista?.foto_usuario || ""}
								nome={diarista?.nome_completo || ""}
								avaliacao={diarista?.reputacao || 1}
								sx={{ bgcolor: "inherit", px: 0 }}
							/>
							<Typography>
								Telefone:{" "}
								{ServicoFormatadorDeTexto.formatarTelefone(
									diarista?.telefone || ""
								)}
							</Typography>
						</>
					) : (
						<Typography>
							Diarista ainda não selecionado(a)
						</Typography>
					)}
				</CartaoDoUsuario>
				<CartaoDoUsuario>
					<TituloDoUsuario>Cliente</TituloDoUsuario>
					<InformacaoDoUsuario
						foto={cliente?.foto_usuario || ""}
						nome={cliente?.nome_completo || ""}
						avaliacao={cliente?.reputacao || 1}
						sx={{ bgcolor: "inherit", px: 0 }}
					/>
					<Typography>
						Telefone:{" "}
						{ServicoFormatadorDeTexto.formatarTelefone(
							cliente?.telefone || ""
						)}
					</Typography>
				</CartaoDoUsuario>
			</CartoesContainer>
		</Container>
	);
};

export default DetalhesDiaria;

import React from "react";
import { Paper } from "@mui/material";
import useMóvelAtivo from "lógica/ganchos/useMóvelAtivo";
import useContratacao from "lógica/ganchos/pages/useContratacao.page";
import MigalhaDePao from "visual/componentes/navegacao/MigalhaDePao/MigalhaDePao";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import AmbienteSeguro from "visual/componentes/retorno/AmbienteSeguro/AmbienteSeguro";
import InformacaoLateral from "visual/componentes/exibe-dados/InformacaoLateral/InformacaoLateral";
import { FormularioUsuarioContainer } from "visual/componentes/entradas/FormularioUsuario/FormularioUsuario";
import { ContainerPaginaFormulario } from "visual/componentes/entradas/FormularioUsuario/FormularioUsuario.style";

const Contratacao: React.FC = () => {
	const móvel = useMóvelAtivo(),
		{ passo, migalhaDePãoItens } = useContratacao();
	return (
		<div>
			{!móvel && <AmbienteSeguro />}
			<MigalhaDePao
				itens={migalhaDePãoItens}
				selecionado={migalhaDePãoItens[passo - 1]}
			/>
			{passo === 1 && (
				<TituloPagina título={"Nos conte um pouco sobre o serviço!"} />
			)}
			<FormularioUsuarioContainer>
				<ContainerPaginaFormulario larguraTotal={passo === 4}>
					<Paper sx={{ p: 4 }}>asdfasfdasdf</Paper>
					<InformacaoLateral
						título={"Detalhes"}
						itens={[
							{
								títuloI: "Tipo",
								descriçãoI: [""],
								íconeI: "twf-check-circle",
							},
							{
								títuloI: "Tamanho",
								descriçãoI: [""],
								íconeI: "twf-check-circle",
							},
							{
								títuloI: "Data",
								descriçãoI: [""],
								íconeI: "twf-check-circle",
							},
						]}
						rodapé={{
							textoR: "R$ 80,00",
							íconeR: "twf-credit-card",
						}}
					/>
				</ContainerPaginaFormulario>
			</FormularioUsuarioContainer>
		</div>
	);
};
export default Contratacao;

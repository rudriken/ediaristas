import { Autocomplete, CircularProgress, Typography } from "@mui/material";
import { CidadeInterface } from "logica/@tipos/EnderecoInterface";
import useFormularioCidades from "logica/ganchos/componentes/entradas/FormularioUsuario/Formularios/useFormularioCidades";
import React from "react";
import CampoDeLasca from "visual/componentes/exibe-dados/CampoDeLasca/CampoDeLasca";
import CampoDeTexto from "../../CampoDeTexto/CampoDeTexto";
import { CidadesSelecao } from "../FormularioUsuario.style";

export const FormularioCidades: React.FC<{ estado: string }> = ({ estado }) => {
	const {
		listaDeCidades,
		cidadesASeremSelecionadas,
		cidadesSelecionadas,
		aoSelecionarCidade,
		aoDesselecionarCidade,
	} = useFormularioCidades(estado);
	return (
		<CidadesSelecao>
			<Autocomplete
				value={{ cidade: "" } as CidadeInterface}
				onChange={(_evento, novoValor) => {
					novoValor && aoSelecionarCidade(novoValor.cidade);
				}}
				disablePortal
				options={cidadesASeremSelecionadas}
				getOptionLabel={(caracteres) => {
					return caracteres.cidade;
				}}
				loading={listaDeCidades.length === 0}
				loadingText={"Carregando cidades ..."}
				style={{ gridArea: "busca-cidade" }}
				noOptionsText={"Nenhuma cidade com esse nome"}
				renderInput={({ InputProps, ...outras }) => {
					return (
						<CampoDeTexto
							label={"Busque pelo nome da cidade"}
							InputProps={{
								...InputProps,
								endAdornment: (
									<>
										{listaDeCidades.length ? (
											<i className={"twf-search"} />
										) : (
											<CircularProgress
												size={20}
												color={"inherit"}
											/>
										)}
										{InputProps.endAdornment}
									</>
								),
							}}
							required={false}
							{...outras}
						/>
					);
				}}
			/>
			<Typography>Cidades selecionadas</Typography>
			<CampoDeLasca
				listaDeItens={cidadesSelecionadas}
				paraDeletar={aoDesselecionarCidade}
				mensagemQuandoVazio={"Nenhuma cidade selecionada ainda"}
			/>
		</CidadesSelecao>
	);
};

import React from "react";
import { ContainerItens } from "./_detalhes-servico.styled";
import { Controller, useFormContext } from "react-hook-form";
import { ServicoInterface } from "logica/@tipos/ServicoInterface";
import { Typography, Divider, Tooltip, Button, Container } from "@mui/material";
import CampoDeTexto from "visual/componentes/entradas/CampoDeTexto/CampoDeTexto";
import { NovaDiariaFormularioDeDadosInterface } from "logica/@tipos/FormularioInterface";
import ContadorDeItens from "../../componentes/entradas/ContadorDeItens/ContadorDeItens";
import { FormularioEndereco } from "visual/componentes/entradas/FormularioUsuario/FormularioUsuario";
import CampoDeTextoComMascara from "visual/componentes/entradas/CampoDeTextoComMascara/CampoDeTextoComMascara";
import GrupoAlternadorDeBotao, {
	AlternadorDeBotao,
} from "visual/componentes/entradas/GrupoAlternadorDeBotao/GrupoAlternadorDeBotao";

interface DetalhesServicoProps {
	servicos?: ServicoInterface[];
	comodos?: number;
	podemosAtender?: boolean;
}

export const comodosDaCasa = [
	{
		singular: "Quarto",
		plural: "Quartos",
		nome: "quantidade_quartos",
	},
	{
		singular: "Sala",
		plural: "Salas",
		nome: "quantidade_salas",
	},
	{
		singular: "Banheiro",
		plural: "Banheiros",
		nome: "quantidade_banheiros",
	},
	{
		singular: "Cozinha",
		plural: "Cozinhas",
		nome: "quantidade_cozinhas",
	},
	{
		singular: "Quintal",
		plural: "Quintais",
		nome: "quantidade_quintais",
	},
	{
		singular: "Outro",
		plural: "Outros",
		nome: "quantidade_outros",
	},
];

const DetalhesServico: React.FC<DetalhesServicoProps> = ({
	servicos = [],
	comodos = 0,
	podemosAtender,
}) => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<NovaDiariaFormularioDeDadosInterface>();
	return (
		<>
			<Typography sx={{ fontWeight: "bold", pb: 2 }}>
				Qual tipo de limpeza você precisa?
			</Typography>
			<Controller
				name={"faxina.servico"}
				defaultValue={servicos[0].id}
				control={control}
				render={({ field }) => {
					return (
						<GrupoAlternadorDeBotao
							exclusive
							value={field.value}
							onChange={(_evento, novo_value) => {
								return field.onChange(
									novo_value || servicos[0].id
								);
							}}
						>
							{servicos.map((servico) => {
								return (
									<AlternadorDeBotao
										key={servico.id}
										value={servico.id}
									>
										<i
											className={
												servico.icone ||
												"twf-cleaning-1"
											}
										/>{" "}
										{servico.nome}
									</AlternadorDeBotao>
								);
							})}
						</GrupoAlternadorDeBotao>
					);
				}}
			/>
			<Divider sx={{ my: 5 }} />
			<Typography sx={{ fontWeight: "bold", pb: 2 }}>
				Qual o tamanho da sua casa?
			</Typography>
			<ContainerItens>
				{comodosDaCasa.map((item) => {
					return (
						<Controller
							key={item.nome}
							name={`faxina.${item.nome}` as any}
							defaultValue={0}
							control={control}
							render={({ field }) => {
								return (
									<ContadorDeItens
										rotulo={item.singular}
										plural={item.plural}
										contador={field.value}
										incrementar={() =>
											field.onChange(field.value + 1)
										}
										decrementar={() =>
											field.onChange(
												Math.max(0, field.value - 1)
											)
										}
									/>
								);
							}}
						/>
					);
				})}
			</ContainerItens>
			<Divider sx={{ my: 5 }} />
			<Typography sx={{ fontWeight: "bold", pb: 2 }}>
				Qual a data que você gostaria de receber o(a) diarista?
			</Typography>
			<ContainerItens>
				<Controller
					name={"faxina.data_atendimento"}
					defaultValue={""}
					control={control}
					render={({
						field: { ref, ...name_onBlur_onChange_value },
					}) => {
						return (
							<CampoDeTextoComMascara
								{...name_onBlur_onChange_value}
								inputRef={ref}
								mascara={"99/99/9999"}
								label={"Data"}
								error={
									errors?.faxina?.data_atendimento !==
									undefined
								}
								helperText={
									errors?.faxina?.data_atendimento?.message
								}
							/>
						);
					}}
				/>
				<Controller
					name={"faxina.hora_inicio"}
					defaultValue={""}
					control={control}
					render={({
						field: { ref, ...name_onBlur_onChange_value },
					}) => {
						return (
							<CampoDeTextoComMascara
								{...name_onBlur_onChange_value}
								inputRef={ref}
								mascara={"99:99"}
								label={"Hora Início"}
								error={
									errors?.faxina?.hora_inicio !== undefined
								}
								helperText={
									errors?.faxina?.hora_inicio?.message
								}
							/>
						);
					}}
				/>
				<Controller
					name={"faxina.hora_termino"}
					defaultValue={""}
					control={control}
					render={({
						field: { ref, ...name_onBlur_onChange_value },
					}) => {
						return (
							<Tooltip title={"Campo automático"}>
								<div>
									<CampoDeTextoComMascara
										{...name_onBlur_onChange_value}
										inputRef={ref}
										mascara={"99:99"}
										inputProps={{
											readOnly: true,
											disabled: true,
										}}
										label={"Hora Término"}
										error={
											errors?.faxina?.hora_termino !==
											undefined
										}
										helperText={
											errors?.faxina?.hora_termino
												?.message
										}
										fullWidth
									/>
								</div>
							</Tooltip>
						);
					}}
				/>
			</ContainerItens>
			<Divider sx={{ my: 5 }} />
			<Typography sx={{ fontWeight: "bold", pb: 2 }}>
				Observações
			</Typography>
			<CampoDeTexto
				label={"Quer acrescentar algum detalhe?"}
				{...register("faxina.observacoes")}
				required={false}
				fullWidth
				multiline
			/>
			<Divider sx={{ my: 5 }} />
			<Typography sx={{ fontWeight: "bold", pb: 2 }}>
				Qual endereço onde será realizada a limpeza?
			</Typography>
			<FormularioEndereco />
			{!podemosAtender && (
				<Typography color={"error"} sx={{ pb: 2 }} align={"center"}>
					Infelizmente ainda não atendemos na sua região
				</Typography>
			)}
			<Container sx={{ textAlign: "right" }}>
				<Button
					variant={"contained"}
					color={"secondary"}
					disabled={comodos === 0 || !podemosAtender}
					type={"submit"}
				>
					Ir para identificação
				</Button>
			</Container>
		</>
	);
};

export default DetalhesServico;

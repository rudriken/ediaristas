import { useEffect } from "react";
import { Typography } from "@mui/material";
import CampoDeTexto from "../../CampoDeTexto/CampoDeTexto";
import { DadosPagamento } from "../FormularioUsuario.style";
import { Controller, useFormContext } from "react-hook-form";
import CampoDeTextoComMascara from "../../CampoDeTextoComMascara/CampoDeTextoComMascara";
import {
	CartaoDadosInterface,
	PagamentoFormularioDeDadosInterface,
} from "logica/@tipos/FormularioInterface";

export const FormularioPagamento = () => {
	const {
		register,
		formState: { errors },
		control,
	} = useFormContext<
		PagamentoFormularioDeDadosInterface<CartaoDadosInterface> & {
			pagamento_recusado: object;
		}
	>();

	useEffect(() => {
		register("pagamento_recusado");
	}, []);

	return (
		<DadosPagamento>
			<Controller
				name={"pagamento.numero_cartao"}
				defaultValue={""}
				control={control}
				render={({ field: { ref, ...name_onBlur_onChange_value } }) => (
					<CampoDeTextoComMascara
						{...name_onBlur_onChange_value}
						mascara={"9999 9999 9999 9999"}
						label={"Número do cartão"}
						style={{ gridArea: "numero" }}
						error={errors?.pagamento?.numero_cartao !== undefined}
						helperText={errors?.pagamento?.numero_cartao?.message}
					/>
				)}
			/>
			<CampoDeTexto
				defaultValue={""}
				label={"Nome impresso no cartão"}
				style={{ gridArea: "nome" }}
				{...register("pagamento.nome_cartao")}
				error={errors?.pagamento?.nome_cartao !== undefined}
				helperText={errors?.pagamento?.nome_cartao?.message}
			/>
			<Controller
				name={"pagamento.validade"}
				defaultValue={""}
				control={control}
				render={({ field: { ref, ...name_onBlur_onChange_value } }) => (
					<CampoDeTextoComMascara
						{...name_onBlur_onChange_value}
						mascara={"99/99"}
						label={"Validade"}
						style={{ gridArea: "validade" }}
						error={errors?.pagamento?.validade !== undefined}
						helperText={errors?.pagamento?.validade?.message}
					/>
				)}
			/>
			<Controller
				name={"pagamento.codigo"}
				defaultValue={""}
				control={control}
				render={({ field: { ref, ...name_onBlur_onChange_value } }) => (
					<CampoDeTextoComMascara
						{...name_onBlur_onChange_value}
						mascara={"9999"}
						label={"CVV"}
						style={{ gridArea: "codigo" }}
						error={errors?.pagamento?.codigo !== undefined}
						helperText={errors?.pagamento?.codigo?.message}
					/>
				)}
			/>
			{errors?.pagamento_recusado !== undefined && (
				<Typography
					color={"error"}
					sx={{ gridArea: "erro", textAlign: "center" }}
				>
					{errors?.pagamento_recusado?.message}
				</Typography>
			)}
		</DadosPagamento>
	);
};

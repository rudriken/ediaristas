import { useEffect } from "react";
import { Typography } from "@mui/material";
import CampoDeTexto from "../../CampoDeTexto/CampoDeTexto";
import { DadosPagamento } from "../FormularioUsuario.style";
import { Controller, useFormContext } from "react-hook-form";
import CampoDeTextoComMascara from "../../CampoDeTextoComMascara/CampoDeTextoComMascara";

export const FormularioPagamento = () => {
	const {
		register,
		formState: { errors },
		control,
	} = useFormContext<{
		pagamento: {
			número_cartão: string;
			nome_titular_cartão: string;
			validade: string;
			código_cvv: string;
		};
		pagamento_recusado: object;
	}>();

	useEffect(() => {
		register("pagamento_recusado");
	}, []);

	return (
		<DadosPagamento>
			<Controller
				name={"pagamento.número_cartão"}
				defaultValue={""}
				control={control}
				render={({ field: { ref, ...name_onBlur_onChange_value } }) => (
					<CampoDeTextoComMascara
						{...name_onBlur_onChange_value}
						máscara={"9999 9999 9999 9999"}
						label={"Número do cartão"}
						style={{ gridArea: "número" }}
						error={errors?.pagamento?.número_cartão !== undefined}
						helperText={errors?.pagamento?.número_cartão?.message}
					/>
				)}
			/>
			<CampoDeTexto
				defaultValue={""}
				label={"Nome impresso no cartão"}
				style={{ gridArea: "nome" }}
				{...register("pagamento.nome_titular_cartão")}
				error={errors?.pagamento?.nome_titular_cartão !== undefined}
				helperText={errors?.pagamento?.nome_titular_cartão?.message}
			/>
			<Controller
				name={"pagamento.validade"}
				defaultValue={""}
				control={control}
				render={({ field: { ref, ...name_onBlur_onChange_value } }) => (
					<CampoDeTextoComMascara
						{...name_onBlur_onChange_value}
						máscara={"99/99"}
						label={"Validade"}
						style={{ gridArea: "validade" }}
						error={errors?.pagamento?.validade !== undefined}
						helperText={errors?.pagamento?.validade?.message}
					/>
				)}
			/>
			<Controller
				name={"pagamento.código_cvv"}
				defaultValue={""}
				control={control}
				render={({ field: { ref, ...name_onBlur_onChange_value } }) => (
					<CampoDeTextoComMascara
						{...name_onBlur_onChange_value}
						máscara={"9999"}
						label={"CVV"}
						style={{ gridArea: "código" }}
						error={errors?.pagamento?.código_cvv !== undefined}
						helperText={errors?.pagamento?.código_cvv?.message}
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

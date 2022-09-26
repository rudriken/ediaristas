import React, { useContext } from "react";
import { DadosUsuario } from "../FormularioUsuario.style";
import CampoDeTexto from "../../CampoDeTexto/CampoDeTexto";
import { useFormContext, Controller } from "react-hook-form";
import CampoDeTextoComMascara from "../../CampoDeTextoComMascara/CampoDeTextoComMascara";
import { ContextoUsuario } from "logica/contextos/ContextoUsuario";
import { ServicoFormatadorDeTexto } from "logica/servicos/ServicoFormatadorDeTexto";

export interface FormularioDadosUsuarioProps {
	cadastro?: boolean;
}

export const FormularioDadosUsuario: React.FC<FormularioDadosUsuarioProps> = ({
	cadastro = false,
}) => {
	const {
			register,
			formState: { errors },
			control,
		} = useFormContext<{
			usuario: {
				nome_completo: string;
				nascimento: string;
				cpf: string;
				telefone: string;
			};
		}>(),
		{ usuario } = useContext(ContextoUsuario).estadoUsuario;
	return (
		<DadosUsuario>
			<CampoDeTexto
				label={"Nome completo"}
				defaultValue={usuario.nome_completo}
				style={{ gridArea: "nome" }}
				{...register("usuario.nome_completo")}
				error={errors?.usuario?.nome_completo !== undefined}
				helperText={errors?.usuario?.nome_completo?.message}
			/>
			<Controller
				name={"usuario.nascimento"}
				defaultValue={ServicoFormatadorDeTexto.reverterFormatoDeData(
					usuario.nascimento as string
				)}
				control={control}
				render={({ field: { ref, ...name_onBlur_onChange_value } }) => (
					<CampoDeTextoComMascara
						{...name_onBlur_onChange_value}
						mascara={"99/99/9999"}
						label={"Data de nascimento"}
						style={{ gridArea: "data-nascimento" }}
						error={errors.usuario?.nascimento !== undefined}
						helperText={errors.usuario?.nascimento?.message}
					/>
				)}
			/>
			<Controller
				name={"usuario.cpf"}
				defaultValue={usuario.cpf}
				control={control}
				render={({ field: { ref, ...name_onBlur_onChange_value } }) => (
					<CampoDeTextoComMascara
						{...name_onBlur_onChange_value}
						mascara={"999.999.999-99"}
						label={"CPF"}
						style={{ gridArea: "cpf" }}
						error={errors.usuario?.cpf !== undefined}
						helperText={errors.usuario?.cpf?.message}
						InputProps={{ readOnly: !cadastro }}
					/>
				)}
			/>
			<Controller
				name={"usuario.telefone"}
				defaultValue={usuario.telefone}
				control={control}
				render={({ field: { ref, ...name_onBlur_onChange_value } }) => (
					<CampoDeTextoComMascara
						{...name_onBlur_onChange_value}
						mascara={"(99) 99999-9999"}
						label={"Telefone"}
						style={{ gridArea: "telefone" }}
						error={errors.usuario?.telefone !== undefined}
						helperText={errors.usuario?.telefone?.message}
					/>
				)}
			/>
		</DadosUsuario>
	);
};

import React, { useContext } from "react";
import { DadosUsuario } from "../FormularioUsuario.style";
import CampoDeTexto from "../../CampoDeTexto/CampoDeTexto";
import { useFormContext, Controller } from "react-hook-form";
import CampoDeTextoComMascara from "../../CampoDeTextoComMascara/CampoDeTextoComMascara";
import { ContextoUsuario } from "lógica/contextos/ContextoUsuario";
import { ServicoFormatadorDeTexto } from "lógica/serviços/ServicoFormatadorDeTexto";

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
			usuário: {
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
				{...register("usuário.nome_completo")}
				error={errors?.usuário?.nome_completo !== undefined}
				helperText={errors?.usuário?.nome_completo?.message}
			/>
			<Controller
				name={"usuário.nascimento"}
				defaultValue={ServicoFormatadorDeTexto.reverterFormatoDeData(
					usuario.nascimento as string
				)}
				control={control}
				render={({ field: { ref, ...name_onBlur_onChange_value } }) => (
					<CampoDeTextoComMascara
						{...name_onBlur_onChange_value}
						máscara={"99/99/9999"}
						label={"Data de nascimento"}
						style={{ gridArea: "data-nascimento" }}
						error={errors.usuário?.nascimento !== undefined}
						helperText={errors.usuário?.nascimento?.message}
					/>
				)}
			/>
			<Controller
				name={"usuário.cpf"}
				defaultValue={usuario.cpf}
				control={control}
				render={({ field: { ref, ...name_onBlur_onChange_value } }) => (
					<CampoDeTextoComMascara
						{...name_onBlur_onChange_value}
						máscara={"999.999.999-99"}
						label={"CPF"}
						style={{ gridArea: "cpf" }}
						error={errors.usuário?.cpf !== undefined}
						helperText={errors.usuário?.cpf?.message}
						InputProps={{ readOnly: !cadastro }}
					/>
				)}
			/>
			<Controller
				name={"usuário.telefone"}
				defaultValue={usuario.telefone}
				control={control}
				render={({ field: { ref, ...name_onBlur_onChange_value } }) => (
					<CampoDeTextoComMascara
						{...name_onBlur_onChange_value}
						máscara={"(99) 99999-9999"}
						label={"Telefone"}
						style={{ gridArea: "telefone" }}
						error={errors.usuário?.telefone !== undefined}
						helperText={errors.usuário?.telefone?.message}
					/>
				)}
			/>
		</DadosUsuario>
	);
};

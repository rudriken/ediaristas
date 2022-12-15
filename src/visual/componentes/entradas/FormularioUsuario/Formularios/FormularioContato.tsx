import { useFormContext } from "react-hook-form";
import { DadosContato } from "../FormularioUsuario.style";
import CampoDeTexto from "../../CampoDeTexto/CampoDeTexto";
import ForcaDaSenha from "visual/componentes/retorno/ForcaDaSenha/ForcaDaSenha";
import { useContext } from "react";
import { ContextoUsuario } from "logica/contextos/ContextoUsuario";

export const FormularioContato = () => {
	const {
		register,
		formState: { errors },
		watch,
	} = useFormContext<{
		usuario: {
			email: string;
			password: string;
			new_password: string;
			password_confirmation: string;
		};
	}>();
	const novaSenha = watch("usuario.new_password"),
		{ usuario } = useContext(ContextoUsuario).estadoUsuario;
	return (
		<DadosContato>
			<CampoDeTexto
				label={"E-mail"}
				style={{ gridArea: "email" }}
				defaultValue={usuario.email}
				{...register("usuario.email")}
				error={errors?.usuario?.email !== undefined}
				helperText={errors?.usuario?.email?.message}
			/>
			<CampoDeTexto
				label={"Senha Antiga"}
				style={{ gridArea: "senha-antiga" }}
				type={"password"}
				{...register("usuario.password")}
				error={errors?.usuario?.password !== undefined}
				helperText={errors?.usuario?.password?.message}
				required={false}
			/>
			<CampoDeTexto
				label={"Nova Senha"}
				style={{ gridArea: "nova-senha" }}
				type={"password"}
				{...register("usuario.new_password")}
				error={errors?.usuario?.new_password !== undefined}
				helperText={errors?.usuario?.new_password?.message}
				required={false}
			/>
			<CampoDeTexto
				label={"Nova Senha Confirmação"}
				style={{ gridArea: "confirmar-senha" }}
				type={"password"}
				{...register("usuario.password_confirmation")}
				error={errors?.usuario?.password_confirmation !== undefined}
				helperText={errors?.usuario?.password_confirmation?.message}
				required={false}
			/>
			<ForcaDaSenha senha={novaSenha || ""} />
		</DadosContato>
	);
};

import { useFormContext } from "react-hook-form";
import ForcaDaSenha from "visual/componentes/retorno/ForcaDaSenha/ForcaDaSenha";
import CampoDeTexto from "../../CampoDeTexto/CampoDeTexto";
import { DadosNovoContato } from "../FormularioUsuario.style";

export const FormularioNovoContato = () => {
	const {
		register,
		formState: { errors },
		watch
	} = useFormContext();
	const novaSenha = watch("usuário.password");
	return (
		<DadosNovoContato>
			<CampoDeTexto
				label={"E-mail"}
				style={{ gridArea: "email" }}
				{...register("usuário.email")}
				error={errors?.usuário?.email !== undefined}
				helperText={errors?.usuário?.email?.message}
			/>
			<CampoDeTexto
				type="password"
				label={"Senha"}
				style={{ gridArea: "senha" }}
				{...register("usuário.password")}
				error={errors?.usuário?.password !== undefined}
				helperText={errors?.usuário?.password?.message}
			/>
			<CampoDeTexto
				type="password"
				label={"Confirmação da Senha"}
				style={{ gridArea: "confirmar-senha" }}
				{...register("usuário.password_confirmation")}
				error={errors?.usuário?.password_confirmation !== undefined}
				helperText={errors?.usuário?.password_confirmation?.message}
			/>
			<ForcaDaSenha senha={novaSenha || ""} />
		</DadosNovoContato>
	);
};

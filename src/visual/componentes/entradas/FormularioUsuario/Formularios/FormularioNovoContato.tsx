import { useFormContext } from "react-hook-form";
import { DadosNovoContato } from "../FormularioUsuario.style";
import CampoDeTexto from "../../CampoDeTexto/CampoDeTexto";
import ForcaDaSenha from "visual/componentes/retorno/ForcaDaSenha/ForcaDaSenha";

export const FormularioNovoContato = () => {
	const {
		register,
		formState: { errors },
		watch,
	} = useFormContext<{
		usuário: {
			email: string;
			password: string;
			password_confirmation: string;
		};
	}>();
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
				label={"Senha"}
				style={{ gridArea: "senha" }}
				type={"password"}
				{...register("usuário.password")}
				error={errors?.usuário?.password !== undefined}
				helperText={errors?.usuário?.password?.message}
			/>
			<CampoDeTexto
				label={"Confirmação da Senha"}
				style={{ gridArea: "confirmar-senha" }}
				type={"password"}
				{...register("usuário.password_confirmation")}
				error={errors?.usuário?.password_confirmation !== undefined}
				helperText={errors?.usuário?.password_confirmation?.message}
			/>
			<ForcaDaSenha senha={novaSenha || ""} />
		</DadosNovoContato>
	);
};

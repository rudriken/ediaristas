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
		usuario: {
			email: string;
			password: string;
			password_confirmation: string;
		};
	}>();
	const novaSenha = watch("usuario.password");
	return (
		<DadosNovoContato>
			<CampoDeTexto
				label={"E-mail"}
				style={{ gridArea: "email" }}
				{...register("usuario.email")}
				error={errors?.usuario?.email !== undefined}
				helperText={errors?.usuario?.email?.message}
			/>
			<CampoDeTexto
				label={"Senha"}
				style={{ gridArea: "senha" }}
				type={"password"}
				{...register("usuario.password")}
				error={errors?.usuario?.password !== undefined}
				helperText={errors?.usuario?.password?.message}
			/>
			<CampoDeTexto
				label={"Confirmação da Senha"}
				style={{ gridArea: "confirmar-senha" }}
				type={"password"}
				{...register("usuario.password_confirmation")}
				error={errors?.usuario?.password_confirmation !== undefined}
				helperText={errors?.usuario?.password_confirmation?.message}
			/>
			<ForcaDaSenha senha={novaSenha || ""} />
		</DadosNovoContato>
	);
};

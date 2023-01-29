import { useFormContext } from "react-hook-form";
import CampoDeTexto from "../../CampoDeTexto/CampoDeTexto";
import { LoginDados } from "../FormularioUsuario.style";
import Elo from "../../../navegacao/Link/Link";
import {
	CredenciaisInterface,
	LoginFormularioDeDadosInterface,
} from "logica/@tipos/FormularioInterface";

export const FormularioLogin = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<LoginFormularioDeDadosInterface<CredenciaisInterface>>();
	return (
		<LoginDados>
			<CampoDeTexto
				label={"E-mail"}
				type={"email"}
				{...register("login.email")}
				error={errors?.login?.email !== undefined}
				helperText={errors?.login?.email?.message}
			/>
			<CampoDeTexto
				label={"Senha"}
				type={"password"}
				{...register("login.password")}
				error={errors?.login?.password !== undefined}
				helperText={errors?.login?.password?.message}
			/>
			<Elo href={"/recuperar-senha"}>Esqueci minha senha</Elo>
		</LoginDados>
	);
};

import { ContextoUsuario } from "logica/contextos/ContextoUsuario";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import CampoDeTexto from "../../CampoDeTexto/CampoDeTexto";
import { DadoFinanceiro } from "../FormularioUsuario.style";

export const FormularioFinanceiro = () => {
	const { register } = useFormContext(),
		{ usuario } = useContext(ContextoUsuario).estadoUsuario;
	return (
		<DadoFinanceiro>
			<CampoDeTexto
				label={"Chave Pix"}
				defaultValue={usuario.chave_pix}
				{...register("usuario.chave_pix", { minLength: 5 })}
			/>
		</DadoFinanceiro>
	);
};

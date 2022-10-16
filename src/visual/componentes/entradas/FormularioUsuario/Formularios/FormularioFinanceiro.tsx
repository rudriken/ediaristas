import { useFormContext } from "react-hook-form";
import CampoDeTexto from "../../CampoDeTexto/CampoDeTexto";
import { DadoFinanceiro } from "../FormularioUsuario.style";

export const FormularioFinanceiro = () => {
	const { register } = useFormContext();
	return (
		<DadoFinanceiro>
			<CampoDeTexto
				label={"Chave Pix"}
				defaultValue={""}
				{...register("usuario.chave_pix", { minLength: 5 })}
			/>
		</DadoFinanceiro>
	);
};

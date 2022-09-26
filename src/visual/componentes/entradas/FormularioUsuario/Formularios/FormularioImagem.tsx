import { useFormContext, Controller } from "react-hook-form";
import { ImagemSelecionada } from "../FormularioUsuario.style";
import CampoDeArquivo from "../../CampoDeArquivo/CampoDeArquivo";

export const FormularioImagem = () => {
	const { control } = useFormContext<{
		usuario: { foto_documento: string };
	}>();
	return (
		<ImagemSelecionada>
			<Controller
				name={"usuario.foto_documento"}
				defaultValue={""}
				control={control}
				render={({ field }) => (
					<CampoDeArquivo
						onChange={(arquivos) => field.onChange(arquivos[0])}
						inputProps={{ accept: ".jpeg, .jpg, .png" }}
					/>
				)}
			/>
		</ImagemSelecionada>
	);
};

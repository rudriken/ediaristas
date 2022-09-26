import { useFormContext, Controller } from "react-hook-form";
import CampoDeTexto from "../../CampoDeTexto/CampoDeTexto";
import { ImagemSelecionada } from "../FormularioUsuario.style";

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
					<CampoDeTexto
						onChange={(arquivo) => field.onChange(arquivo)}
						// onChange={(arquivos) => field.onChange(arquivos[0])}
						inputProps={{ accept: ".jpeg, .jpg, .png" }}
					/>
				)}
			/>
		</ImagemSelecionada>
	);
};

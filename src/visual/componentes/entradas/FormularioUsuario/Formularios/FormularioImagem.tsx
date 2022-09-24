import { useFormContext, Controller } from "react-hook-form";
import CampoDeArquivo from "../../CampoDeArquivo/CampoDeArquivo";
import { ImagemSelecionada } from "../FormularioUsuario.style";

export const FormularioImagem = () => {
	const { control } = useFormContext<{
		usuário: { foto_documento: string };
	}>();
	return (
		<ImagemSelecionada>
			<Controller
				name={"usuário.foto_documento"}
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

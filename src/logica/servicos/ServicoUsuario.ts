import { ApiLinksInterface } from "logica/@tipos/ApiLinksInterface";
import {
	InterfaceDoUsuario,
	TipoDoUsuario,
} from "logica/@tipos/InterfaceDoUsuario";
import { ServicoFormatadorDeTexto } from "./ServicoFormatadorDeTexto";
import { ServicoObjeto } from "./ServicoObjeto";
import { ServicoAPI } from "./ServicoAPI";
import { UseFormReturn, FieldPath, FieldValues } from "react-hook-form";

export const ServicoUsuario = {
	async cadastrar(
		usuario: InterfaceDoUsuario,
		tipoDoUsuario: TipoDoUsuario,
		link: ApiLinksInterface
	): Promise<InterfaceDoUsuario | undefined> {
		ServicoAPI.defaults.headers.common.Authorization = "";
		const nascimento = ServicoFormatadorDeTexto.dataParaString(
			usuario.nascimento as Date
		);
		const cpf = ServicoFormatadorDeTexto.pegarNumerosParaTexto(usuario.cpf),
			telefone = ServicoFormatadorDeTexto.pegarNumerosParaTexto(
				usuario.telefone
			);
		const dadosDoUsuario = ServicoObjeto.jsonParaFormData({
			...usuario,
			tipo_usuario: tipoDoUsuario,
			nascimento,
			cpf,
			telefone,
		});
		const resposta = await ServicoAPI.request<InterfaceDoUsuario>({
			url: link.uri,
			method: link.type,
			data: dadosDoUsuario,
			headers: { "Content-Type": "multipart/form-data" },
		});
		return resposta.data;
	},
	tratarErroNovosUsuarios<T extends FieldValues>(
		erro: any,
		form: UseFormReturn<T>
	): void {
		const listaDeErros = erro?.resposta?.data;
		if (listaDeErros) {
			if (listaDeErros.cpf) {
				form.setError("usuario.cpf" as FieldPath<T>, {
					type: "cadastrado",
					message: "CPF já cadastrado",
				});
			}
			if (listaDeErros.email) {
				form.setError("usuario.email" as FieldPath<T>, {
					type: "cadastrado",
					message: "Email já cadastrado",
				});
			}
		}
	},
};

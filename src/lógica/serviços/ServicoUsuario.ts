import { ApiLinksInterface } from "lógica/@tipos/ApiLinksInterface";
import {
	InterfaceDoUsuário,
	TipoDoUsuário,
} from "lógica/@tipos/InterfaceDoUsuário";
import { ServicoFormatadorDeTexto } from "./ServicoFormatadorDeTexto";
import { ServicoObjeto } from "./ServicoObjeto";
import { ServiçoAPI } from "./ServiçoAPI";
import { UseFormReturn, FieldPath, FieldValues } from "react-hook-form";

export const ServicoUsuario = {
	async cadastrar(
		usuario: InterfaceDoUsuário,
		tipoDoUsuario: TipoDoUsuário,
		link: ApiLinksInterface
	): Promise<InterfaceDoUsuário | undefined> {
		ServiçoAPI.defaults.headers.common.Authorization = "";
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

		console.log("usuario: ", usuario);
		console.log("tipoDoUsuario: ", tipoDoUsuario);
		console.log("dadosDoUsuario: ", dadosDoUsuario.get("nascimento"));
		console.log("link: ", link);

		const resposta = await ServiçoAPI.request<InterfaceDoUsuário>({
			url: link.uri,
			method: link.type,
			data: dadosDoUsuario,
			headers: { "Content-Type": "multipart/form-data" },
		});
		
		console.log("resposta.status", resposta.status);

		if (resposta) {
			console.log("resposta.status", resposta.status);
		} else {
			console.log("sem resposta");
		}

		return resposta.data;
	},
	tratarErroNovosUsuarios<T extends FieldValues>(
		erro: any,
		form: UseFormReturn<T>
	): void {
		const listaDeErros = erro?.resposta?.data;
		if (listaDeErros) {
			if (listaDeErros.cpf) {
				form.setError("usuário.cpf" as FieldPath<T>, {
					type: "cadastrado",
					message: "CPF já cadastrado",
				});
			}
			if (listaDeErros.email) {
				form.setError("usuário.email" as FieldPath<T>, {
					type: "cadastrado",
					message: "Email já cadastrado",
				});
			}
		}
	},
};

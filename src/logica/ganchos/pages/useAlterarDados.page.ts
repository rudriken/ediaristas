import { yupResolver } from "@hookform/resolvers/yup";
import { EnderecoInterface } from "logica/@tipos/EnderecoInterface";
import { CadastroDiaristaFormularioDeDadosInterface } from "logica/@tipos/FormularioInterface";
import {
	InterfaceDoUsuario,
	TipoDoUsuario,
} from "logica/@tipos/InterfaceDoUsuario";
import { ContextoUsuario } from "logica/contextos/ContextoUsuario";
import { ServicoAPIHateoas } from "logica/servicos/ServicoAPI";
import { ServicoEstruturaFormulario } from "logica/servicos/ServicoEstruturaFormulario";
import { ServicoFormatadorDeTexto } from "logica/servicos/ServicoFormatadorDeTexto";
import { ServicoObjeto } from "logica/servicos/ServicoObjeto";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function useAlterarDados() {
	const { estadoUsuario, despachoUsuario } = useContext(ContextoUsuario),
		{ usuario } = estadoUsuario,
		formularioMetodos = useForm<CadastroDiaristaFormularioDeDadosInterface>(
			{
				resolver: pegarResolver(),
			}
		),
		[foto, alterarFoto] = useState("");

	useEffect(() => {
		alterarFoto(usuario.foto_usuario || "");
	}, [usuario]);

	function pegarResolver() {
		let resolver = ServicoEstruturaFormulario.dadosUsuario().concat(
			ServicoEstruturaFormulario.contato()
		);
		if (usuario.tipo_usuario === TipoDoUsuario.Diarista) {
			resolver = resolver.concat(ServicoEstruturaFormulario.endereco());
		}
		return yupResolver(resolver);
	}

	function aoAlterarFoto(evento: ChangeEvent) {
		const alvo = evento.target as HTMLInputElement,
			arquivos = alvo.files;
		if (arquivos !== null && arquivos.length) {
			const arquivo = arquivos[0];
			alterarFoto(URL.createObjectURL(arquivo));
		}
	}

	async function atualizarFoto() {
		ServicoAPIHateoas(
			usuario.links,
			"alterar_foto_usuario",
			async (requisicao) => {
				const listaDeArquivos = formularioMetodos.getValues(
					"usuario.foto_usuario"
				);
				if (listaDeArquivos && listaDeArquivos.length) {
					const fotoDoUsuario = listaDeArquivos[0];
					try {
						const dadosDoUsuario = ServicoObjeto.jsonParaFormData({
							foto_usuario: fotoDoUsuario,
						});
						await requisicao<InterfaceDoUsuario>({
							data: dadosDoUsuario,
							headers: { "Content-Type": "multipart/form-data" },
						});
					} catch (erro) {}
				}
			}
		);
	}

	async function atualizarEnderecoDoUsuario(
		dados: CadastroDiaristaFormularioDeDadosInterface
	) {
		ServicoAPIHateoas(
			usuario.links,
			"editar_endereco",
			async (requisicao) => {
				const endereco = {
					...dados.endereco,
					cep: ServicoFormatadorDeTexto.pegarNumerosParaTexto(
						dados.endereco.cep
					),
				};
				try {
					await requisicao<EnderecoInterface>({ data: endereco });
					despachoUsuario({
						tipo: "SET_USER_ADDRESS",
						carregarObjeto: endereco,
					});
				} catch (erro) {}
			}
		);
	}

	return {
		usuario,
		formularioMetodos,
		foto,
		aoAlterarFoto,
		atualizarFoto,
		atualizarEnderecoDoUsuario,
	};
}

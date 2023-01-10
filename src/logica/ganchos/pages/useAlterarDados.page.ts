import { yupResolver } from "@hookform/resolvers/yup";
import axios, { AxiosResponse } from "axios";
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
		{ usuario, enderecoUsuario } = estadoUsuario,
		formularioMetodos = useForm<CadastroDiaristaFormularioDeDadosInterface>(
			{
				resolver: pegarResolver(),
			}
		),
		[foto, alterarFoto] = useState(""),
		[arquivoDaFoto, alterarArquivoDaFoto] = useState<File>(),
		[mensagemDeFeedback, alterarMensagemDeFeedback] = useState("");

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

	async function aoSubmeterFormulario(
		dados: CadastroDiaristaFormularioDeDadosInterface
	) {
		await atualizarFoto();
		await atualizarUsuario(dados);
		if (usuario.tipo_usuario === TipoDoUsuario.Diarista) {
			await Promise.all([
				atualizarEnderecoDoUsuario(dados),
				atualizarListaDeCidadesAtendidas(dados),
			]);
		}
		alterarMensagemDeFeedback("Dados atualizados!");
	}

	function aoAlterarFoto(evento: ChangeEvent) {
		const alvo = evento.target as HTMLInputElement,
			arquivos = alvo.files;
		if (arquivos !== null && arquivos.length) {
			const arquivo = arquivos[0];
			alterarFoto(URL.createObjectURL(arquivo));
			alterarArquivoDaFoto(arquivo);
		}
	}

	async function atualizarFoto() {
		ServicoAPIHateoas(
			usuario.links,
			"alterar_foto_usuario",
			async (requisicao) => {
				// const listaDeArquivos = formularioMetodos.getValues(
				// 	"usuario.foto_usuario"
				// );
				// if (listaDeArquivos && listaDeArquivos.length)
				if (arquivoDaFoto) {
					// const fotoDoUsuario = listaDeArquivos[0];
					try {
						const dadosDoUsuario = ServicoObjeto.jsonParaFormData({
							// foto_usuario: fotoDoUsuario,
							foto_usuario: arquivoDaFoto,
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

	async function atualizarListaDeCidadesAtendidas(
		dados: CadastroDiaristaFormularioDeDadosInterface
	) {
		ServicoAPIHateoas(
			usuario.links,
			"relacionar_cidades",
			async (requisicao) => {
				try {
					await requisicao<EnderecoInterface>({
						data: { cidades: dados.cidadesAtendidas },
					});
					despachoUsuario({
						tipo: "SET_ADDRESS_LIST",
						carregarObjeto: dados.cidadesAtendidas,
					});
				} catch (erro) {}
			}
		);
	}

	async function atualizarUsuario(
		dados: CadastroDiaristaFormularioDeDadosInterface
	) {
		ServicoAPIHateoas(
			usuario.links,
			"editar_usuario",
			async (requisicao) => {
				try {
					const nascimento = ServicoFormatadorDeTexto.dataParaString(
							dados.usuario.nascimento as Date
						),
						cpf = ServicoFormatadorDeTexto.pegarNumerosParaTexto(
							dados.usuario.cpf
						),
						telefone =
							ServicoFormatadorDeTexto.pegarNumerosParaTexto(
								dados.usuario.telefone
							),
						dadosDoUsuario = {
							...dados.usuario,
							nascimento,
							cpf,
							telefone,
						};

					delete dadosDoUsuario.foto_usuario;

					if (
						!dadosDoUsuario.password ||
						!dadosDoUsuario.password_confirmation ||
						!dadosDoUsuario.new_password
					) {
						delete dadosDoUsuario.password;
						delete dadosDoUsuario.password_confirmation;
						delete dadosDoUsuario.new_password;
					}

					const usuarioAtualizado = (
						await requisicao<InterfaceDoUsuario>({
							data: dadosDoUsuario,
						})
					).data;

					despachoUsuario({
						tipo: "SET_USER",
						carregarObjeto: { ...usuario, ...usuarioAtualizado },
					});
				} catch (erro) {
					if (axios.isAxiosError(erro)) {
						interface maisUmCampoParaAxiosResponse
							extends AxiosResponse {
							password: string;
						}

						let senha = erro?.response
							?.data as maisUmCampoParaAxiosResponse;

						if (senha?.password) {
							formularioMetodos.setError("usuario.password", {
								type: "invalida",
								message: "Senha inválida",
							});
						}
					}
				}
			}
		);
	}

	return {
		usuario,
		enderecoUsuario,
		formularioMetodos,
		foto,
		aoAlterarFoto,
		mensagemDeFeedback,
		alterarMensagemDeFeedback,
		aoSubmeterFormulario,
	};
}

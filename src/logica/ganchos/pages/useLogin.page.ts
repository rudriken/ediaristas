import { yupResolver } from "@hookform/resolvers/yup";
import {
	CredenciaisInterface,
	LoginFormularioDeDadosInterface,
} from "logica/@tipos/FormularioInterface";
import { ContextoServicosExternos } from "logica/contextos/ContextoServicosExternos";
import { ContextoUsuario } from "logica/contextos/ContextoUsuario";
import { ServicoEstruturaFormulario } from "logica/servicos/ServicoEstruturaFormulario";
import { ServicoLogin } from "logica/servicos/ServicoLogin";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";

export default function useLogin() {
	const formularioMetodos = useForm<
			LoginFormularioDeDadosInterface<CredenciaisInterface>
		>({
			resolver: yupResolver(ServicoEstruturaFormulario.login()),
		}),
		[mensagemDeErro, alterarMensagemDeErro] = useState(""),
		{ despachoUsuario } = useContext(ContextoUsuario),
		{ estadoServicosExternos } = useContext(ContextoServicosExternos);

	async function aoSubmeter(
		dado: LoginFormularioDeDadosInterface<CredenciaisInterface>
	) {
		alterarMensagemDeErro("");
		const sucessoNoLogin = await ServicoLogin.entrar(dado.login);
		if (sucessoNoLogin) {
			const usuario = await ServicoLogin.informacoes();
			despachoUsuario({ tipo: "SET_USER", carregarObjeto: usuario });
		} else {
			alterarMensagemDeErro("E-mail e/ou senha inválido(s)");
		}
	}

	return {
		estadoServicosExternos,
		formularioMetodos,
		mensagemDeErro,
		aoSubmeter,
	};
}

import { yupResolver } from "@hookform/resolvers/yup";
import { CadastroDiaristaFormularioDeDadosInterface } from "logica/@tipos/FormularioInterface";
import { TipoDoUsuario } from "logica/@tipos/InterfaceDoUsuario";
import { ContextoUsuario } from "logica/contextos/ContextoUsuario";
import { ServicoEstruturaFormulario } from "logica/servicos/ServicoEstruturaFormulario";
import { useContext } from "react";
import { useForm } from "react-hook-form";

export default function useAlterarDados() {
	const { estadoUsuario, despachoUsuario } = useContext(ContextoUsuario),
		{ usuario } = estadoUsuario,
		metodosFormulario = useForm<CadastroDiaristaFormularioDeDadosInterface>(
			{
				resolver: pegarResolver(),
			}
		);

	function pegarResolver() {
		let resolver = ServicoEstruturaFormulario.dadosUsuario().concat(
			ServicoEstruturaFormulario.contato()
		);
		if (usuario.tipo_usuario === TipoDoUsuario.Diarista) {
			resolver = resolver.concat(ServicoEstruturaFormulario.endereco);
		}
		return yupResolver(resolver);
	}
}

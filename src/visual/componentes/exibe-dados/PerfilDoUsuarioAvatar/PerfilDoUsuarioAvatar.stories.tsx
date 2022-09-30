import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TipoDoUsuario } from "logica/@tipos/InterfaceDoUsuario";
import PerfilDoUsuarioAvatar from "./PerfilDoUsuarioAvatar";

export default {
	title: "exibe-dados/PerfilDoUsuarioAvatar",
	component: PerfilDoUsuarioAvatar,
	argTypes: {},
} as ComponentMeta<typeof PerfilDoUsuarioAvatar>;

const Modelo: ComponentStory<typeof PerfilDoUsuarioAvatar> = (argumentos) => (
	<PerfilDoUsuarioAvatar {...argumentos} />
);

export const Padrao = Modelo.bind({});
Padrao.args = {
	usuario: {
		nome_completo: "Lídia Moraes Ribeiro Resende",
		nascimento: "1987-04-21",
		cpf: "64341748025",
		foto_usuario: "imagens/fotos/Lídia Moraes Ribeiro Resende.png",
		telefone: "(34) 99752-1025",
		email: "lidiamoraesrr@gmail.com",
		tipo_usuario: TipoDoUsuario.Cliente,
		reputacao: 4.2,
		password: "ituiutabaCOMaraguari",
		chave_pix: "lidiamoraesrr@gmail.com",
	},
};

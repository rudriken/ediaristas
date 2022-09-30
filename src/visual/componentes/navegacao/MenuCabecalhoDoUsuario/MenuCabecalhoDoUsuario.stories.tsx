import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TipoDoUsuario } from "logica/@tipos/InterfaceDoUsuario";
import MenuCabecalhoDoUsuario from "./MenuCabecalhoDoUsuario";

export default {
	title: "navegacao/MenuCabecalhoDoUsuario",
	component: MenuCabecalhoDoUsuario,
	argTypes: {},
} as ComponentMeta<typeof MenuCabecalhoDoUsuario>;

const Modelo: ComponentStory<typeof MenuCabecalhoDoUsuario> = (argumentos) => (
	<MenuCabecalhoDoUsuario {...argumentos} />
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
	menuAberto: false,
};

import { Button } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ListaDeDados from "./ListaDeDados";

export default {
	title: "exibe-dados/ListaDeDados",
	component: ListaDeDados,
	argTypes: {},
} as ComponentMeta<typeof ListaDeDados>;

const Modelo: ComponentStory<typeof ListaDeDados> = (argumentos) => (
	<ListaDeDados
		cabeçalho={
			<div>
				Data: 05/08/2022
				<br />
				Limpeza simples
			</div>
		}
		corpo={
			<div>
				Cidade: Uberlândia
				<br />
				Número de cômodos
			</div>
		}
		ações={
			<>
				<Button variant={"contained"} color={"secondary"}>
					Se candidatar
				</Button>
			</>
		}
	/>
);

export const Padrao = Modelo.bind({});
Padrao.args = {};

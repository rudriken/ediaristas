import { ComponentMeta, ComponentStory } from "@storybook/react";
import AmbienteSeguro from "./AmbienteSeguro";

export default {
    title: "retorno/AmbienteSeguro",
    component: AmbienteSeguro,
} as ComponentMeta<typeof AmbienteSeguro>;

const Modelo: ComponentStory<typeof AmbienteSeguro> = () => {
    return <AmbienteSeguro />;
};

export const Padrao = Modelo.bind({});
Padrao.args = {};

import { ComponentMeta, ComponentStory } from "@storybook/react";
import CampoDeTextoComMascara from "./CampoDeTextoComMascara";

export default {
    title: "entradas/CampoDeTextoComMascara",
    component: CampoDeTextoComMascara,
    argTypes: {},
} as ComponentMeta<typeof CampoDeTextoComMascara>;

const Modelo: ComponentStory<typeof CampoDeTextoComMascara> = (argumentos) => (
    <CampoDeTextoComMascara {...argumentos} />
);

export const Padrao = Modelo.bind({});
Padrao.args = {
    máscara: "99/99/9999",
};

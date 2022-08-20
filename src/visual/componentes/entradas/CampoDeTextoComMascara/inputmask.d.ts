import React, { PropsWithChildren } from "react";
export declare module "react-input-mask" {
	interface Criança extends Omit<PropsWithChildren, "children"> {
		children?: () => void;
	}
	export class ReactInputMask extends React.Component<Criança> {}
	export default ReactInputMask;

}
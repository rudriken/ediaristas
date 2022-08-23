import { PropsWithChildren } from "react";

declare module "react-input-mask" {
	interface Máscara extends PropsWithChildren {
		children: () => {};
	}
	const Rodrigo: Máscara;
	export default Rodrigo;
}

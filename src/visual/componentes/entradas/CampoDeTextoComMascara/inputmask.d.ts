import { PropsWithChildren } from "react";

declare module "react-input-mask" {
	interface Mascara extends PropsWithChildren {
		children: () => {};
	}
	const Rodrigo: Mascara;
	export default Rodrigo;
}

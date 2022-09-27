import { useState } from "react";

export default function useEncontrarDiarista() {
	const [podeContratar, alterarPodeContratar] = useState(false);
	return {
		podeContratar,
		alterarPodeContratar,
	};
}

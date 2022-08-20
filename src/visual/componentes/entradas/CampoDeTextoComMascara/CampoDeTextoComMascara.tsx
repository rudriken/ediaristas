import React from "react";
import InputMask from "react-input-mask";
import CampodeTexto from "../CampoDeTexto/CampoDeTexto";
import { OutlinedTextFieldProps } from "@mui/material";
// import {  } from "./CampoDeTextoComMascara.style";

export interface CampoDeTextoComMascaraProps
	extends Omit<OutlinedTextFieldProps, "vari-ant"> {
	// estende todas as propriedades, exceto a "variant"
	máscara: string;
}

const CampoDeTextoComMascara: React.FC<CampoDeTextoComMascaraProps> = ({
	máscara,
	value,
	onChange,
	onBlur,
	...outras
}) => {
	return (
		<InputMask
			mask={máscara}
			value={value as string}
			onChange={onChange}
			onBlur={onBlur}
		>
			{() => <CampodeTexto {...outras} variant={"outlined"} />}
		</InputMask>
	);
};

export default CampoDeTextoComMascara;

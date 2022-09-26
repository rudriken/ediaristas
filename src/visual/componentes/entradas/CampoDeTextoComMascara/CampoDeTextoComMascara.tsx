import React from "react";
import InputMask from "react-input-mask";
import CampodeTexto from "../CampoDeTexto/CampoDeTexto";
import { OutlinedTextFieldProps } from "@mui/material";
// import {  } from "./CampoDeTextoComMascara.style";

export interface CampoDeTextoComMascaraProps
	extends Omit<OutlinedTextFieldProps, "variant"> {
	// estende todas as propriedades, exceto a "variant"
	mascara: string;
}

const CampoDeTextoComMascara: React.FC<CampoDeTextoComMascaraProps> = ({
	mascara,
	value,
	onChange,
	onBlur,
	...outras
}) => {
	return (
		<InputMask
			mask={mascara}
			value={value as string}
			onChange={onChange}
			onBlur={onBlur}
		>
			{() => <CampodeTexto {...outras} variant={"outlined"} />}
		</InputMask>
	);
};

export default CampoDeTextoComMascara;

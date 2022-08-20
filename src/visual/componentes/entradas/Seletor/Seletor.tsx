import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { FormControl, InputLabel, SelectProps } from "@mui/material";
import { SeletorEstilizado } from "./Seletor.style";

export interface SeletorProps extends SelectProps {
	rótulo?: string;
}

const Seletor: React.FC<SeletorProps> = ({
	rótulo,
	children,
	style,
	...outras
}) => {
	const [elementoID, alterarElementoID] = useState("");

	useEffect(() => {
		if (window !== undefined) {
			alterarElementoID(uuid());
		}
	}, []);

	return (
		<FormControl variant="outlined" style={style}>
			<InputLabel id={elementoID}>{rótulo}</InputLabel>
			<SeletorEstilizado labelId={elementoID} label={rótulo} {...outras}>
				{children}
			</SeletorEstilizado>
		</FormControl>
	);
};

export default Seletor;

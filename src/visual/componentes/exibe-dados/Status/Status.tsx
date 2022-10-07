import React from "react";
import { StatusE } from "./Status.style";
import { CorDoTexto } from "logica/@tipos/DiariaInterface";
// import {  } from "@mui/material";

export interface StatusProps {
	cor?: CorDoTexto;
}

const Status: React.FC<StatusProps> = ({ cor = "success", ...outras }) => {
	return <StatusE sx={{ bgcolor: `${cor}.main` }} {...outras} />;
};

export default Status;

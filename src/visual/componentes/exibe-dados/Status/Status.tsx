import React, { PropsWithChildren } from "react";
import { StatusE } from "./Status.style";
import { CorDoTexto } from "logica/@tipos/DiariaInterface";
// import {  } from "@mui/material";

export interface StatusProps extends PropsWithChildren {
	cor?: CorDoTexto;
}

const Status: React.FC<StatusProps> = ({ cor = "success", ...outras }) => {
	return <StatusE sx={{ bgcolor: `${cor}.main` }} {...outras} />;
};

export default Status;

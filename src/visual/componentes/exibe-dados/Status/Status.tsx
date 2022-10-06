import React from "react";
// import {  } from "@mui/material";
import { StatusE } from "./Status.style";

export interface StatusProps {
	aviso?: "success" | "error" | "warning" | "primary" | "secondary";
}

const Status: React.FC<StatusProps> = ({ aviso = "success", ...outras }) => {
	return <StatusE sx={{ bgcolor: `${aviso}.main` }} {...outras} />;
};

export default Status;

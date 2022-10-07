import React from "react";
import { GetStaticProps } from "next";
import { ProvedorDiaria } from "logica/contextos/ContextoDiarias";
import MinhasDiarias from "@parciais/diarias/_minhas-diarias";
// import {  } from "@estilos/pages/diarias.styled";

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {
			titulo: "Diárias",
		},
	};
};

const Diarias: React.FC = () => {
	return (
		<ProvedorDiaria>
			<MinhasDiarias />
		</ProvedorDiaria>
	);
};

export default Diarias;

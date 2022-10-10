import React from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ProvedorDiaria } from "logica/contextos/ContextoDiarias";
import MinhasDiarias from "@parciais/diarias/_minhas-diarias";
import DetalhesDiaria from "@parciais/diarias/_detalhes-diaria";
// import {  } from "@estilos/pages/diarias.styled";

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {
			titulo: "Diárias",
		},
	};
};

const Diarias: React.FC = () => {
	const roteador = useRouter();
	if (roteador.query.id) {
		return (
			<ProvedorDiaria>
				<DetalhesDiaria id={roteador.query.id as string} />
			</ProvedorDiaria>
		);
	}
	return (
		<ProvedorDiaria>
			<MinhasDiarias />
		</ProvedorDiaria>
	);
};

export default Diarias;

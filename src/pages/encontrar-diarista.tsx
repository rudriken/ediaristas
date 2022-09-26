import React from "react";
import { GetStaticProps } from "next";
import Contratacao from "@parciais/encontrar-diarista/_contratacao";
import VerificarProfissionais from "@parciais/encontrar-diarista/_verificar-profissionais";
import useEncontrarDiarista from "logica/ganchos/pages/useEncontrarDiarista.page";
// import {  } from "@estilos/pages/encontrar-diarista.styled";

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: { titulo: "Encontrar Diarista" },
	};
};

const EncontrarDiarista: React.FC = () => {
	const { podeContratar, alterarPodeContratar } = useEncontrarDiarista();
	return (
		<div>
			{!podeContratar ? (
				<VerificarProfissionais
					aoContratarProfissional={() => alterarPodeContratar(true)}
				/>
			) : (
				<Contratacao />
			)}
		</div>
	);
};

export default EncontrarDiarista;

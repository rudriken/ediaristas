import React from "react";
import { GetStaticProps } from "next";
import Contratacao from "@parciais/encontrar-diarista/_contratacao";
import VerificarProfissionais from "@parciais/encontrar-diarista/_verificar-profissionais";
// import {  } from "@estilos/pages/encontrar-diarista.styled";

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            titulo: "Encontrar Diarista",
        },
    };
};

const EncontrarDiarista: React.FC = () => {
	
    return (
        <div>
            <VerificarProfissionais />
			<Contratacao />
        </div>
    );
};

export default EncontrarDiarista;

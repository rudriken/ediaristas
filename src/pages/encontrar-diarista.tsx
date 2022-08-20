import React from "react";
import { GetStaticProps } from "next";
import VerificarProfissionais from "@parciais/encontrar-diarista/_verificar-profissionais";
// import {  } from "@estilos/pages/encontrar-diarista.styled";

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            título: "Encontrar Diarista",
        },
    };
};

const EncontrarDiarista: React.FC = () => {
    return (
        <div>
            <VerificarProfissionais />
        </div>
    );
};

export default EncontrarDiarista;

import React from "react";
import { GetStaticProps } from "next";
// import {  } from "@estilos/pages/pagamentos.styled";

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {
			titulo: "Pagamentos",
		},
	};
};

const Pagamentos: React.FC = () => {
	return (
		<div>
			<div>Pagamentos</div>
		</div>
	);
};

export default Pagamentos;

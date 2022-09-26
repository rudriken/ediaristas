import Apresentacao from "@parciais/index/_apresentacao";
import Vantagens from "@parciais/index/_vantagens";
import DuvidasFrequentes from "@parciais/index/_duvidas-frequentes";
import type { GetStaticProps, NextPage } from "next";
import produce from "immer";

export const getStaticProps: GetStaticProps = async () => {
	return { props: { título: "" } };
};

const Index: NextPage = () => {
	return (
		<div>
			<Apresentacao />
			<Vantagens />
			<DuvidasFrequentes />
		</div>
	);
};

export default Index;

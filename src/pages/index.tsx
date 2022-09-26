import Apresentacao from "@parciais/index/_apresentacao";
import Vantagens from "@parciais/index/_vantagens";
import DuvidasFrequentes from "@parciais/index/_duvidas-frequentes";
import type { GetStaticProps, NextPage } from "next";

export const getStaticProps: GetStaticProps = async () => {
	return { props: { titulo: "" } };
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

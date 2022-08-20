import type { GetStaticProps, NextPage } from "next";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Produto = yup.object().shape({
	produto: yup.object().shape({
		nome: yup.string().min(3, "Digite um nome maior"),
	}),
});

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {
			título: "",
		},
	};
};

const Index: NextPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(Produto),
	});

	function enviarFormulário(dados: any) {
		console.log("Dados do formulário: ", dados);
	}

	return (
		<div>
			<form onSubmit={handleSubmit(enviarFormulário)}>
				<input {...register("produto.nome", { required: true })} />
				{errors?.produto?.nome?.message}
				{console.log(errors)}
				<button>Enviar</button>
			</form>
		</div>
	);
};

export default Index;

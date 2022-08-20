import * as yup from "yup";

export const ServiçoEstruturaFormulário = {
	novoCxntato() {
		return yup
			.object()
			.shape({
				usuário: yup.object().shape({
					email: yup.string().email("E-mail inválido"),
					password: yup.string().min(5, "Senha muito curta"),
					password_confirmation: yup
						.string()
						.min(5, "Senha muito curta")
						.oneOf(
							[yup.ref("password"), null],
							"As senhas não estão iguais"
						),
				}),
			})
			.defined();
	},
};

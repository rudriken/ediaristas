import pagarme, { CartaoInterface, CartaoValidacaoInterface } from "pagarme";

const chave_encriptadora = process.env.NEXT_PUBLIC_PAGARME_ENCRYPTION_KEY;

export const ServicoPagamento = {
	validar(cartao: CartaoInterface): CartaoValidacaoInterface {
		return pagarme.validate({ card: cartao }).card;
	},
	pegarHash(cartao: CartaoInterface): Promise<string> {
		return pagarme.client
			.connect({ encryption_key: chave_encriptadora })
			.then((client) => client.security.encrypt(cartao));
	},
};

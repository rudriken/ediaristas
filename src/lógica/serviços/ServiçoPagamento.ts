import pagarme, { CartãoInterface, CartãoValidaçãoInterface } from "pagarme";

const chave_de_encriptacao = process.env.NEXT_PUBLIC_PAGARME_ENCRYPTION_KEY;

export const ServiçoPagamento = {
	validar(cartão: CartãoInterface): CartãoValidaçãoInterface {
		return pagarme.validate({ card: cartão }).card;
	},
	pegarHash(cartao: CartãoInterface): Promise<string> {
		return pagarme.client
			.connect({ encryption_key: chave_de_encriptacao })
			.then((cliente) => cliente.security.encrypt(cartao));
	},
};

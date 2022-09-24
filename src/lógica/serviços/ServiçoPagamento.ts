import pagarme, { CartãoInterface, CartãoValidaçãoInterface } from "pagarme";

export const ServiçoPagamento = {
	validar(cartão: CartãoInterface): CartãoValidaçãoInterface {
		return pagarme.validate({ card: cartão }).card;
	},
};

import pagarme, { CartaoInterface, CartaoValidacaoInterface } from "pagarme";

export const ServiçoPagamento = {
	validar(cartao: CartaoInterface): CartaoValidacaoInterface {
		return pagarme.validate({ card: cartao }).card;
	},
};

declare module "pagarme" {
	export default Pagarme;

	export interface CartãoValidaçãoInterface {
		brand: string;
		card_cvv: boolean;
		card_expiration_date: boolean;
		card_holder_name: boolean;
		card_number: boolean;
	}

	export interface CartãoInterface {
		card_number: string;
		card_holder_name: string;
		card_expiration_date: string;
		card_cvv: string;
	}
}

// os nomes das variáveis e campos devem ser os mesmos que estão na biblioteca Pagarme

declare const Pagarme: PagarmeInterface;

interface PagarmeInterface {
	validate({ card: CartãoInterface }): { card: CartãoValidaçãoInterface };
	client: PagarmeClientInterface;
}

interface PagarmeClientInterface {
	connect: ({ encryption_key: string }) => Promise<PagarmeClientInterface>;
	security: {
		encrypt: (card: CartãoInterface) => Promise<string>;
	};
}

export const ServiçoValidação = {
	/**
	 * Verifica se o CEP digitado pelo usuário possui o formato válido de 8 números.
	 * @param string cep
	 * @returns boolean
	 */
    verificarCEP(cep: string): boolean {
        return cep.replace(/\D/g, "").length === 8;
    },
};

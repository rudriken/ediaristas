export const ServicoData = {
	adicionarHoras(horarioInicial: string, horas: number): string {
		let [hora, minuto] = horarioInicial.split(":").map(Number);
		hora = Math.min(hora + horas, 23);
		const novaHora = hora.toString().padStart(2, "0"),
			novoMinuto = minuto.toString().padStart(2, "0");
		return `${novaHora}:${novoMinuto}`;
	},
	dataDeNascimentoMinima(): Date {
		const data = new Date();
		data.setFullYear(data.getFullYear() - 18);
		return data;
	},
	dataDeNascimentoMaxima(): Date {
		const data = new Date();
		data.setFullYear(data.getFullYear() - 100);
		return data;
	},
	pegarTempoDeData(data: string): string {
		/* a data recebida terá o formato "2022-10-11T13:04:41Z", portanto ... */
		const [_dia, tempo] = data.split("T"),
			[hora, minuto, ..._resto] = tempo.split(":");
		return `${hora}:${minuto}`;
	},
	converterStringEmData(valor: any, valorOriginal: any): any {
		if (typeof valorOriginal === "string") {
			const [dia, mês, ano] = valorOriginal.split("/");
			if (+mês < 1 || +mês > 12) {
				return new Date("");
			}
			return new Date(+ano, +mês - 1, +dia);
		}
		return valor;
	},
	pegarDiferencaDeHoras(dataETempo: Date): number {
		const agora = Date.now(),
			dataFutura = dataETempo.getTime();
		return (dataFutura - agora) / 1000 / 60 / 60;
	},
};

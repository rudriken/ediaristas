import { CorDoTexto, DiariaStatus } from "logica/@tipos/DiariaInterface";

export const ServicoDiaria = {
	pegarStatus(status: DiariaStatus): { rotulo: string; cor: CorDoTexto } {
		let rotulo = "",
			cor: CorDoTexto = "success";
		switch (status) {
			case DiariaStatus.SEM_PAGAMENTO:
				rotulo = "Pagamento recusado";
				cor = "error";
				break;
			case DiariaStatus.PAGO:
				rotulo = "Paga";
				break;
			case DiariaStatus.CONFIRMADO:
				rotulo = "Confirmada";
				break;
			case DiariaStatus.CONCLUIDO:
				rotulo = "Aguardando avaliação";
				cor = "warning";
				break;
			case DiariaStatus.CANCELADO:
				rotulo = "Cancelada";
				cor = "error";
				break;
			case DiariaStatus.AVALIADO:
				rotulo = "Avaliada";
				break;
			case DiariaStatus.TRANSFERIDO:
				rotulo = "Finalizada";
				break;
		}
		return { rotulo, cor };
	},
};

import { Fragment } from "react";
import { ListItem, ListItemAvatar, Container } from "@mui/material";
import {
	FundoGradiente,
	SecaoTitulo,
	ListaEstilizada,
	ListaItemTextoEstilizada,
	AvatarEstilizado,
	DivisorLista,
} from "./_vantagens.styled";

const vantagensLista = [
	{
		icone: "twf-woman",
		titulo: "Diversidade",
		descricao: "São mais de 5.000 profissionais esperando por você!",
	},
	{
		icone: "twf-certificate",
		titulo: "Confiabilidade",
		descricao: "Todos os profissionais são verificados.",
	},
	{
		icone: "twf-search-2",
		titulo: "Rastreabilidade",
		descricao: "Você pode acessar todo o histórico do(a) profissional.",
	},
	{
		icone: "twf-frame-broken",
		titulo: "Segurança",
		descricao: "Seguro sobre qualquer possível dano.",
	},
	{
		icone: "twf-payment",
		titulo: "Controle",
		descricao:
			"O pagamento é realizado somente quando o(a) profissional está na sua casa.",
	},
	{
		icone: "twf-broom-bucket",
		titulo: "Experiência",
		descricao: "Mais de 50.000 diárias realizadas.",
	},
];

const Vantagens = () => {
	return (
		<FundoGradiente>
			<Container>
				<SecaoTitulo>Por que usar o E-diaristas?</SecaoTitulo>
				<ListaEstilizada>
					{vantagensLista.map((item, indice) => (
						<Fragment key={item.icone}>
							{indice !== 0 && <DivisorLista />}
							<ListItem disableGutters>
								<ListItemAvatar>
									<AvatarEstilizado>
										<i className={item.icone} />
									</AvatarEstilizado>
								</ListItemAvatar>
								<ListaItemTextoEstilizada
									primary={item.titulo}
									secondary={item.descricao}
								/>
							</ListItem>
						</Fragment>
					))}
				</ListaEstilizada>
			</Container>
		</FundoGradiente>
	);
};

export default Vantagens;

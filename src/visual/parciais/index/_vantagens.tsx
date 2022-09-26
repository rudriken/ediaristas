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
        ícone: "twf-woman",
        título: "Diversidade",
        descrição: "São mais de 5.000 profissionais esperando por você!",
    },
    {
        ícone: "twf-certificate",
        título: "Confiabilidade",
        descrição: "Todos os profissionais são verificados.",
    },
    {
        ícone: "twf-search-2",
        título: "Rastreabilidade",
        descrição: "Você pode acessar todo o histórico do(a) profissional.",
    },
    {
        ícone: "twf-frame-broken",
        título: "Segurança",
        descrição: "Seguro sobre qualquer possível dano.",
    },
    {
        ícone: "twf-payment",
        título: "Controle",
        descrição:
            "O pagamento é realizado somente quando o(a) profissional está na sua casa.",
    },
    {
        ícone: "twf-broom-bucket",
        título: "Experiência",
        descrição: "Mais de 50.000 diárias realizadas.",
    },
];

const Vantagens = () => {
    return (
        <FundoGradiente>
            <Container>
                <SecaoTitulo>Por que usar o E-diaristas?</SecaoTitulo>
                <ListaEstilizada>
                    {vantagensLista.map((item, índice) => (
                        <Fragment key={item.ícone}>
                            {índice !== 0 && <DivisorLista />}
                            <ListItem disableGutters>
                                <ListItemAvatar>
                                    <AvatarEstilizado>
                                        <i className={item.ícone} />
                                    </AvatarEstilizado>
                                </ListItemAvatar>
                                <ListaItemTextoEstilizada
                                    primary={item.título}
                                    secondary={item.descrição}
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

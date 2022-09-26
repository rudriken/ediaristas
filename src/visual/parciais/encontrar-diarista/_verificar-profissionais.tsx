import React from "react";
import { Container, Typography, Button, CircularProgress } from "@mui/material";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import AmbienteSeguro from "visual/componentes/retorno/AmbienteSeguro/AmbienteSeguro";
import {
    FormularioContainer,
    PapelProfissionais,
    ContainerProfissionais,
} from "./_verificar-profissionais.styled";
import CampoDeTextoComMascara from "visual/componentes/entradas/CampoDeTextoComMascara/CampoDeTextoComMascara";
import InformacaoDoUsuario from "visual/componentes/exibe-dados/InformacaoDoUsuario/InformacaoDoUsuario";
import useVerificarProfissionais from "logica/ganchos/pages/useVerificarProfissionais.page";

const VerificarProfissionais: React.FC = () => {
    const {
        cep,
        definirCep,
        cepValido,
        buscarProfissionais,
        erro,
        listaDiaristas,
        buscaFeita,
        carregando,
        diaristasRestantes,
    } = useVerificarProfissionais();
    return (
        <>
            <AmbienteSeguro />
            <TituloPagina
                titulo={"Conheça os profissionais"}
                subtitulo={
                    "Preencha seu endereço e veja todos os profissionais da sua localida-de"
                }
            />
            <Container sx={{ mb: 10 }}>
                <FormularioContainer>
                    <CampoDeTextoComMascara
                        mascara={"99.999-999"}
                        label={"Digite seu CEP"}
                        fullWidth
                        value={cep}
                        onChange={(evento) => definirCep(evento.target.value)}
                    />
                    {erro && <Typography color={"error"}>{erro}</Typography>}
                    <Button
                        variant={"contained"}
                        color={"secondary"}
                        sx={{ width: "220px" }}
                        disabled={!cepValido || carregando}
                        onClick={() => buscarProfissionais(cep)}
                    >
                        {carregando ? <CircularProgress size={20} /> : "Buscar"}
                    </Button>
                </FormularioContainer>

                {buscaFeita &&
                    (listaDiaristas.length > 0 ? (
                        <PapelProfissionais>
                            <ContainerProfissionais>
                                {listaDiaristas.map((item, índice) => (
                                    <InformacaoDoUsuario
                                        key={índice}
                                        nome={item.nome}
                                        foto={item.foto_do_usuario || ""}
                                        descricao={item.cidade}
                                        avaliacao={item.reputacao || 0}
                                    />
                                ))}
                            </ContainerProfissionais>
                            <Container sx={{ textAlign: "center" }}>
                                {diaristasRestantes > 0 && (
                                    <Typography
                                        variant={"body2"}
                                        color={"textSecondary"}
                                        sx={{ mt: 5 }}
                                    >
                                        ... e mais {diaristasRestantes}{" "}
                                        {diaristasRestantes > 1
                                            ? "profissionais atendem "
                                            : "profissional atende "}
                                        ao seu endereço
                                    </Typography>
                                )}
                                <Button
                                    variant={"contained"}
                                    color={"secondary"}
                                    sx={{ mt: 5 }}
                                >
                                    Contratar um(a) profissional
                                </Button>
                            </Container>
                        </PapelProfissionais>
                    ) : (
                        <Typography align={"center"} color={"textPrimary"}>
                            Ainda não temos nenhum(a) diarista disponível em sua região.
                        </Typography>
                    ))}
            </Container>
        </>
    );
};

export default VerificarProfissionais;

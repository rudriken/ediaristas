import { InterfaceDoUsuario } from "logica/@tipos/InterfaceDoUsuario";
import React from "react";
import { Button, Grid, Typography, Skeleton } from "@mui/material";
import { AvatarDoUsuario, AvatarIcone } from "./PerfilDoUsuarioAvatar.style";

export interface PerfilDoUsuarioAvatarProps {
	usuario: InterfaceDoUsuario;
	onClick?: (evento: React.MouseEvent) => void;
}

const PerfilDoUsuarioAvatar: React.FC<PerfilDoUsuarioAvatarProps> = (
	propriedades
) => {
	const temUsuarioLogado = propriedades.usuario.nome_completo.length > 0;
	return (
		<Button color={"inherit"} onClick={propriedades.onClick}>
			<Grid container spacing={1} wrap={"nowrap"}>
				<Grid item>
					{temUsuarioLogado ? (
						<AvatarDoUsuario
							alt={propriedades.usuario.nome_completo}
							src={propriedades.usuario.foto_usuario}
						>
							{propriedades.usuario.nome_completo[0]}
						</AvatarDoUsuario>
					) : (
						<Skeleton
							variant={"circular"}
							width={40}
							height={40}
							animation={"wave"}
						/>
					)}
				</Grid>
				<Grid item container spacing={1} alignItems={"center"}>
					<Grid item>
						{temUsuarioLogado ? (
							<Typography variant={"body2"} noWrap>
								{propriedades.usuario.nome_completo}
							</Typography>
						) : (
							<Skeleton
								variant={"text"}
								width={100}
								animation={"wave"}
							/>
						)}
					</Grid>
					<Grid item>
						<AvatarIcone
							className={"twf-caret-down"}
							{...propriedades}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Button>
	);
};

export default PerfilDoUsuarioAvatar;

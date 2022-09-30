import { styled, Avatar } from "@mui/material";
import { PerfilDoUsuarioAvatarProps } from "./PerfilDoUsuarioAvatar";

export const AvatarDoUsuario = styled(Avatar)`
	border: 2px solid currentColor;
`;

export const AvatarIcone = styled("i")<PerfilDoUsuarioAvatarProps>`
	font-size: 8px;
	vertical-align: middle;
	display: ${({ usuario }) => (usuario?.nome_completo ? "initial" : "none")};
`;

import axios from "axios";
import { ApiLinksInterface } from "lógica/@tipos/ApiLinksInterface";

const url = process.env.NEXT_PUBLIC_API;
console.log(process.env.NEXT_PUBLIC_ABC);

export const ServiçoAPI = axios.create({
	baseURL: url,
	headers: {
		"content-type": "application/json",
	},
});

export function linksResolver(
	links: ApiLinksInterface[] = [],
	nome: string
): ApiLinksInterface | undefined {
	return links.find((link) => link.rel === nome);
}

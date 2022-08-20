import axios from "axios";

const url = process.env.NEXT_PUBLIC_API;
console.log(process.env.NEXT_PUBLIC_ABC);

export const ServiçoAPI = axios.create({
    baseURL: url,
    headers: {
        "content-type": "application/json",
    },
});

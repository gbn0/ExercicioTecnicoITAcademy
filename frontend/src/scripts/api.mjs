import axios from 'https://cdn.skypack.dev/axios';

export const api = axios.create({
    baseURL: "https://exercicio-tecnico-it-academy.vercel.app/",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Allow-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
})
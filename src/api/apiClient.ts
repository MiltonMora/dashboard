const API_URL = 'http://localhost:1000';

import { RequestInit } from 'next/dist/server/web/spec-extension/request';

export const apiClient = async (endpoint: string, options: RequestInit) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json(); // Devuelve la respuesta convertida en JSON
  } catch (error) {
    console.error("API Error:", error);
    throw error; // Lanza el error para que pueda ser manejado fuera
  }
};
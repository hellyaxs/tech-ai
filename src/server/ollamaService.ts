// src/services/ollamaService.ts

import axios from 'axios';

// Defina a URL base do seu servidor Ollama.
// Se você estiver usando o proxy no package.json do React (recomendado para desenvolvimento),
// você pode usar um caminho relativo como '/api'.
// Caso contrário, use a URL completa como 'http://localhost:11434'.
const OLLAMA_BASE_URL = import.meta.env.VITE_OLLAMA_URL || 'http://localhost:11434';

// Crie uma instância do Axios para pré-configurar a URL base e outros cabeçalhos
const ollamaApi = axios.create({
  baseURL: OLLAMA_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const generateOllamaResponse = async (prompt: string, model: string = 'mistral'): Promise<string> => {
  const response = await axios.post(
    `${import.meta.env.VITE_OLLAMA_URL || 'http://localhost:11434'}/api/generate`,
    {
      model,
      prompt,
      stream: true,
    },
    { responseType: 'stream' }
  );

  return new Promise((resolve, reject) => {
    let result = '';
    response.data.on('data', (chunk: Buffer) => {
      // Cada chunk pode conter várias linhas JSON
      const lines = chunk.toString().split('\n').filter(Boolean);
      for (const line of lines) {
        try {
          const json = JSON.parse(line);
          if (json.response) result += json.response;
        } catch (e) {
          // Ignora linhas inválidas
        }
      }
    });
    response.data.on('end', () => resolve(result));
    response.data.on('error', reject);
  });
};

export async function* streamOllamaResponse(message: string, model: string = 'mistral') {

  const prompt = `
  Você é um assistente de IA que responde perguntas de forma educativa e amigável.
  sobre o produto fitai. um app que usa visão computacional para detectar se o usuário está usando fazendo exercícios corretamente.
  seja breve e direto.
  seja educado e profissional.
  seja amigável e humano.
  seja legal e gentil.
  seja legal e gentil.

  responda: ${message}  `;


  const response = await fetch(`${import.meta.env.VITE_OLLAMA_URL || 'http://localhost:11434'}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, prompt, stream: true }),
  });

  if (!response.body) throw new Error('No response body');

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split('\n').filter(Boolean);
    for (const line of lines) {
      try {
        const json = JSON.parse(line);
        if (json.response) yield json.response;
      } catch (e) {
        // Ignora linhas inválidas
      }
    }
  }
}

// Se você precisar de outros endpoints do Ollama, pode adicioná-los aqui:
// export const getOllamaModels = async () => {
//   try {
//     const response = await ollamaApi.get('/api/tags');
//     return response.data.models;
//   } catch (error) {
//     console.error("Erro ao buscar modelos do Ollama:", error);
//     throw error;
//   }
// };
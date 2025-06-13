# Chatbot com IA Integrado

Este é um projeto de chatbot que utiliza inteligência artificial para responder às interações dos usuários. O sistema integra um frontend React com um backend de IA usando Ollama e n8n para processamento de requisições.


## [click aqui para demo](https://684b83776d462ebc8353b842--tech-ai-elias-vitor.netlify.app/)
## Tecnologias Utilizadas

## [vídeo](https://drive.google.com/file/d/1ONSKccuFEY5QGR_3maQQAk4IfiiH21cX/view?usp=drivesdk)

- Frontend:
  - Vite
  - TypeScript
  - React
  - shadcn-ui
  - Tailwind CSS
- Backend:
  - Ollama (Modelo Mistral)
  - n8n (Automação de fluxos)
  - Docker

## Como Executar com Docker

### Pré-requisitos
- Docker e Docker Compose instalados
- NVIDIA GPU (forntemente recomendado)
- NVIDIA Container Toolkit instalado (para suporte a GPU)

### Configuração do Ambiente

1. Clone o repositório:
```sh
git clone https://github.com/hellyaxs/tech-ai.git
cd tech-ai
```

2. Inicie os containers:
```sh
docker-compose up -d
```

3. Aguarde a inicialização completa e baixe o modelo de IA:
```sh
docker exec -it ia_server ollama pull mistral
```

### Acessando a Aplicação

- Frontend: http://localhost:3000
- API Ollama: http://localhost:11434

## Arquitetura do Sistema

O sistema é composto por três componentes principais:

1. **Frontend React**: Interface do usuário onde os usuários interagem com o chatbot
2. **Ollama**: Serviço de IA que processa as requisições usando o modelo Mistral
3. **n8n**: Plataforma de automação que gerencia os fluxos de conversação e integrações

### Fluxo de Funcionamento

1. O usuário envia uma mensagem através do frontend
2. A requisição é processada pelo n8n
3. O n8n envia a requisição para o Ollama
4. O modelo Mistral processa e gera uma resposta
5. A resposta é retornada ao usuário através do frontend

## Desenvolvimento Local

Para desenvolvimento sem Docker:

```sh
# Instalar dependências
npm i

# Iniciar servidor de desenvolvimento
npm run dev
```

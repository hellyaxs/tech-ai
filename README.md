# Chatbot com IA Integrado

Este é um projeto de chatbot que utiliza inteligência artificial para responder às interações dos usuários. O sistema integra um frontend React com um backend de IA usando Ollama e n8n para processamento de requisições.

## Tecnologias Utilizadas

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
- NVIDIA GPU (recomendado)
- NVIDIA Container Toolkit instalado (para suporte a GPU)

### Configuração do Ambiente

1. Clone o repositório:
```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Configure as variáveis de ambiente:
```sh
# Crie um arquivo .env na raiz do projeto
cp .env.example .env
```

3. Edite o arquivo `.env` com suas configurações:
```env
# Configurações do Ollama
OLLAMA_HOST=0.0.0.0
OLLAMA_MODELS=mistral

# Configurações do n8n
N8N_HOST=localhost
N8N_PORT=5678
N8N_PROTOCOL=http
N8N_USER_EMAIL=seu@email.com
N8N_USER_PASSWORD=sua_senha

# Configurações do Frontend
VITE_API_URL=http://localhost:11434
```

4. Inicie os containers:
```sh
docker-compose up -d
```

5. Aguarde a inicialização completa e baixe o modelo de IA:
```sh
docker exec -it ia_server ollama pull mistral
```

### Acessando a Aplicação

- Frontend: http://localhost:3000
- n8n Interface: http://localhost:5678
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

## Deploy

Para fazer deploy do projeto:

1. Acesse [Lovable](https://lovable.dev/projects/35d72d2e-6e25-40e5-9b0c-c0d1a7c1b727)
2. Clique em Share -> Publish

Para deploy em domínio próprio, consulte nossa [documentação sobre domínios personalizados](https://docs.lovable.dev/tips-tricks/custom-domain/).

# Use uma imagem base do Node.js
FROM node:18

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos de dependências
COPY package*.json ./

# Instale as dependências
RUN npm install

# Gere o cliente do Prisma
RUN npx prisma generate

# Copie o restante do código do projeto
COPY . .

# Exponha a porta que o servidor usará
EXPOSE 3001

# Comando para iniciar o servidor
CMD ["npx", "ts-node", "src/index.ts"]

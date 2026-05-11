import http from "http";
import { Server } from "socket.io"; //importa o server importando uma instância
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express()
app.use(cors()) //cors permite que o script faça uma requisição com script de terceiros. Está como global

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*' //isso significa global
  }
})

let users = [] //é um array vazio por que são vários usuários, valores

function broadcast() { //broadcast significa "são em massa", muitas coisas. A ideia é a gente permitir vários eventos para muitas pessoas uma lista de usuário. Ele atualiza a lista de usuários
  io.emit('update', users)
}

io.on('connection', (socket) => { // quando alguem se conctar ao meu servidor automaticmaente tem uma instância socket, é chamado sempre que um usuário entra no servidor
  console.log('Conectou:', socket.id) //id é gerado aleatório.

socket.on('join', (name) => { //quando um suuário entra, o evento é disparado, a partir do "join" || emit->join io->on
    users.push({ //push cria um novo registro no array
      id: socket.id,
      name,
      x: 50,
      y: 100 //para gerar aleatoriamente a posição do nascimento, use-se o random patterns
    })

    // Envia o próprio ID do socket
    socket.emit('player', socket.id)//o id sai do backend e envia para o frontend, a varivel player

    broadcast()
  })

  socket.on('move', ({ x, y }) => {
    const user = users.find(u => u.id === socket.id) //atualiza para todos os usuários onde outros usuários estão, quando um deles se movimentam

    if (!user) return

    user.x = x
    user.y = y

    broadcast()
  })

  socket.on('disconnect', () => {
    console.log('Saiu:', socket.id)

    // Remove o usuário do array
    users = users.filter(u => u.id !== socket.id)

    broadcast()
  })
})

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
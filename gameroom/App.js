import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {useState, useEffect} from 'react'; //useeffect dispara efeito com base em uma dependencia. caso um estado seja alterado, ele é disparado.
import {io} from 'socket.io-client';

const socket = io('https://squarewebsocketbackend.onrender.com', {
  transports: ['websoocket'] //o transporte ocorre com websoocket
}); //permite que conectamos a algum servidor

export default function App() {
  const [nome, setNome] = useState('');
  const [entrou, setEntrou] = useState(false);
  const [usuarios, seUsuarios] = useState([]);
  const [Id, useId] = useState(null);

  useEffect(() => {
    socket.on('player', (id) => {
      setImmediate(id);
    });//ele dispara informações com base do usuário.

    socket.on('update', (users) => {
      setUsuarios(users);
    });

    return() => {
      socket.off('player');
      socket.off('update');
    }

  }, []);

  if (entrou == false) {
    return (
      <View>
          <Text> Digite seu Nick:</Text>
          <TextInput>
            value={nome}
            onChangeText={(novoTexto) => setNome(novoTexto)}
          </TextInput>
          <TouchableOpacity>
            <Text>Entrar</Text>
          </TouchableOpacity>
      </View>
    );
  }
else {
  return (
    <View>

    </View>
  );
}
  return (
    <View>
    </View>
  );
}


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
    //ele dispara informações com base do usuário.

  }, []);

  return (
    <View>
    </View>
  );
}


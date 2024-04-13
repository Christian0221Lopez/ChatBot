
import React, { useState } from 'react';
import { View, TextInput, Button, ToastAndroid } from 'react-native';
import DB from './DB';

const MainScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');

  const guardarHandler = () => {
    const db = new DB();
    const mensaje = db.guardar(nombre, apellido);
    ToastAndroid.show(mensaje, ToastAndroid.SHORT);
  };

  return (
    <View>
      <TextInput
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre"
      />
      <TextInput
        value={apellido}
        onChangeText={setApellido}
        placeholder="Apellido"
      />
      <Button title="Guardar" onPress={guardarHandler} />
      <Button
        title="Buscar, Eliminar y Actualizar"
        onPress={() => navigation.navigate('BuscarEliminarActualizar')}
      />
    </View>
  );
};

export default MainScreen;


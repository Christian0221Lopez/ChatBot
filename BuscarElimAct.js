// En BuscarEliminarActualizarScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ToastAndroid } from 'react-native';
import DB from './DB';

const BuscarEliminarActualizarScreen = () => {
  const [buscarInput, setBuscarInput] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');

  const buscarHandler = () => {
    const db = new DB();
    const datos = db.buscarReg(buscarInput);
    setNombre(datos[0]);
    setApellido(datos[1]);
    ToastAndroid.show(datos[2], ToastAndroid.SHORT);
  };

  const eliminarHandler = () => {
    const db = new DB();
    const mensaje = db.eliminar(nombre);
    ToastAndroid.show(mensaje, ToastAndroid.SHORT);
  };

  const actualizarHandler = () => {
    const db = new DB();
    const mensaje = db.actualizar(nombre, nnombre, napellido);
    ToastAndroid.show(mensaje, ToastAndroid.SHORT);
  };

  return (
    <View>
      <TextInput
        value={buscarInput}
        onChangeText={setBuscarInput}
        placeholder="Buscar"
      />
      <Text>Nombre: {nombre}</Text>
      <Text>Apellido: {apellido}</Text>
      <Button title="Buscar" onPress={buscarHandler} />
      <Button title="Eliminar" onPress={eliminarHandler} />
      <Button title="Actualizar" onPress={actualizarHandler} />
    </View>
  );
};

export default BuscarEliminarActualizarScreen;


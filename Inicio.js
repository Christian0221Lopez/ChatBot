import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Modificado
import GifImage from '@lowkey/react-native-gif';

const App = () => {
  const navigation = useNavigation(); // Modificado
  const [correo, setCorreo] = useState('');
  const [passw, setPass] = useState('');
  const [isRegisA, setIsRegisA] = useState(false); // Modificado
  const [isRegis, setIsRegis] = useState(false); // Modificado

  const handleCorreoChange = (text) => {
    setCorreo(text);
  }

  const handlePassChange = (text) => {
    setPass(text);
  }

  const MenuEnt = () =>
  {
    navigation.navigate("Menu");
  }

  const Enter = () => {
    // conexión con el servidor
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        console.log(xhttp.responseText);
        if (xhttp.responseText === "1") {
          Alert.alert("El usuario está registrado");
          setIsRegis(true); // Modificado
          MenuEnt();
        } else if (xhttp.responseText === "0") {
          Alert.alert("Usuario Administrador Encontrado");
          setIsRegisA(true); // Modificado
        } else {
          Alert.alert("Hubo un error, intenta nuevamente");
        }
      }
    };
    xhttp.open("GET", "https://myapp2023ti.000webhostapp.com/datos/Access.php?correo=" + correo + "&passw=" + passw, true);
    xhttp.send();
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Chat Bot</Text>
      <View>
        <GifImage
          source={require('./Imagenes/giphy.gif')}
          style={styles.image}
          resizeMode='cover' // Modificado
        />
      </View>
      <TextInput
        style={styles.input}
        onChangeText={handleCorreoChange}
        value={correo}
        placeholder="Correo electrónico"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={handlePassChange}
        value={passw}
        placeholder="Contraseña"
        secureTextEntry={true}
      />
      <Pressable onPress={Enter} style={styles.button}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 50,
    fontWeight: '900',
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 200,
    marginTop: 100,
    alignItems: 'center',
  },
  button: {
    borderRadius: 15,
    padding: 10,
    marginTop: 50,
    backgroundColor: '#FF5733',
  },
  buttonText: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 3,
    padding: 10,
    width: 150,
  },

});

export default App;

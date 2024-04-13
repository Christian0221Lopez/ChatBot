import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Alert, Image, ImageBackground} from 'react-native';
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
    <ImageBackground source={require('./Imagenes/Image/fond.jpeg')}
    style={StyleSheet.absoluteFillObject}>
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>
        ChatBot 
      </Text>
      <Text style={styles.sectionTitle2}>
        Black-Wire- Store
      </Text>
      <View>
        <Image
          source={require('./Imagenes/Image/bot.png')}
          style={styles.image}
          resizeMode='cover'
        />
      </View>
      <Text style={styles.subt}>
        Ingresa con nosotros para optimizar tu trabajo!
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={handleCorreoChange}
        value={correo}
        placeholder="Correo electrónico"
        placeholderTextColor="white"
        placeholderStyle={{ fontSize: 24, color: '#333',fontWeight: 'bold' }}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input2}
        onChangeText={handlePassChange}
        value={passw}
        placeholder="Contraseña"
        placeholderStyle={{ fontSize: 18, color: '#333', fontWeight: 'bold'}}
        placeholderTextColor="white"
        secureTextEntry={true}
      />
      <Pressable onPress={Enter} style={styles.button}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </Pressable>
      <Text style={styles.subt2}>
        Si no estas registrado, que esperas<Text style={styles.link}> Registrate!...</Text>
      </Text>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black', // Azul oscuro
    marginTop: 50,
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Sombra de texto
    textShadowOffset: { width: 2, height: 2 }, // Desplazamiento de la sombra
    textShadowRadius: 10, // Radio de la sombra
  },
  sectionTitle2: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black', // Azul oscuro
    marginTop: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Sombra de texto
    textShadowOffset: { width: 2, height: 2 }, // Desplazamiento de la sombra
    textShadowRadius: 10, // Radio de la sombra
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 50,
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: 200,
    height: 60,
    backgroundColor: '#AA9E70',
    top: 30,
  },
  buttonText: {
    fontSize: 24,
    color: '#0a0a0a',
    textAlign: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: "italic",
    fontFamily: "Arial",
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 8,
    borderRadius: 15,
    padding: 10,
    width: 200,
    right: 50,
    top: 20,
  },
  input2: {
    height: 50,
    margin: 12,
    borderWidth: 8,
    borderRadius: 15,
    padding: 10,
    width: 200,
    left: 50,
    top: 20,
  },
  subt: {
    fontWeight: 'bold',
    fontSize: 18,
    fontStyle: "italic",
    color: "white",
  },
  subt2: {
    fontWeight: 'bold',
    fontSize: 18,
    fontStyle: "italic",
    color: "white",
    top: 60,
    right: 5,
  },
  link: {
    color: '#FA2537',
    textDecorationLine: 'underline',
  }
});

export default App;

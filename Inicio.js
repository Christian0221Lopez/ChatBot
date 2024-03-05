import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Pressable, Alert } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import Gif from 'react-native-gif';


const App = () => {
  const navigation = React.useContext(NavigationContext);  
  const [correo, setCorreo] = useState('');
  const [pass, setPass] = useState('');

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

    const Enter = () =>
    {
      const self = this; // Almacena el valor de 'this' en una variable 'self'
    
      // conexi√≥n con el servidor
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () 
      {
        if (this.readyState == 4 && this.status == 200) 
        {
          // Typical action to be performed when the document is ready:
          console.log(xhttp.responseText);
          if (xhttp.responseText === "1") 
          {
            Alert.alert("El usuario est√° registrado");
    
            // Accede al 'isRegis' a trav√©s de 'self' en lugar de 'this'
            self.setState({ isRegis: true });
          } 
          else if (xhttp.responseText === "0") 
          {
            Alert.alert("Usuario Administrador Encontrado");
            self.setState({ isRegisA: true });
          }
          else 
          {
            Alert.alert("Hubo un error, intenta nuevamente");
          }
        }
      };
      xhttp.open("GET","https://myapp2023ti.000webhostapp.com/datos/Access.php?codigo=" + self.state.codigo + "&password=" + self.state.password, true);
      xhttp.send();
    }

    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Chat Bot</Text>
        <View>
          <Image
            source={require('./Imagenes/giphy.gif')}
            style={styles.image}
          />
        </View>
        <TextInput  
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 }}
        onChangeText={handleCorreoChange}
        value={correo}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        />
      <TextInput  
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 }}
        onChangeText={handlePassChange}
        value={pass}
        placeholder="Contraseña"
        secureTextEntry={true}

        />
        <Pressable onPress={MenuEnt} style={styles.button}>
          <Text style={styles.buttonText}>Iniciar sesion</Text>
        </Pressable>
      </View>
    );
  }


const styles = StyleSheet.create({
  sectionContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
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

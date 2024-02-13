import { StyleSheet, Text, View, Image} from 'react-native';
import React, { Component } from 'react';
import { Button } from 'react-native-elements';

export default class App extends Component {
  render() {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Chat Bot</Text>
        <View>
          <Image
            source={require('./Imagenes/Chat.png')}
            style={styles.image}
          />
        </View>
        <Button
          title="Iniciar sesion"
          buttonStyle={styles.ButtonSign}
          titleStyle={styles.ButtonText}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 80,
    fontWeight: '900',
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 200,
    marginTop: 10,
    alignItems: 'center',
  },
  ButtonSign: {
    backgroundColor: 'blue', // Color de fondo del botón
    marginTop: 20,
  },
  ButtonText: {
    fontSize: 24,
    color: 'black', // Color del texto del botón
  },
});


import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Pressable, Image, ImageBackground} from 'react-native';
import OpenAI from "openai";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const api_key = "your_api_here";
  const openai = new OpenAI({ apiKey: api_key });

// Función para enviar la solicitud al chatbot y obtener la respuesta
async function gptRequest(api_key, messagesText) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api_key}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      max_tokens: 100,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: messagesText
        }
      ]
    })
  });

  const data = await res.text();
  const parsedData = JSON.parse(data);
  const content = parsedData.choices[0].message.content;

  return content; // Devolver el contenido de la respuesta
}

  
  
// Función para manejar el envío de mensajes y la respuesta del chatbot
const handleSendMessage = async () => {
  if (inputText.trim() !== '') {
    // Agregar el mensaje del usuario al estado de mensajes
    const userMessage = { id: Math.random().toString(), text: inputText, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Limpiar el campo de entrada de texto
    setInputText('');

    // Enviar el mensaje al chatbot y obtener la respuesta
    const response = await gptRequest(api_key, inputText);
    
    // Agregar la respuesta del chatbot al estado de mensajes
    const botMessage = { id: Math.random().toString(), text: response, sender: 'bot' };
    setMessages(prevMessages => [...prevMessages, botMessage]);
  }
};


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <ImageBackground 
      source={require('./Imagenes/Image/menufond.jpeg')}
      style={StyleSheet.absoluteFillObject}>
    <View style={styles.container}>
      {/* Contenedor del título y menú */}
      <View style={styles.headerContainer}>
        {/* Título */}
        <Image
          source={require('./Imagenes/Image/msg.png')}
          style={styles.menuIcon}
        />
        <View style={styles.header}>
          <Text style={styles.headerText}>OpenAi ChatBot</Text>
        </View>
        {/* Menú lateral derecho */}
        <View style={styles.sideMenu}>
          <Pressable onPress={toggleMenu}>
            <Image
              source={require('./Imagenes/Image/menu.png')}
              style={styles.menuIcon}
            />
          </Pressable>
          {/* Contenido del menú lateral */}
          {menuOpen && (
            <View style={styles.menuContent}>
              <Text>Cerrar Sesion</Text>
              <Text>
                Personalizar
              </Text>
              <Text>Configuracion</Text>
            </View>
          )}
        </View>
      </View>
      
      {/* Contenido principal */}
      <View style={styles.content}>
        <ScrollView 
          style={styles.chatBox}
          contentContainerStyle={styles.chatContentContainer}
          ref={(ref) => { this.scrollView = ref; }}
          onContentSizeChange={() => {        
            this.scrollView.scrollToEnd({ animated: true });
          }}
        >
          {messages.map(message => (
            <View key={message.id} style={[styles.messageContainer, message.sender === 'user' ? styles.userMessage : styles.botMessage]}>
              <Text style={styles.message}>{message.text}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Escribe tu mensaje..."
            placeholderTextColor="white"
            placeholderStyle={{ fontSize: 28, color: '#333',fontWeight: 'bold'}}
          />
          <Pressable onPress={handleSendMessage}>
            <Image 
            source={require('./Imagenes/Image/enviar-mensaje.png')}
            style={styles.Enviar}
            />
          </Pressable>
        </View>
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 20,
  },
  header: {
    flex: 1,
  },
  headerText: {
    fontSize: 18,
  },
  sideMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: '#666', // Color oscuro para el icono del menú
    marginLeft: 10,
  },
  menuContent: {
    position: 'absolute',
    top: 40,
    right: 10,
    width: 150,
    backgroundColor: '#fff',
    elevation: 5, // Sombra en Android
    zIndex: 999, // Importante para superponer el contenido sobre otros elementos
  },
  content: {
    flex: 1,
    padding: 20,
  },
  chatBox: {
    flex: 1,
  },
  chatContentContainer: {
    flexGrow: 1,
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#61BFF2',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#6191F2',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  message: {
    padding: 10,
    fontSize: 16,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    borderRadius: 20,
    color: 'white',
  },
  Enviar: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default ChatScreen;
// En ListaScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ListView } from 'react-native';
import DB from './DB';

const ListaScreen = () => {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const db = new DB();
    const data = db.llenarLv();
    setLista(data);
  }, []);

  return (
    <View>
      <ListView
        dataSource={lista}
        renderRow={(rowData) => <Text>{rowData}</Text>}
      />
    </View>
  );
};

export default ListaScreen;


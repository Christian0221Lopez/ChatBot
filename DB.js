import SQLite from 'react-native-sqlite-storage';

class DB {
  constructor() {
    this.db = SQLite.openDatabase({ name: 'Prueba' });
    this.createTable();
  }

  createTable() {
    this.db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS datos (nombre TEXT, apellido TEXT)',
        [],
        () => console.log('Tabla creada correctamente'),
        (_, error) => console.log('Error al crear la tabla', error)
      );
    });
  }

  guardar(nombre, apellido) {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO datos (nombre, apellido) VALUES (?, ?)',
          [nombre, apellido],
          (_, result) => resolve('Ingresado Correctamente'),
          (_, error) => reject('No Ingresado')
        );
      });
    });
  }

buscarReg(buscar) {
  return new Promise((resolve, reject) => {
    this.db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM datos WHERE nombre = ?',
        [buscar],
        (_, result) => {
          if (result.rows.length > 0) {
            const { nombre, apellido } = result.rows.item(0);
            resolve([nombre, apellido, 'Encontrado']);
          } else {
            resolve([null, null, `No se encontr— a ${buscar}`]);
          }
        },
        (_, error) => reject(`Error al buscar: ${error}`)
      );
    });
  });
}


  eliminar(nombre) {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM datos WHERE nombre = ?',
          [nombre],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve('Eliminado Correctamente');
            } else {
              reject('No existe');
            }
          },
          (_, error) => reject(`Error al eliminar: ${error}`)
        );
      });
    });
  }

  actualizar(buscar, nuevoNombre, nuevoApellido) {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'UPDATE datos SET nombre = ?, apellido = ? WHERE nombre = ?',
          [nuevoNombre, nuevoApellido, buscar],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve('Actualizado Correctamente');
            } else {
              reject('No Actualizado');
            }
          },
          (_, error) => reject(`Error al actualizar: ${error}`)
        );
      });
    });
  }

  llenarLv() {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM datos',
          [],
          (_, result) => {
            let lista = [];
            for (let i = 0; i < result.rows.length; i++) {
              lista.push(result.rows.item(i).nombre);
            }
            resolve(lista);
          },
          (_, error) => reject(`Error al llenar lista: ${error}`)
        );
      });
    });
  }
}

export default DB;


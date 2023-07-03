import { ipcMain } from "electron";
import Datastore from "nedb";

const usersDB = new Datastore({
  filename: "./src/main/DataBase/users.db",
  autoload: true,
});
const productsDB = new Datastore({
  filename: "./src/main/DataBase/products.db",
  autoload: true,
});

export const registerIpc = () => {
  ipcMain.handle("register", (event, args) => {
    return new Promise((resolve, reject) => {
      usersDB.find({ email: args.email }, (err, docs) => {
        if (err) {
            reject(err);
            return;
        }
        if (docs.length > 0) {
            reject("User already exists");
            return;
        }
        usersDB.insert(args, (err, doc) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(doc);
        });
      });
    });
  });
};

export const loginIpc = () => {
  ipcMain.handle("login", (event, args) => {
    return new Promise((resolve, reject) => {
      usersDB.find({ email: args.email }, (err, docs) => {
        if (err) {
          reject(err);
          return;
        }
        if (docs.length === 0) {
          reject("Usuario no encontrado");
          return;
        }
        if (docs[0].password !== args.password) {
          reject("Contraseña incorrecta");
          return;
        }
        resolve(docs[0]);
      });
    });
  });
}


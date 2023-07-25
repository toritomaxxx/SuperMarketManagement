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
const salesDB = new Datastore({
  filename: "./src/main/DataBase/sales.db",
  autoload: true,
});
const reportsDB = new Datastore({
  filename: "./src/main/DataBase/reports.db",
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

export const getUsersIpc = () => {
  ipcMain.handle("get-users", (event, args) => {
    return new Promise((resolve, reject) => {
      usersDB.find({}, (err, docs) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(docs);
      });
    });
  });
};

export const createProductIpc = () => {
  ipcMain.handle("create-product", (event, args) => {
    return new Promise((resolve, reject) => {
      productsDB.find({ nameProduct: args.nameProduct }, (err, docs) => {
        if (err) {
          reject(err);
          return;
        }
        if (docs.length > 0) {
          reject("Product already exists");
          return;
        }
      });
      productsDB.find({ codBar: args.codBar }, (err, docs) => {
        if (err) {
          reject(err);
          return;
        }
        if (docs.length > 0) {
          reject("Product already exists");
          return;
        }
      });

      productsDB.insert(args, (err, doc) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(doc);
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
};

export const getProductsIpc = () => {
  ipcMain.handle("get-products", (event, args) => {
    return new Promise((resolve, reject) => {
      productsDB.find({}, (err, docs) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(docs);
      });
    });
  });
};

export const deleteProductIpc = () => {
  ipcMain.handle("delete-product", (event, args) => {
    return new Promise((resolve, reject) => {
      productsDB.remove({ _id: args._id }, (err, docs) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(docs);
      });
    });
  });
};

export const updateProductIpc = () => {
  ipcMain.handle("update-product", (event, args) => {
    return new Promise((resolve, reject) => {
      console.log(args);
      productsDB.update(
        { _id: args._id },
        {
          nameProduct: args.nameProduct,
          codBar: args.codBar,
          price: args.price,
          cant: args.cant,
        },
        (err, docs) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(docs);
        }
      );
    });
  });
};

export const createSaleIpc = () => {
  ipcMain.handle("create-sale", (event, args) => {
    return new Promise((resolve, reject) => {
      salesDB.insert(args, (err, doc) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(doc);
      });
    });
  });
};
export const getSalesIpc = () => {
  ipcMain.handle("get-sales", (event, args) => {
    return new Promise((resolve, reject) => {
      salesDB.find({}, (err, docs) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(docs);
      });
    });
  });
};

export const getReportsIpc = () => {
  ipcMain.handle("get-reports", (event, args) => {
    return new Promise((resolve, reject) => {
      reportsDB.find({}, (err, docs) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(docs);
      });
    });
  });
};

export const createReportIpc = () => {
  ipcMain.handle("create-report", (event, args) => {
    return new Promise((resolve, reject) => {
      reportsDB.insert(args, (err, doc) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(doc);
      });
    });
  });
};

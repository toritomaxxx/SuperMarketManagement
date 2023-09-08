import { ipcMain } from "electron";
import Datastore from "nedb";
const os = require("os");

export const cambiarUbicacionDeBdd = (nameBdd: string) => {
  const platform = os.platform();
  const user = os.userInfo().username;

  if (platform === "win32") {
    return "C:/Users/" + user + "/Documentos/SuperMarketManegerBDD/" + nameBdd;
  } else {
    return "/home/" + user + "/Documents/SuperMarketManegerBDD/" + nameBdd;
  }
};

const usersDB = new Datastore({
  filename: cambiarUbicacionDeBdd("usersDB"),
  autoload: true,
});

const productsDB = new Datastore({
  filename: cambiarUbicacionDeBdd("productsDB"),
  autoload: true,
});

const salesDB = new Datastore({
  filename: cambiarUbicacionDeBdd("salesDB"),
  autoload: true,
});

const reportsDB = new Datastore({
  filename: cambiarUbicacionDeBdd("reportsDB"),
  autoload: true,
});

const medioPagosDB = new Datastore({
  filename: cambiarUbicacionDeBdd("medioPagosDB"),
  autoload: true,
});

export const registerIpc = () => {
  // @ts-ignore
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
  // @ts-ignore
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

export const deleteUserIpc = () => {
  // @ts-ignore
  ipcMain.handle("delete-user", (event, args) => {
    return new Promise((resolve, reject) => {
      usersDB.remove({ _id: args._id }, (err, docs) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(docs);
      });
    });
  });
};

export const updateUserIpc = () => {
  // @ts-ignore
  ipcMain.handle("update-user", (event, args) => {
    return new Promise((resolve, reject) => {
      usersDB.update(
        { _id: args._id },
        {
          name: args.name,
          lastName: args.lastName,
          email: args.email,
          password: args.password,
          confirmPassword: args.confirmPassword,
          isAdmin: args.isAdmin,
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

export const createProductIpc = () => {
  // @ts-ignore
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

        productsDB.insert(args, (err, doc) => {
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
  // @ts-ignore
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
export const loginAdmIpc = () => {
  //@ts-ignore
  ipcMain.handle("loginAdm", (event, args) => {
    return new Promise((resolve, reject) => {
      usersDB.find({ isAdmin: true, password: args.password }, (err, docs) => {
        if (err) {
          reject(err);
          return;
        }
        if (docs.length === 0) {
          reject("Codigo invalido");
          return;
        }
        resolve(docs[0]);
      });
    });
  });
};

export const getProductsIpc = () => {
  // @ts-ignore
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
  // @ts-ignore
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
  // @ts-ignore
  ipcMain.handle("update-product", (event, args) => {
    return new Promise((resolve, reject) => {
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
  // @ts-ignore
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
  // @ts-ignore
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
  // @ts-ignore
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
  // @ts-ignore
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

export const createMedioPagosIpc = () => {
  // @ts-ignore
  ipcMain.handle("create-mediopago", (event, args) => {
    return new Promise((resolve, reject) => {
      medioPagosDB.insert(args, (err, doc) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(doc);
      });
    });
  });
};

export const getMedioPagosIpc = () => {
  // @ts-ignore
  ipcMain.handle("get-mediopagos", (event, args) => {
    return new Promise((resolve, reject) => {
      medioPagosDB.find({}, (err, docs) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(docs);
      });
    });
  });
};

export const deleteMedioPagoIpc = () => {
  // @ts-ignore
  ipcMain.handle("delete-mediopago", (event, args) => {
    return new Promise((resolve, reject) => {
      medioPagosDB.remove({ _id: args._id }, (err, docs) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(docs);
      });
    });
  });
};

export const updateMedioPagoIpc = () => {
  // @ts-ignore
  ipcMain.handle("update-mediopago", (event, args) => {
    return new Promise((resolve, reject) => {
      medioPagosDB.update(
        { _id: args._id },
        {
          label: args.label,
          value: args.value,
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

export const cargarMedioPagosIpc = () => {
  if (
    medioPagosDB.count({}, (err, count) => {
      if (err) {
        return;
      }
      if (count === 0) {
        medioPagosDB.insert({ label: "Efectivo", value: "Efectivo" });
      }
    })
  ) {
  }
};

const bdds = {
  salesDB,
  reportsDB,
  medioPagosDB,
  productsDB,
};

export const buscarPorRangoDeFechaIpc = () => {
  // @ts-ignore
  ipcMain.handle("buscar-por-rango-de-fecha", (event, args) => {
    return new Promise((resolve, reject) => {
      bdds[args.nameBdd].find(
        { [args.fechaCampo]: { $gte: args.fechaI, $lte: args.fechaF } },
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


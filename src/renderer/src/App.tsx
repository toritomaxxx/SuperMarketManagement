import { Context } from "./context/Context";
import Routers from "./routes";
import { AlertComponent } from "./components/AlertasVarias/alertaVarias";
import { useContext } from "react";

export default function App() {
  const { alertas, closeAlerta } = useContext(Context);
  return (
    <>
      {alertas.map((alerta: any) => {
        return (
          <AlertComponent
            key="text"
            open={true}
            onCloseAlert={() => {
              closeAlerta(alerta);
            }}
            severity={alerta.severity}
            text={alerta.text}
          />
        );
      })}
      <Routers />
    </>
  );
}

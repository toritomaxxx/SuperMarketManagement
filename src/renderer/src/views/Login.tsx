import LoginInputs from "../components/loginComponets/LoginInputs";
import "./Login.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/Context";

export default function Login() {
  const navigate = useNavigate();
  const { revisarUsers } = useContext(Context);

  useEffect(() => {
    revisarUsers().then((res) => {
      if (!res) {
        navigate("/register");
      }
      console.log(res);
    });
  }, []);

  return (
    <div className="Login">
      <LoginInputs />
    </div>
  );
}

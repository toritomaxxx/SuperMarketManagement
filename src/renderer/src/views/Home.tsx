import HeaderHome from "../components/homeComponets/headerHome";
import MenuHome from "@renderer/components/homeComponets/menuHome";
export default function Home() {
  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        height: "100vh",
        width: "100vw",

      }}
    >
      <HeaderHome />
      <div
        style={{
          display: "flex",
          
          
          backgroundColor: "#f5f5f5",
        



        }}
          
      >
        <MenuHome />
      </div>
    </div>
  );
}

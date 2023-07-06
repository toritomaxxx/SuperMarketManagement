import HeaderHome from "../components/homeComponets/headerHome";
import MenuHome from "@renderer/components/homeComponets/menuHome";
export default function Home() {
  return (
    <div
        style={{
            width: '100vw',
            flexDirection: "column",
            display: "flex",
        }}
    >
      <HeaderHome />
      <MenuHome />
    </div>
  );
}

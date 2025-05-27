import Hamburguer from "./Hamburger";
import Logo from "./Logo";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <header className=" bg-black flex justify-between p-5 z-50 h-24 items-center w-full sticky">
      <Logo />
      <NavBar />
      <Hamburguer />
    </header>
  );
}

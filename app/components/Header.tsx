import Hamburguer from "./Hamburger";
import Logo from "./Logo";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <header className=" bg-[#ECECEC] flex justify-between p-5 z-50 h-24">
      <Logo />
      <NavBar />
      <Hamburguer />
    </header>
  );
}

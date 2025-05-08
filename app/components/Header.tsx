import Hamburguer from "./Hamburger";
import Logo from "./Logo";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <header className=" mx-5 my-5 bg-[#D9D9D9] flex justify-between p-5 rounded-xl absolute z-10 inset-2 h-24">
      <Logo />
      <NavBar />
      <Hamburguer />
    </header>
  );
}

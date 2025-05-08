import Logo from "./Logo";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <header className=" m-5 bg-[#D9D9D9] flex justify-between p-5 rounded-xl">
      <Logo />
      <NavBar />
    </header>
  );
}

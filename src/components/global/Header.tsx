import UserAuth from "../auth/UserAuth";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className=" p-2 border-b flex items-center justify-between ">
      <Logo />
      <div className=" flex  gap-4 items-center">
        <UserAuth />
      </div>
    </header>
  );
};

export default Header;

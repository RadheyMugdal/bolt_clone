import UserAuth from "./auth/UserAuth";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className=" p-2 border-b flex items-center justify-between ">
      <Logo />
      <div>
        <UserAuth />
      </div>
    </header>
  );
};

export default Header;

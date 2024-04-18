import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../utils";
import Button from "../../common/Button";
import { layoutPadding } from "../constants";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

const Header = () => {
  const navigate = useNavigate();
  const { loggedUser, setLoggedUser } = useUserContext();

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authRefreshToken");
    setLoggedUser(false);
    navigate("/auth/login");
  };

  const [showSidebar, setShowSidebar] = useState(false);
  useEffect(() => {
    if (showSidebar) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [showSidebar]);

  return (
    <header
      className={`flex justify-between items-center gap-6 min-[480px]:gap-4 ${layoutPadding(
        "py-4"
      )}`}
    >
      <img
        src="/vite.svg"
        alt="logo"
        className="h-[4.5rem] cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      />
      <div className="hidden sm:block">
        <div className="flex items-center gap-6 min-[900px]:gap-4 min-[950px]:gap-6">
          {!loggedUser ? (
            <>
              <Button
                theme="transparent"
                onClick={() => {
                  navigate("/auth/login");
                }}
                size="md"
              >
                Login
              </Button>
              <Button
                theme="primary"
                onClick={() => {
                  navigate("/auth/register");
                }}
                size="md"
              >
                Register
              </Button>
            </>
          ) : (
            <Button theme="primary" onClick={logout} size="md">
              Log Out
            </Button>
          )}
        </div>
      </div>
      <div
        className="p-4 sm:p-6 text-xl sm:hidden text-white cursor-pointer"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <MdClose /> : <GiHamburgerMenu />}
      </div>
    </header>
  );
};

export default Header;

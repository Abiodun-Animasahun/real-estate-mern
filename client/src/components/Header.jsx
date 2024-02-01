import { FaBars, FaSearch, FaTimes } from "react-icons/fa";
import { ToggleLeft, ToggleRight, SunDim, Moon } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../components/DarkModeContext";





export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);



 

  return (
    <div className=" sticky top-0 w-full z-20 animate-none bg-indigo-50">
    <div className={`${isDarkMode && 'dark'}`}>
    <header className={`shadow-md dark:bg-gray-700`}>
      <div className="flex justify-between items-center max-w-6xl p-3 z-20">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex-wrap flex items-center">
            <img
              src="/pictures/humbleH-estate-n.png"
              alt="habbey"
              className="w-20 h-15 sm:hidden md:hidden"
            />
             <img
              src="/pictures/humbleH-estate-n.png"
              alt="habbey"
              className="w-20 h-15 hidden sm:block"
            />
            <span className={`text-slate-900 hidden sm:inline dark:text-gray-300`}>HumbleH</span>
            <span className={`text-indigo-600 hidden sm:inline dark:text-blue-200`}>Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <button onClick={toggleDarkMode}>
            {isDarkMode ? <Moon size={32} weight="duotone" color="white" /> : <SunDim size={32} weight="duotone" />}
          </button>

        <ul className={`flex gap-4 dark:text-gray-100`}>
          {isOpen && (
            <div className=" flex flex-col gap-2">
              <Link to="/">
                <li className="text-slate-700 hover:underline dark:text-gray-100">Home</li>
              </Link>
              <Link to="/about">
                <li className={`text-slate-700 hover:underline dark:text-gray-100`}>About</li>
              </Link>
            </div>
            )
            }
            <div className="hidden gap-2  sm:hidden lg:flex md:flex ">
              <Link to="/">
                <li className={`text-slate-700 hover:underline dark:text-gray-100`}>Home</li>
              </Link>
              <Link to="/about">
                <li className={`text-slate-700 hover:underline dark:text-gray-100`}>About</li>
              </Link>
            </div>
          

          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className={`text-slate-700 text-base hover:underline dark:text-gray-100`}>Sign in</li>
            )}
          </Link>
          
          <button onClick={toggleMenu} className="lg:hidden md:hidden ">
            {isOpen ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </button>
        </ul>
      </div>
    </header>
    </div>
    </div>
    
  );
}
 

import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
    const [prompt, setPrompt] = useState("");
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();
    const path = useLocation().pathname;
    const { user } = useContext(UserContext);

    const toggleMenu = () => setMenu(prev => !prev);

    const handleSearch = () => {
        if (prompt) {
            navigate(`?search=${prompt}`);
        } else {
            navigate("/");
        }
    };

    return (
        <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-black text-white">
            <h1 className="text-lg md:text-xl font-extrabold">
                <Link to="/">Blogosphere</Link>
            </h1>
            {path === "/" && (
                <div className="flex justify-center items-center space-x-0">
                    <input
                        onChange={(e) => setPrompt(e.target.value)}
                        className="outline-none px-3 text-black bg-white rounded-l-xl"
                        placeholder="Search a post"
                        type="text"
                    />
                    <p
                        onClick={handleSearch}
                        className="cursor-pointer p-1 bg-white text-black rounded-r-xl"
                        aria-label="Search"
                    >
                        <BsSearch />
                    </p>
                </div>
            )}
            <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
                {user ? (
                    <>
                        <h3>
                            <Link to="/write">Write</Link>
                        </h3>
                        <div onClick={toggleMenu} aria-label="Toggle Menu">
                            <p className="cursor-pointer relative">
                                <FaBars />
                            </p>
                            {menu && <Menu />}
                        </div>
                    </>
                ) : (
                    <>
                        <h3>
                            <Link to="/login">Login</Link>
                        </h3>
                        <h3>
                            <Link to="/register">Register</Link>
                        </h3>
                    </>
                )}
            </div>
            <div onClick={toggleMenu} className="md:hidden text-lg" aria-label="Toggle Menu">
                <p className="cursor-pointer relative">
                    <FaBars />
                </p>
                {menu && <Menu />}
            </div>
        </div>
    );
};

export default Navbar;

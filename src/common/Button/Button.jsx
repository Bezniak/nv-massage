import {NavLink} from "react-router-dom";
import {handleClick} from "../helpers.js";

const Button = ({content, color}) => {
    return (
        <NavLink to="/book" onClick={handleClick}
                 className="relative group border border-[var(--white)] md:py-2 md:px-6 xs:px-4 xs:py-2 text-[var(--white)] uppercase tracking-wide cursor-pointer overflow-hidden">
            <span className="relative z-10" style={{color}}>
                {content}
            </span>
            <span
                className="absolute inset-0 bg-[var(--active)] w-0 transition-all duration-1000 ease-out group-hover:w-full z-[-1]"></span>
        </NavLink>
    );
};

export default Button;

import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
import useWindowSize from './hooks/useWindowSize';

const Header = ({ title}) => {
    // destructure width from useWindowSize custom hook.
    const { width } = useWindowSize();

    return (
        <header className="Header">
            <h1>{ title }</h1>
            { width < 768 
                ?  <FaMobileAlt />
                : width < 992 ? <FaTabletAlt />
                :<FaLaptop />
            }
        </header>
        )
}

export default Header;

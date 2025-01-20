import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
import { useContext } from 'react';
import DataContext from './context/DataContext';

const Header = ({ title}) => {
    // pass to useContext the context you will be using.
    const { width } = useContext(DataContext);

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

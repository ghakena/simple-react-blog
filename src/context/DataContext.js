import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
// 2 dots as you're getting out of the context folder first before accessing api and hooks folder.
import api from '../api/posts';
import useWindowSize from '../hooks/useWindowSize';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    return (
        <DataContext.Provider value={{

        }}>
            { children }
        </DataContext.Provider>
    )
}

export default DataContext;
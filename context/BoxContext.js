import { createContext, useContext } from 'react';
import {useState} from 'react';

const BoxContext = createContext();

export function BoxProvider({ children }) {
    const [box, setBox] = useState(null);

    const value = { box, setBox };

    return (
        <BoxContext.Provider value={value}>
            {children}
        </BoxContext.Provider>
    );
}

export function useBox() {
    return useContext(BoxContext);
}
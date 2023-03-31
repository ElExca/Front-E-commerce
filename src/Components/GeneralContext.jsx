import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


export const GeneralContext = createContext();


export const GeneralProvider = ({children}) => {

    const navigate = useNavigate();
    const [userSesion, setUserSesion] = useState(() => {
        try {
            const ProductsInLocalStorage = localStorage.getItem('LoginUserSesion')
            return ProductsInLocalStorage ? JSON.parse(ProductsInLocalStorage) : {}
        } catch (error) {
            return {};
        }
    })
    const [loginUser, setLoginUser] = useState(() => {
        try {
            const ProductsInLocalStorage = localStorage.getItem('LoginUser')
            return ProductsInLocalStorage ? JSON.parse(ProductsInLocalStorage) : false
        } catch (error) {
            return false;
        }
    })
    const [token, setToken] = useState(() => {
        try {
            const ProductsInLocalStorage = localStorage.getItem('token')
            return ProductsInLocalStorage ? JSON.parse(ProductsInLocalStorage) : ""
        } catch (error) {
            return "";
        }
    })
    const instance = axios.create();
    instance.defaults.headers.common['Authorization'] = token;
    axios.defaults.headers.common['Authorization'] = token;
    return(




        <GeneralContext.Provider value={{
            setLoginUser,
            setUserSesion,
            setToken,
        }}>
            {children}
        </GeneralContext.Provider>



    )
}
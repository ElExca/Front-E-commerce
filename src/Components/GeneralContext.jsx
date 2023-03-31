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
    
    useEffect(() =>{
        localStorage.setItem("LoginUser", JSON.stringify(loginUser))
    }, [loginUser]);

    useEffect(() =>{
        localStorage.setItem("LoginUserSesion", JSON.stringify(userSesion))
    }, [userSesion]);
    useEffect(() =>{
        localStorage.setItem("token", JSON.stringify(token))
    }, [token]);
    
    const [sneakers, setSneakers] = useState([]);
    const [hodies, setHodies] = useState([]);
    const [tShirts, setTshirts] = useState([]);
    const [item, setItems] = useState([]);
    const [uniqueSections, setUniqueSections] = useState([]);

    const [cartItems, setCartItems] = useState(  () => {
        try {
            const ProductsInLocalStorage = localStorage.getItem('cartProducts')
            return ProductsInLocalStorage ? JSON.parse(ProductsInLocalStorage) : []
        } catch (error) {
            return [];
        }
    });
    console.log(cartItems)

    useEffect(() =>{
        localStorage.setItem("cartProducts", JSON.stringify(cartItems))
    }, [cartItems]);

    const addItemToCart = (item) => {
        const inCart = cartItems.find(
            (itemInCart) => itemInCart.id === item.id
        );

        if(inCart) {

            setCartItems(
                cartItems.map((itemInCart) => {
                    if(itemInCart.id === item.id ) {
                        return {...inCart, amount: inCart.amount + 1}

                    }
                    else return itemInCart
                })
            )
        } else {
            setCartItems([...cartItems, {...item, amount: 1}]);
        }
    }

    const removeItemsToCart = (item) => {
        console.log(item)
        const inCart = cartItems.find(
            (itemInCart) => itemInCart.id === item.id
        )
        console.log(inCart)

        if (inCart.amount === 1) {
            setCartItems(
                cartItems.filter((itemInCart) => itemInCart.id !== item.id)
            )
        } else {
            setCartItems(
                cartItems.map((itemInCart)=>{
                    console.log(itemInCart)
                    if ( itemInCart.id === item.id) {
                        return {...inCart, amount: inCart.amount -1}
                    } else return itemInCart
            }))
        }

    return(




        <GeneralContext.Provider value={{
            setLoginUser,
            setUserSesion,
            setToken,
            delateItem,
            cartItems,
            setCartItems,
        }}>
            {children}
        </GeneralContext.Provider>



    )
}

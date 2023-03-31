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
    }




    const login = async (user) => {
        const {email, password} = user
        await axios
            .post("http://3.238.56.40:8080/login", {email,password})
            .then( async(response) => {
                setToken(response.headers['authorization'])
                await axios({
                    method: 'get',
                    url: `http://3.238.56.40:8080/client/findByEmail?email=${email}`,
                    headers: {'Authorization': `${response.headers['authorization']}`}
                }).then(function (response) {
                    console.log(response.data.data)
                    setUserSesion(response.data.data);
                    setLoginUser(true)
                    navigate("/Home")
                    location.reload()
                }).catch(function (error) {
                    console.log(error);
                });
            }).catch(function (error){
            })
    }

    const createUserPost = async(user) => {
        const { email, lastName, name, password,phone } = user;
        await axios.post("http://3.238.56.40:8080/client/register", { email ,lastName , name, password , phone });
        navigate("/")
    }

    useEffect(() => {
        getProducts();
        console.log((item.map(data => data.type)))
        setUniqueSections([(item.map(data => data.type))]);
    }, []);

    const getProducts = async () => {
        await axios
            .get("http://3.238.56.40:8080/product/list")
            .then(({ data }) =>{
                setItems(data.data)});

    };



    const addItem = async (product) => {
        const { description,name, quantity, price,productTypeId,cakePicture,type } = product;

        await axios.post("http://3.238.56.40:8080/product", { description ,name,price, quantity, productTypeId,cakePicture,type});

        getSneakers()
        getHodies()
        getTShirts()
        ;
    };

    const editItem = async (product) => {
        const { id, description, name, quantity, price } = product;
        await axios
            .put(`http://3.238.56.40:8080/product/${id}`, { description , name, price, quantity });

        getSneakers()
        getHodies()
        getTShirts()
    };
    const delateItem = async (id) => {
        await axios
            .delete(`http://3.238.56.40:8080/product/${id}`)


        getSneakers()
        getHodies()
        getTShirts()
        location.reload()
    };


    return(




        <GeneralContext.Provider value={{
            addItemToCart,
            removeItemsToCart,
            sneakers,
            hodies,
            tShirts,
            login,
            setLoginUser,
            setUserSesion,
            setToken,
            item,
            addItem,
            editItem,
            delateItem,
            cartItems,
            setCartItems,
            createUserPost,
            uniqueSections
        }}>
            {children}
        </GeneralContext.Provider>



    )










}


import {Link} from "react-router-dom";
import styled, { css } from 'styled-components'
import {useContext, useEffect, useState} from "react";
import {GeneralContext} from "../GeneralContext.jsx";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown.js";
import axios from "axios";


export function Menu({back}) {
  const MenuBody = styled.header`
    margin-top: 5px;
  display: flex;
  justify-content: space-between;
  padding: .5%;
  padding-right: 2% ;
  padding-left: 2%;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  background: none;
      z-index: 1;
  
  h1{
    margin-top: 10px;
    a{
      font-family: 'Playfair Display', serif;
      font-style: normal;
      font-weight: 400;
      font-size: 30px;
      color: #FFFFFF;
      text-decoration: none;
      transition: all 0.3s ease;
    }
  }
  .menu {
    width: 25%;
    padding-top: 12px;
    cursor: pointer;
    @media (max-width: 460px) {
      width: 50%;
    }
    transition: all 0.5s ease;
    span {
      border-radius: 5px;
      text-decoration: none;
      font-family: 'Oswald';
      font-style: normal;
      font-size: 18px;
      line-height: 27px;
      color: #ffffffac;
      background: none;
      transition: all 0.3s ease;
    }
    transition: all 0.5s ease;
    ul {
      margin-top: 20px;
      width: 100px;
      display: flex;
      overflow: hidden;
      flex-direction: column;
      height: ${(props) => (props.OpenS ? '100%' : '0%')};
      li {
        width: 100%;
        list-style: none;
        padding: 20px;
        background: black;
        transition: all 0.3s ease;
        a{
          color: #FFFFFF;
          transition: all 0.3s ease;
        }
      }
    }
  }
  a{
    text-decoration: none;
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
    color: #ffffffac;
    border-radius: 10px;
    padding: 1%;
    transition: all 0.3s ease;
    &:hover{
      color: #FFFFFF;
    }
  }
`
const {
        setLoginUser,
    setUserSesion,
    setToken,cartItems,} = useContext(GeneralContext)
    const [productsLength, setProductsLength] = useState(0)

    useEffect(() => {
        setProductsLength(
            cartItems.reduce((previous, current) => previous + current.amount, 0)
        );
    }, [cartItems]);

    const [Select, SetSelect] = useState(false)
    const [OpenS, SetOpenS] = useState(false)
    const handleChange = (value) => {
        SetSelect(value)
        SetOpenS(!OpenS)
    }
    const [item, setItems] = useState([]);
    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        await axios
            .get("http://3.238.56.40:8080/product/list")
            .then(({ data }) => setItems(data.data));

    };
    console.log(item)
    const uniqueSections = [...new Set(item.map(data => data.type))];
    console.log(uniqueSections)


    return (
        <>
            <MenuBody OpenS={OpenS}>
              <h1 className="title"><Link to={"/Home"}>LuxeStreet</Link> </h1>
              <div className="menu">
                  {!Select ? <span onClick={() => SetOpenS(!OpenS)}>Todos <ArrowDropDownIcon/></span> : <span onClick={() => SetOpenS(!OpenS)}>{Select}</span>}
                  <ul>
                      {uniqueSections.map((value)=>(
                          <li onClick={() => handleChange(value)}><Link to={`/${value}`}>{value}</Link></li>
                      ))}
                  </ul>
              </div>
                <Link to={"/"} onClick={() => {
                    setUserSesion([])
                    setLoginUser(false)
                    setToken("")}}>Cerrar Sesion</Link>
                <Link to={"/shopping"}>Carrito de compras {productsLength}</Link>
            </MenuBody>

        </>
    )
}
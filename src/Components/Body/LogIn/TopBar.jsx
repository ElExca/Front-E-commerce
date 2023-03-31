import styled from "styled-components";
import Icon from "../assets/Amazon_logo.svg"
import Icon2 from "../assets/amazon-icon-1.svg"
import {useContext, useEffect, useState} from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Button, IconButton} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import PlaceIcon from '@mui/icons-material/Place';
import PersonIcon from '@mui/icons-material/Person';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import {useNavigate} from "react-router-dom";
import {GeneralContext} from "../GeneralContext.jsx";


const Container = styled.div`
  background: white;
  position: fixed;
  display: flex;
  flex-direction: row;
  width: 100%;
  z-index: 1;
  height: 100px;
  padding-left: 4.5rem;
  align-items: center;
  padding-right: 4.5rem;
  justify-content: space-between;
    .active {
    border-right: 4px solid white;
    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }
  .icon {
    display: flex;
    width: 8.5%;
    max-width: 110px;
    padding-top: 15px;
    @media(max-width: 1214px){
      display: none;
    }
    img {
    }
    .icon2 {
      min-width: 40px;
      margin-left: 30px;
      display: ${(props) => (props.clicked ? "block" : "none")};
      @media(max-width: 1214px){
        display: none;
      }
      img {
      }
    }
  }

  .ContainerDeliver {
    display: flex;
    @media(max-width: 900px){
      display: none;
    }
    .deliverText{
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      h2{
        color: #000;
      }
      a{
        color: #FEAA2B;
      }
    }
  }
  .ContainerPorfile {
    width: 10%;
    display: flex;
    gap: 30%;
    @media(max-width: 700px){
      display: none;
    }
  }
  @media(max-width: 700px){
    justify-content: center;
    padding-left: 6.5rem;
  }
`;

const ContainerSearch = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  height: 100%;
  width: 43%;
  @media(max-width: 1214px){
    width: 60%;
  }
  @media(max-width: 965px){
    width: 70%;
  }
  @media(max-width: 460px){
    width: 90%;
  }
    div{
      width: 15%;
      @media(max-width: 460px){
        width: 50%;
      }
      span{
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
      }
      ul{
        background: none repeat scroll 0 0 #fff;
        display: flex;
        position: absolute;
        overflow: hidden;
        flex-direction: column;
        height: ${(props) => (props.OpenS ? '100%': '0')};
        transition: all 0.3s ease;
        li{
        }
      }
    }
  .textInput{
    background: #F8F8F8;
    height: 40%;
    width: 85%;
    @media(max-width: 460px){
      width: 50%;
    }
  }

`

export function TopBar({click}) {

    const navigate = useNavigate()
    const [Select, SetSelect] = useState(false)
    const [OpenS, SetOpenS] = useState(false)
    const handleChange = (value) => {
        SetSelect(value)
        SetOpenS(!OpenS)
    }

    const options = [
        "Test 1",
        'Test 2',
        'Test 3',
        'Test 4',
    ]
    const {
        setLoginUser,
        setUserSesion,
        setToken,cartItems} = useContext(GeneralContext)
    const [productsLength, setProductsLength] = useState(0)

    useEffect(() => {
        setProductsLength(
            cartItems.reduce((previous, current) => previous +current.amount, 0)
        );
    }, [cartItems]);

    return (

        <>
            <Container clicked={click}>
                <div className="icon">
                    <img src={Icon} alt={Icon}/>
                </div>
                <ContainerSearch OpenS={OpenS}>
                    <div>
                        {!Select ? <span onClick={() => SetOpenS(!OpenS)}>Todos <ArrowDropDownIcon/></span> : <span onClick={() => SetOpenS(!OpenS)}>{Select}</span>}
                        <ul>
                            {options.map((value)=>(
                                <li onClick={() => handleChange(value)}>{value}</li>
                            ))}
                        </ul>
                    </div>
                    <input className='textInput' type='text'/>
                    <IconButton sx={{
                        background: "#FEAA2B",
                        borderRadius: "0",
                        height: "40%",
                        color: "#fff",
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px"
                    }} aria-label="delete" size="small">
                        <SendIcon fontSize="inherit" />
                    </IconButton>
                </ContainerSearch>
                <div className="ContainerDeliver">
                    <IconButton sx={{
                        borderRadius: "0",
                        color: "#FEAA2B",
                    }} aria-label="delete" size="small">
                        <PlaceIcon fontSize="large"/>
                    </IconButton>
                    <div className="deliverText">
                        <h2>Deliver to</h2>
                        <a href='../../../../../../../Downloads#'>Mexico</a>
                    </div>
                </div>
                <div className='ContainerPorfile'>
                    <IconButton sx={{
                        borderRadius: "0",
                        color: "rgba(0, 0, 0, 0.5)",
                    }} aria-label="delete" size="small" onClick={() => navigate("/Shop")}>
                        <LocalGroceryStoreIcon fontSize="large"/>
                        {productsLength}
                    </IconButton>
                    <IconButton sx={{
                        borderRadius: "0",
                        color: "rgba(0, 0, 0, 0.5)",
                    }} aria-label="delete" size="small">
                        <PersonIcon fontSize="large"/>
                    </IconButton>
                </div>
            </Container>
        </>
    )
}
import {Menu} from "../Header/Menu.jsx";
import {Footer} from "../Footer/Footer.jsx";
import HoodShopBody from "../Body/Hoods/HoodShopBody";

export function HoodShop() {
    return (
        <>
            <Menu back={"#0E222B"}></Menu>
            <HoodShopBody></HoodShopBody>
            <Footer></Footer>
        </>
    )
}
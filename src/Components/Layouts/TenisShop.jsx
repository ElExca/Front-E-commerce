import {Menu} from "../Header/Menu.jsx";
import {Footer} from "../Footer/Footer";
import TenisShopBody from "../Body/TenisShop/TenisShopBody";

export function TenisShop() {

    return (
        <>
            <Menu back={"#0E222B"}></Menu>
            <TenisShopBody></TenisShopBody>
            <Footer></Footer>
        </>
    )
}
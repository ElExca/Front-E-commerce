import {Menu} from "../Header/Menu.jsx";
import TenisShopBody from "../Body/TenisShop/TenisShopBody.jsx";
import {Footer} from "../Footer/Footer.jsx";
import ItemBody from "../Body/ProductsPanel/ItemBody";

export function ProductsPanel() {

    return (
        <>
            <Menu back={"#0E222B"}></Menu>
            <ItemBody></ItemBody>
            <Footer></Footer>
        </>
    )
}
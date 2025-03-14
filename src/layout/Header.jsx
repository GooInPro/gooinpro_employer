import {Link} from "react-router-dom";


function Header() {


    return (
        <div>
            <Link
                to="/partTimer/calendar"
            >
            <img src="/G_LOGO_Header.jpeg" alt="logo" />
            </Link>
        </div>
    )
}

export default Header;
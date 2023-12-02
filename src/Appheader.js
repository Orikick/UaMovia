import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './styles.css'
import logo from './media/logo.png'

const Appheader = () => {
    const [displayusername, displayusernameupdate] = useState('');
    const [showmenu, showmenuupdateupdate] = useState(false);
    const usenavigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            showmenuupdateupdate(false);
        } else {
            showmenuupdateupdate(true);
            let username = sessionStorage.getItem('username');
            if (username === '' || username === null) {
                usenavigate('/login');
            } else {
                displayusernameupdate(username);
            }
        }

    }, [location])
    return (
        <div>
            {showmenu &&
                <div className="navbar">

                    <Link className="navbar_link" to={'/'}>Головна</Link>
                    <img className="navbar_logo" src={logo}/>
                    <span className="welcome" >Вітаю <b>{displayusername}</b></span>
                    <Link className="navbar_link" style={{ float: 'right' }} to={'/login'}>Вийти</Link>
                </div>
            }
        </div>
    );
}

export default Appheader;
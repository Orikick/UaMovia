import React from "react";
import inst from './media/instagram.svg'
import tg from './media/telegram.svg'
import facebook from './media/facebook.svg'

const Footer = () => {
    return (
        <div className="footer">
            <h1>Вживай українське</h1>
            <div>
                <a href="https://t.me" target="_blank" rel="noopener noreferrer">
                <img src={tg} alt="Telegram" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img src={inst} alt="Instagram" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img src={facebook} alt="Facebook" />
            </a>
            </div>
            
        </div>
    );
};

export default Footer
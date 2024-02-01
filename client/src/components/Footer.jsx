import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { useContext } from 'react';
import { DarkModeContext } from '../components/DarkModeContext';

export default function Footer() {
    const { isDarkMode} = useContext(DarkModeContext);
  return (
    <div className={isDarkMode && 'dark'}>
        <div className='dark:bg-slate-800 dark:text-gray-300'>
        <p className=' text-base text-center '>copyright&#169; 2024. <span className='font-style: italic'>Animasahun Abiodun Monsur</span></p>
        <ul className='flex flex-row text-center justify-center py-6 gap-8'>
            <li><a href='#'><FaFacebook color='grey'/></a></li>
            <li><a href='#'><FaTwitter color='grey' /></a></li>
            <li><a href='#'><FaInstagram  color="grey"/></a></li>
        </ul>
        </div>
    </div>
  )
}

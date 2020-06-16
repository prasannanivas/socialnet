import React from 'react'

import Header from './Header';
import './Layout.css';
import Footer from './Footer';

export default function Layout({children}){
    console.log(children)
    return(
        <div>
            <Header />
            <main>
            {children}
            </main>    
        </div>
    )
}
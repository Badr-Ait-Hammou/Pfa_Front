
import {useNavigate} from "react-router-dom";

import logo from "../images/restaulogo.svg"
import React, {useEffect} from 'react';
import { Menubar } from 'primereact/menubar';

export default function Header() {
    const navigate = useNavigate();

    const items = [
        {
            label: 'Acceuil',
            icon: 'pi pi-fw pi-user',
            command: () => {navigate('/') }
        },
        {
            label: 'Ville',
            icon: 'pi pi-fw pi-book',
            command: () => {navigate('/education') }
        },
        {
            label: 'Zone',
            icon: 'pi pi-fw pi-verified',
            command: () => {navigate('/certification') }
        },
        {
            label: 'Restaurant',
            icon: 'pi pi-fw pi-slack',
            command: () => {navigate('/projects') }
        },
        {
            label: 'Commandes',
            icon: 'pi pi-spin pi-spinner',
            command: () => {navigate('/experience') }
        },
        {
            label: 'Serie',
            icon: 'pi pi-bolt',
            command: () => {navigate('/services') }
        },


    ];
    const style = {
        backgroundColor: 'rgba(245,243,246,0.88)',
        color: '#230202',
        borderRadius:"20px",
        justifyContent: 'left'
    };


    const end = (
        <img
            alt="logo"
            src={logo}

            width="50"
            //className="p-mr-2"
            className="mr-2"
        />
    );



    return (
        <div>
            <div className="card">
                <Menubar  end={end} style={style}  model={items}  />

            </div>
        </div>
    );

}


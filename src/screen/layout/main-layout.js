import React, { useState } from 'react';
import { useEffect } from 'react'
import './main-layout.css'
import { extendView } from '../../assets/const/const-list';
import { Route, Routes } from 'react-router-dom';
import { getcomponentRouter } from '../../router/router';
import HeaderView from './header/header';
import SideBar from './sidebar/sidebar';
export default function MainLayout({ menu }) {
    const [modules, setModules] = useState([])

    useEffect(() => {
        setModules(menu)
    }, [menu])

    return <div className="main-layout col">
        <HeaderView />
        <div className='main-layout-body row'>
            <SideBar menu={menu} />
            <div className="view col">
                <Routes>
                    {modules.filter(e => modules.every(el => e.id !== el.parentId)).map((prop, key) => <Route
                        path={prop.path ?? prop.link}
                        element={getcomponentRouter(prop.link)}
                        key={key}
                        exact
                    />
                    )}
                    {extendView.map((prop, key) => <Route
                        path={prop.path}
                        element={getcomponentRouter(prop.link)}
                        key={`extend-${key}`}
                        exact
                    />
                    )}
                </Routes>
            </div>
        </div>
    </div>
}
import React, { useEffect } from 'react'
import { useLocation } from 'react-router'

export default function Scrolltotop() {
    const {pathname} = useLocation();

    useEffect(()=>{
        window.scrollTo(0,0);
    },[pathname]);

  return null;
}

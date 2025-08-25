'use client'

import { useEffect } from "react";

export const OnReloadScrollTop = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return null;
}
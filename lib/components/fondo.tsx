"use client";

import { useEffect, useState } from "react";

type CartItem = {
    id?: string;
    name?: string;
    price?: number;
    qty?: number;
    image?: string;
};

export default function BackgroundEffects() {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        // -----------------------------
        // Mouse background effect
        // -----------------------------
        const handleMouseMove = (e: MouseEvent) => {
            const bg = document.querySelector(
                ".bg-dots"
            ) as HTMLElement | null;

            if (!bg) return;

            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;

            bg.style.setProperty("--mouse-x", `${x}%`);
            bg.style.setProperty("--mouse-y", `${y}%`);
        };

        // -----------------------------
        // Cart counter
        // -----------------------------
        const updateCartCount = () => {
            const cart: CartItem[] = JSON.parse(
                localStorage.getItem("ctrl_cart") || "[]"
            );

            const total = cart.reduce(
                (sum, item) => sum + (item.qty || 1),
                0
            );

            setCartCount(total);
        };

        // Inicializar
        updateCartCount();

        // Eventos
        document.addEventListener(
            "mousemove",
            handleMouseMove
        );

        // Cleanup
        return () => {
            document.removeEventListener(
                "mousemove",
                handleMouseMove
            );
        };
    }, []);

    return (
        <>
            <span id="cart-count">
                {cartCount}
            </span>
        </>
    );
}
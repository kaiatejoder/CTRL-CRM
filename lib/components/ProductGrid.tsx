"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Producto } from "@/types/product";

export default function ProductGrid() {
    const [productos, setProductos] = useState<
        Producto[]
    >([]);

    useEffect(() => {
        fetch("/obtenerProductos.html")
            .then(r => r.json())
            .then(setProductos);
    }, []);

    const comprar = (codigo: string) => {
        console.log("comprar", codigo);
    };

    return (
        <div
            id="prod-grid"
            className="row g-4"
        >
            {productos.map(producto => (
                <ProductCard
                    key={producto.codigo}
                    producto={producto}
                    onComprar={comprar}
                />
            ))}
        </div>
    );
}
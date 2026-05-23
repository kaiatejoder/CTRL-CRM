"use client";

import { Producto } from "@/types/product";

type Props = {
    producto: Producto;
    onComprar: (codigo: string) => void;
};

export default function ProductCard({
    producto,
    onComprar,
}: Props) {
    const sinStock = producto.existencias <= 0;

    return (
        <div className="col-md-6 col-lg-4 prod-item">
            <div className="prod-card">
                <div className="prod-thumb">
                    {producto.categoria}
                </div>

                <div className="prod-body d-flex flex-column">
                    <div className="prod-categoria">
                        {producto.categoria}
                    </div>

                    <div className="prod-nombre">
                        {producto.nombre}
                    </div>

                    <p className="prod-desc">
                        {producto.descripcion}
                    </p>

                    <div className="prod-footer mt-auto">
                        <div className="prod-precio">
                            {producto.precio.toFixed(2)}€
                        </div>

                        <button
                            className="btn-add"
                            disabled={sinStock}
                            onClick={() =>
                                onComprar(producto.codigo)
                            }
                        >
                            {sinStock
                                ? "SIN STOCK"
                                : "AÑADIR ↗"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
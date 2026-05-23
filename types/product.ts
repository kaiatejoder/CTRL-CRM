export type Producto = {
  codigo: string;
  nombre: string;
  descripcion: string;
  precio: number;
  existencias: number;
  categoria?: string;
};
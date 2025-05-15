import { product, products } from "../types";
import { isAxiosError } from "axios";
import api from "../lib/axios";

export async function getAllProducts() {
    try {
        const { data } = await api('/products')
        const response = products.safeParse(data)
        if (response.success) {
            return response.data
        }
        throw new Error("Error al validar el esquema de dispositivos");
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return Promise.reject({ status: error.response.status });
        }

        return Promise.reject({ status: 0, message: 'Error de red o desconocido' });
    }
}

export async function getProductById(id: string) {
    try {
        const { data } = await api(`/products/${id}`)
        const response = product.safeParse(data)
        if (response.success) {
            return response.data
        }
        throw new Error("Error al validar el esquema de dispositivos");
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return Promise.reject({ status: error.response.status });
        }

        return Promise.reject({ status: 0, message: 'Error de red o desconocido' });
    }
}
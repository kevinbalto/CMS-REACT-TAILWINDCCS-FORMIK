import React from "react";
import Formulario from "../components/formulario";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditarCliente = () => {

    const [cliente, setCliente] = useState({})

    const [cargando, setCargando] = useState(true)

    const {id} = useParams();

    useEffect(() => {
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)
            } catch (error) {
                console.log(error)
            }
        }
        setTimeout(() => {
            setCargando(!cargando)
        }, 1000);
        
        obtenerClienteAPI()
    }, [])

    return(
        <div>
            {cliente?.nombre ? (
                <>
                    <h1 className="font-black text-4xl text-blue-900">Editar cliente</h1>
                    <p className="mt-3">Llena los siguientes campos para editar la información del cliente</p>
                    <Formulario 
                        cliente={cliente}
                        cargando={cargando}
                    />
                </>
            ): <p className="font-black text-4xl text-blue-900">No hay resultados</p>}
        </div>
    )
}

export default EditarCliente;
import React from "react";
import { Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import Alerta from "./alerta";
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/spinner';

const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string().min(3, 'El nombre es muy corto').max(20, 'El nombre es muy largo').required('El nombre del cliente es requerido'),
        empresa: Yup.string().required('El nombre de la empresa es requerido'),
        email: Yup.string().email('Email no válido').required('El email es requerido'),
        telefono: Yup.number().positive('Número no válido').integer('Número no válido').typeError('Número no válido')
    })

    const handleSubmit = async (valores) => {
        try {
            let respuesta;
            if(cliente.id){
                //editar
                const url = `http://localhost:4000/clientes/${cliente.id}`
                respuesta = await fetch(url, {
                    method: 'PUT',
                    body:JSON.stringify(valores),
                    headers: {
                        'Content-Type' : 'application/json'
                    }
                })
            }else{
                //agregar
                const url = 'http://localhost:4000/clientes'
                respuesta = await fetch(url, {
                    method: 'POST',
                    body:JSON.stringify(valores),
                    headers: {
                        'Content-Type' : 'application/json'
                    }
                })
            }
            await respuesta.json()
            navigate('/clientes')
        } catch (error) {
            console.log(error);
        }
    }

    return(
        cargando ? <Spinner /> : (
            <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
                <h1 className="text-gray-600 font-bold text-xl uppercase text-center">{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>
                <Formik
                    initialValues={{
                        nombre: cliente?.nombre ?? "",
                        empresa: cliente?.empresa ?? "",
                        email: cliente?.email ?? "",
                        telefono: cliente?.telefono ?? "",
                        notas: cliente?.notas ?? ""
                    }}

                    enableReinitialize={true}

                    onSubmit={ async (values, {resetForm}) =>{
                        await handleSubmit(values)

                        resetForm()
                    }}

                    validationSchema={nuevoClienteSchema}
                >
                    {({errors, touched}) => { 
                        return(
                            <Form className="mt-10">
                                <div className="mb-4">
                                    <label className="text-gray-800" htmlFor="nombre">Nombre:</label>
                                    <Field 
                                        className="mt-2 block w-full p-3 bg-gray-100"
                                        type="text"
                                        name="nombre"
                                        id="nombre"
                                        placeholder="Ingresa el nombre del cliente"
                                    />
                                    {errors.nombre && touched.nombre ? (
                                        <Alerta>{errors.nombre}</Alerta>) : null}
                                </div>
                                <div className="mb-4">
                                    <label className="text-gray-800" htmlFor="empresa">Empresa:</label>
                                    <Field 
                                        className="mt-2 block w-full p-3 bg-gray-100"
                                        type="text"
                                        name="empresa"
                                        id="empresa"
                                        placeholder="Ingresa el nombre de la empresa del cliente"
                                    />
                                    {errors.empresa && touched.empresa ? (
                                        <Alerta>{errors.empresa}</Alerta>) : null}
                                </div>
                                <div className="mb-4">
                                    <label className="text-gray-800" htmlFor="email">Correo Electrónico:</label>
                                    <Field 
                                        className="mt-2 block w-full p-3 bg-gray-100"
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Ingresa el correo electrónico del cliente"
                                    />
                                    {errors.email && touched.email ? (
                                        <Alerta>{errors.email}</Alerta>) : null}
                                </div>
                                <div className="mb-4">
                                    <label className="text-gray-800" htmlFor="telefono">Teléfono:</label>
                                    <Field 
                                        className="mt-2 block w-full p-3 bg-gray-100"
                                        type="tel"
                                        name="telefono"
                                        id="telefono"
                                        placeholder="Ingresa el teléfono del cliente"
                                    />
                                    {errors.telefono && touched.telefono ? (
                                        <Alerta>{errors.telefono}</Alerta>) : null}
                                </div>
                                <div className="mb-4">
                                    <label className="text-gray-800" htmlFor="notas">Notas:</label>
                                    <Field 
                                        className="mt-2 block w-full p-3 bg-gray-100 h-40"
                                        as="textarea"
                                        type="text"
                                        name="notas"
                                        id="notas"
                                        placeholder="Notas del cliente"
                                    />
                                </div>
                                <input type="submit" value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'} className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg hover:bg-blue-500"/>
                            </Form>
                    )}}
                </Formik>
            </div>
        )
    )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario;
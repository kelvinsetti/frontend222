import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import Navbar from '../../components/layout/Navbar';
import './criarvenda.css';

const validarPost = yup.object().shape({
    cliente: yup.string().required('O cliente é obrigatório'),
    time: yup.string().required('O time é obrigatório'),
    tamanhoCamiseta: yup
        .string()
        .required('O tamanho da camiseta é obrigatório'),
    cotacaoDolar: yup.string().required('A cotação é obrigatório'),
    precoCusto: yup.string().required('O preço de custo é obrigatório'),
    precoVenda: yup.string().required('O preço de venda é obrigatório'),
});

function Criar() {
    const history = useHistory();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validarPost),
    });

    const addVenda = (valores) =>
        axios
            .post('http://localhost:3000/', valores)
            .then(() => {
                history.push('/');
            })
            .catch(() => {});

    return (
        <div>
            <Navbar />
            <main>
                <div className="card-post">
                    <h1>Criar venda</h1>
                    <div className="line-post" />

                    <div className="card-body-post">
                        <form onSubmit={handleSubmit(addVenda)}>
                            <div className="fields">
                                <labeL>Cliente</labeL>
                                <TextField
                                    fullWidth
                                    required
                                    name="cliente"
                                    {...register('cliente')}
                                />
                                <p className="error-message">
                                    {errors.cliente?.message}
                                </p>
                            </div>

                            <div className="fields">
                                <labeL>Time</labeL>
                                <TextField
                                    fullWidth
                                    required
                                    type="text"
                                    name="time"
                                    {...register('time')}
                                />
                            </div>

                            <div className="fields">
                                <labeL>Tamanho Camiseta</labeL>
                                <TextField
                                    fullWidth
                                    required
                                    type="text"
                                    name="tamanhoCamiseta"
                                    {...register('tamanhoCamiseta')}
                                />
                            </div>

                            <div className="fields">
                                <labeL>Cotação Dolár</labeL>
                                <TextField
                                    fullWidth
                                    required
                                    type="text"
                                    name="cotacaoDolar"
                                    {...register('cotacaoDolar')}
                                />
                            </div>

                            <div className="fields">
                                <labeL>Preço de Custo</labeL>
                                <TextField
                                    fullWidth
                                    required
                                    type="text"
                                    name="precoCusto"
                                    {...register('precoCusto')}
                                />
                            </div>

                            <div className="fields">
                                <labeL>Preço de Venda</labeL>
                                <TextField
                                    fullWidth
                                    required
                                    type="text"
                                    name="precoVenda"
                                    {...register('precoVenda')}
                                />
                            </div>

                            <div className="btn-post">
                                <button type="submit">Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Criar;

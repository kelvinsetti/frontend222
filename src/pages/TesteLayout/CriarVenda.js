import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import Navbar from '../../components/layout/Navbar';
import './criarvenda.css';

import api from '../../services/api';

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

    const { register, handleSubmit } = useForm({
        resolver: yupResolver(validarPost),
    });

    const addVenda = (valores) =>
        api
            .post('/', valores)
            .then(() => {
                history.push('/');
            })
            .catch(() => {});

    return (
        <div>
            <Navbar />
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid
                    item
                    style={{
                        padding: 20,
                        display: 'flex',
                        maxWidth: 960,
                    }}
                >
                    <div className="card-post">
                        <h1>Criar venda</h1>
                        <div className="line-post" />

                        <div className="card-body-post">
                            <form onSubmit={handleSubmit(addVenda)}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    <Grid item xs={12}>
                                        <labeL>Cliente</labeL>
                                        <TextField
                                            fullWidth
                                            required
                                            name="cliente"
                                            {...register('cliente')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <labeL>Time</labeL>
                                        <TextField
                                            fullWidth
                                            required
                                            type="text"
                                            name="time"
                                            {...register('time')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <labeL>Tamanho Camiseta</labeL>
                                        <TextField
                                            fullWidth
                                            required
                                            type="text"
                                            name="tamanhoCamiseta"
                                            {...register('tamanhoCamiseta')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <labeL>Cotação Dolár</labeL>
                                        <TextField
                                            fullWidth
                                            required
                                            type="text"
                                            name="cotacaoDolar"
                                            {...register('cotacaoDolar')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <labeL>Custo</labeL>
                                        <TextField
                                            required
                                            type="text"
                                            name="precoCusto"
                                            {...register('precoCusto')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <labeL>Venda</labeL>
                                        <TextField
                                            fullWidth
                                            required
                                            type="text"
                                            name="precoVenda"
                                            {...register('precoVenda')}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <div className="btn-post">
                                            <button type="submit">
                                                Enviar
                                            </button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Criar;

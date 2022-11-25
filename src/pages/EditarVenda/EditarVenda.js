import React, { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';

import Navbar from '../../components/layout/Navbar';
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

function EditarVenda() {
    const { id } = useParams();
    const [status, setStatus] = React.useState('');
    const history = useHistory();

    const addVenda = (valores) =>
        api
            .put(`/${id}`, { ...valores, statusPedido: status })
            .then(() => {
                console.log('Deu tudo certo');
                history.push('/');
            })
            .catch(() => {
                console.log('DEU ERRADO');
            });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(validarPost),
    });

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const statusList = [
        {
            label: 'Entregue',
            value: 'entregue',
        },
        {
            label: 'Não Entregue',
            value: 'naoentregue',
        },
    ];

    useEffect(() => {
        api.get(`${id}`)
            .then((response) => {
                reset(response.data);
                setStatus(response.data.statusPedido);
            })
            .catch(() => {
                console.log('não puxou os dados da API');
            });
    }, []);

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
                        <h1>Editar Venda</h1>
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
                                        <div className="fields">
                                            <labeL>Cliente</labeL>
                                            <input
                                                type="text"
                                                name="cliente"
                                                {...register('cliente')}
                                            />
                                            <p className="error-message">
                                                {errors.cliente?.message}
                                            </p>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <div className="fields">
                                            <labeL>Time</labeL>
                                            <input
                                                type="text"
                                                name="time"
                                                {...register('time')}
                                            />
                                            <p className="error-message">
                                                {errors.time?.message}
                                            </p>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <div className="fields">
                                            <labeL>Tamanho Camiseta</labeL>
                                            <input
                                                type="text"
                                                name="tamanhoCamiseta"
                                                {...register('tamanhoCamiseta')}
                                            />
                                            <p className="error-message">
                                                {
                                                    errors.tamanhoCamiseta
                                                        ?.message
                                                }
                                            </p>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <div className="fields">
                                            <labeL>Cotação Dolár</labeL>
                                            <input
                                                type="text"
                                                name="cotacaoDolar"
                                                {...register('cotacaoDolar')}
                                            />
                                            <p className="error-message">
                                                {errors.cotacaoDolar?.message}
                                            </p>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <div className="fields">
                                            <labeL>Custo</labeL>
                                            <input
                                                type="text"
                                                name="precoCusto"
                                                {...register('precoCusto')}
                                            />
                                            <p className="error-message">
                                                {errors.precoCusto?.message}
                                            </p>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <labeL>Venda</labeL>
                                        <input
                                            type="text"
                                            name="precoVenda"
                                            {...register('precoVenda')}
                                        />
                                        <p className="error-message">
                                            {errors.precoVenda?.message}
                                        </p>
                                    </Grid>

                                    <Grid item xs={12} md={12}>
                                        <labeL>Status Pedido</labeL>
                                        <TextField
                                            select
                                            value={status}
                                            onChange={handleChange}
                                            id="outlined"
                                        >
                                            {statusList.map((item) => (
                                                <MenuItem value={item.value}>
                                                    {item.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>

                                    <div className="btn-post">
                                        <button type="submit">Enviar</button>
                                    </div>
                                </Grid>
                            </form>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default EditarVenda;

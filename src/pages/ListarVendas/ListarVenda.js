import React, { useState, useEffect } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';

import { QtdGasto } from '../../components/dashboard/TotalGasto';
import { QtdVendas } from '../../components/dashboard/TotalVendas';
import { TotalVendasLucro } from '../../components/dashboard/TotalVendasLucro';
import Navbar from '../../components/layout/Navbar';
import api from '../../services/api';

import './listarvenda.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#00BFFF',
        color: theme.palette.common.black,
        fontSize: 20,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 18,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function Home() {
    const [vendas, setVendas] = useState([]);
    const [loading, setLoading] = useState(true);

    const status = {
        entregue: 'Pedido Entregue',
        naoentregue: 'Aguardando Chegada',
    };

    async function getData() {
        try {
            const response = await api.get('/');
            setVendas(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    function deleteVenda(id) {
        api.delete(`/${id}`);
        setVendas(vendas.filter((venda) => venda._id !== id));
    }

    if (loading) {
        return 'Carregando';
    }

    return (
        <div>
            <Navbar />
            <div className="teste">
                <Container maxWidth={false}>
                    <Grid container spacing={3}>
                        <Grid item md={4} xs={12}>
                            <QtdGasto vendas={vendas} />
                        </Grid>

                        <Grid item md={4} xs={12}>
                            <TotalVendasLucro vendas={vendas} />
                        </Grid>

                        <Grid item md={4} xs={12}>
                            <QtdVendas qtd={vendas.length} />
                        </Grid>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">
                                                Cliente
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                Time
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                Tamanho{' '}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                Cotação{' '}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                Custo{' '}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                Custo{' '}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                Venda{' '}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                Lucro{' '}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                Status{' '}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                Editar{' '}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                Deletar{' '}
                                            </StyledTableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {vendas.map((venda) => (
                                            <StyledTableRow key={venda}>
                                                <StyledTableCell
                                                    align="center"
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {venda.cliente}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {venda.time}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {venda.tamanhoCamiseta}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {(+venda.cotacaoDolar).toLocaleString(
                                                        'en-US',
                                                        {
                                                            style: 'currency',
                                                            currency: 'USD',
                                                        }
                                                    )}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {(+venda.precoCusto).toLocaleString(
                                                        'en-US',
                                                        {
                                                            style: 'currency',
                                                            currency: 'USD',
                                                        }
                                                    )}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {(
                                                        +venda.cotacaoDolar *
                                                        +venda.precoCusto
                                                    ).toLocaleString('pt-BR', {
                                                        style: 'currency',
                                                        currency: 'BRL',
                                                    })}
                                                </StyledTableCell>

                                                <StyledTableCell align="center">
                                                    {(+venda.precoVenda).toLocaleString(
                                                        'pt-BR',
                                                        {
                                                            style: 'currency',
                                                            currency: 'BRL',
                                                        }
                                                    )}
                                                </StyledTableCell>

                                                <StyledTableCell align="center">
                                                    {(
                                                        +venda.precoVenda -
                                                        +venda.precoCusto
                                                    ).toLocaleString('pt-BR', {
                                                        style: 'currency',
                                                        currency: 'BRL',
                                                    })}
                                                </StyledTableCell>

                                                <StyledTableCell align="center">
                                                    {status[venda.statusPedido]}
                                                </StyledTableCell>

                                                <StyledTableCell align="center">
                                                    <Link
                                                        to={{
                                                            pathname: `/editarvenda/${venda._id}`,
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                padding: 8,
                                                                background:
                                                                    '#cececece',
                                                                borderRadius: 100,
                                                            }}
                                                        >
                                                            <EditIcon />
                                                        </div>
                                                    </Link>
                                                </StyledTableCell>

                                                <StyledTableCell align="center">
                                                    <Link to="/">
                                                        <div
                                                            style={{
                                                                padding: 8,
                                                                background:
                                                                    '#cececece',
                                                                borderRadius: 100,
                                                            }}
                                                        >
                                                            <DeleteIcon
                                                                onClick={() =>
                                                                    deleteVenda(
                                                                        venda._id
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </Link>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    );
}

export default Home;

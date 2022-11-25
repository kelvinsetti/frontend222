import React from 'react';

import { Card, CardContent, Grid, Typography } from '@mui/material';

export const QtdGasto = ({ vendas }) => {
    const somaVendas = () => {
        return vendas?.reduce((a, b) => a + +b.cotacaoDolar * +b.precoCusto, 0);
    };

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
                    <Grid item align="center">
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="overline"
                            align="center"
                        >
                            QTD GASTO
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h3"
                            align="center"
                        >
                            {somaVendas().toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            })}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

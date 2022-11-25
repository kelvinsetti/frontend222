import React from 'react';

import { Card, CardContent, Grid, Typography } from '@mui/material';

export const QtdVendas = ({ qtd }) => (
    <Card sx={{ height: '100%' }}>
        <CardContent>
            <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                <Grid item align="center">
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="overline"
                        align="center"
                    >
                        QTD DE VENDAS
                    </Typography>
                    <Typography color="textPrimary" variant="h3">
                        {qtd}
                    </Typography>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

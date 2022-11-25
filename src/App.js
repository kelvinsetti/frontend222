import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* import CriarVenda from './pages/CriarVendas/CriarVenda'; */
import EditarVenda from './pages/EditarVenda/EditarVenda';
import VerVenda from './pages/ListarVendas/ListarVenda';
import CriarVendaTeste from './pages/TesteLayout/CriarVenda';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={VerVenda} />
                <Route path="/criarvenda" component={CriarVendaTeste} />
                <Route path="/editarvenda/:id" component={EditarVenda} />
            </Switch>
        </Router>
    );
}

export default App;

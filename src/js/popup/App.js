import { BrowserRouter, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import Dashboard from './dashboard/Dashboard';
import Login from './login/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path='/' component={Dashboard} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </BrowserRouter>
  );
}
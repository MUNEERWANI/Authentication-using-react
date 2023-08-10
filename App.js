import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useContext } from 'react'; 
import AuthContext from './store/auth-context';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  const authCtx= useContext(AuthContext);
  const isLoggedIn=authCtx.isLoggedIn;

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!isLoggedIn&&(
          <Route path='/auth'>
          <AuthPage />
        </Route>
        )}
        
        <Route path='/profile'>
          {isLoggedIn&&(<UserProfile />)}
          {!isLoggedIn&&(<Redirect to='/auth' /> )}
          
        </Route>
        <Route path='*'> 
        <Redirect to='/' />

        </Route>
      </Switch>
    </Layout>
  );
}

export default App;

import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import CreateQuote from './components/CreateQuote';
import Home from './components/Home';

export const routes = [
    {path:"/",element:<Home />},
    {path:"/create",element:<CreateQuote />},
    {path:"/login",element:<Login />},
    {path:"/signup",element:<SignUp />},
    {path:"/profile",element:<Profile />},
    {path:"/profile/:userId",element:<Profile />}
]
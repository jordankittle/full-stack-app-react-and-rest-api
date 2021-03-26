import { useContext } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { APIContext } from './Context';


const PrivateRoute =  ({children, ...rest}) => {
    const { authenticatedUser } = useContext(APIContext);
    const location = useLocation();
    
    return (
        <Route 
            {...rest}
            render={() => 
                authenticatedUser ? (
                    children
                ) : (
                    <Redirect 
                        to ={
                            {
                                pathname: '/signin',
                                state: { from: location }
                            }
                        }
                    />
                )

            }
        />
    );

};

export default PrivateRoute;
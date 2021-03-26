import { useContext } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { APIContext } from './Context';


const PrivateRoute =  ({component: Component, ...rest}) => {
    const { authenticatedUser } = useContext(APIContext);
    
    return (
        <Route 
            {...rest}
            render={(props) => 
                authenticatedUser ? (
                    <Component {...props}/>
                ) : (
                    <Redirect 
                        to ={
                            {
                                pathname: '/signin',
                                state: { from: props.location.pathname }
                            }
                        }
                    />
                )

            }
        />
    );

};

export default PrivateRoute;
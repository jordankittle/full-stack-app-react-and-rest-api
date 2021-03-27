import { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { APIContext } from '../Context';

const UserSignOut = () => {
    const { actions } = useContext(APIContext);
    useEffect(() => {
        actions.signOut();
    });
    

    return (
    
        <Redirect to='/' />
        
    );
};

export default UserSignOut;
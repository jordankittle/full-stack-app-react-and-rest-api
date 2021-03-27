import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { APIContext } from '../Context';

const UserSignOut = () => {
    const { actions } = useContext(APIContext);
    actions.signOut();

    return (
    
        <Redirect to='/' />
        
    );
};

export default UserSignOut;
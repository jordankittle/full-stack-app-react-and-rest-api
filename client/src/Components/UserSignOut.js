import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { APIContext } from '../Context';


export default () => {
    const { actions } = useContext(APIContext);
    actions.signOut();

    return (
        <Redirect to='/' />
    );
};
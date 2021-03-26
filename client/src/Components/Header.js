import { useContext } from 'react';
import { APIContext } from '../Context';

const Header = () => {

    const { authenticatedUser } = useContext(APIContext);
    console.log(authenticatedUser);

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><a href="/">Courses</a></h1>
                <nav>
                    {
                        authenticatedUser ?
                        <ul className="header--signedin">
                            <li>{`Welcome, ${authenticatedUser.firstName}!`}</li>
                            <li><a href="/signout">Sign Out</a></li>
                        </ul>
                    :
                        <ul className="header--signedout">
                            <li><a href="/signup">Sign Up</a></li>
                            <li><a href="/signin">Sign In</a></li>
                        </ul>
                    }
                </nav>
            </div>                  
        </header>
    );
};

export default Header;
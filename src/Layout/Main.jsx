import { Outlet } from 'react-router-dom';
import NavBar from '../Pages/shared/NavBar';

const Main = () => {
    return (
        <div>
            <div>
                <NavBar></NavBar>
            </div>
            <div className='container mx-auto'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;
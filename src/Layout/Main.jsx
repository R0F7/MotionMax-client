import { Outlet } from 'react-router-dom';
import NavBar from '../Pages/shared/NavBar';
import Footer from '../Pages/shared/Footer';

const Main = () => {
    return (
        <div>
            <div>
                <NavBar></NavBar>
            </div>
            <div className='container mx-auto'>
                <Outlet></Outlet>
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Main;
import Footer from "../Footer/Footer";
import NavBar from "../Header/NavMenu";

const RootLayout = ({children}) => {
    return (
        <>
            <NavBar/>
        
            <main>
                {
                    children
                }
            </main>    
            <Footer/>
        </>
    );
};

export default RootLayout;
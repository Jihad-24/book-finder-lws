import { useState } from 'react';
import BookGrid from '../Components/BookGrid';
import Header from '../Components/Header';
import Navbar from '../Components/Shared/Navbar';

const Layout = () => {

    const [filter, setFilter] = useState({
        keyword: "",
        sortBy: "",
    });
    
    return (
        <>
            <Navbar />
            <main className="my-10 lg:my-14">
                <Header filter={filter} setFilter={setFilter} />
                <BookGrid filter={filter}/>
            </main>
        </>
    );
};

export default Layout;
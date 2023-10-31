import React from 'react';

import ReceiptsCard from '../components/cards/ReceiptsCard'
import SuppliersCard from '../components/cards/SuppliersCard'
import NewReceiptsCard from '../components/cards/NewReceiptsCard'
import '../css/home.css'; // Assurez-vous que le chemin du fichier CSS est correct

const Home = () => {
    return (
            <div className='cards-container'>
                <ReceiptsCard />
                <SuppliersCard />
                <NewReceiptsCard />
                {/* <CustomersCard />
                <QuotesCard /> */}
            </div>
    )
}

export default Home;
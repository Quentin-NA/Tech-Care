import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../../css/allReceiptsView.css'; // Assurez-vous que le chemin du fichier CSS est correct

const AllReceiptsView = () => {
    const [allReceipts, setAllReceipts] = useState([]); // Liste de tous les reçus
    const [filteredReceipts, setFilteredReceipts] = useState([]); // Liste des reçus filtrés
    const [searchText, setSearchText] = useState(''); // État local pour stocker le texte de recherche
    const [currentPage, setCurrentPage] = useState(1); // Page actuelle
    const itemsPerPage = 10; // Nombre de reçus par page

    useEffect(() => {
        const fetchReceipt = async () => {
            try {
                const response = await Axios.get('http://localhost:3001/allreceipts');
                if (response && response.data && response.data.length > 0) {
                    setAllReceipts(response.data);
                    setFilteredReceipts(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchReceipt();
    }, []);

    const findReceipts = () => {
        // Filtrer les reçus en fonction du texte de recherche
        const filteredReceipts = allReceipts.filter((receipt) => {
            const fullName = `${receipt.last_name} ${receipt.first_name}`;
            return fullName.toLowerCase().includes(searchText.toLowerCase());
        });

        // Mettre à jour la liste des reçus filtrés
        setFilteredReceipts(filteredReceipts);
        setCurrentPage(1); // Réinitialiser la page actuelle lors de la recherche
    }

    // Calculer l'indice de début et de fin pour la pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedReceipts = filteredReceipts.slice(startIndex, endIndex);

    return (
        <div>
            <h1>Reçus créés</h1>
            <div className='receipts-table'>
                <input
                    type="text"
                    placeholder='Rechercher un nom'
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                        findReceipts();
                    }}
                />
                {displayedReceipts.map((receipt) => (
                    <div key={receipt.id} className='receipt-card'>
                        <a href={`/receipt/${receipt.id}`}>
                            {receipt.id} - {receipt.last_name} {receipt.first_name}
                        </a>
                    </div>
                ))}
                <div className='pages'>
                    {/* Boutons de pagination */}
                    <button
                        className='change-page-btn'
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        &lt;
                    </button>
                    <button
                        className='change-page-btn'
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={endIndex >= filteredReceipts.length}
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllReceiptsView;

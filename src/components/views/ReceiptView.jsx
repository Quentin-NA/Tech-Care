import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import '../../css/receiptView.css'; // Assurez-vous que le chemin du fichier CSS est correct


const ReceiptView = () => {
    const { id } = useParams();
    const [receipt, setReceipt] = useState(null); // Initialisez avec null

    useEffect(() => {
        const fetchReceipt = async () => {
            try {
                const response = await Axios.get('http://localhost:3001/receipt/' + id);
                if (response && response.data && response.data.length > 0) {
                    setReceipt(response.data);
                    console.log(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchReceipt();
    }, [id]);

    const haveCurrentYear = () => {
        const currentYear = new Date().getFullYear();
        return currentYear;
    }

    const haveCurrentDate= () => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date().toLocaleDateString(undefined, options);
        return formattedDate;
    }
    
    
    return (
        <div className='container'>
            <div className='header'>
                <div className='receipt-date'>
                    <p>Reçu N° {haveCurrentYear()} - {id}</p>
                    <p>Le {haveCurrentDate()}</p>
                </div>
            </div>
            <div className='stakeholders'>
                <div className='stakeholders-details'>
                    <h2>TechCare09</h2>
                    <p>13 Av. de la République</p>
                    <p>09400, Tarascon-surAriège</p>
                    <p>France</p>
                    <p>000000000</p>
                    <p>contact@techcare09.com</p>
                </div>

                <div className='stakeholders-details'>
                    {receipt ? (
                    <div>
                        <h2>{receipt[0].last_name} {receipt[0].first_name}</h2>
                        <p>{receipt[0].phone}</p>
                        <p>{receipt[0].email}</p>
                    </div>
                    ) : (
                    <div>Chargement en cours...</div>
                    )}
                </div>
            </div>

            <div className='receipt-details'>
                <h2>Détails du reçu:</h2>

                {receipt ? (
                    <div>
                        <p>Type d'appareil: {receipt[0].type}</p>
                        <p>Model: {receipt[0].model}</p>
                        <p>Problemes rencontrés: {receipt[0].failure}</p>
                        <p>Estimation du prix: {receipt[0].price}</p>
                        <p>Commentaire: {receipt[0].comment}</p>
                    </div>
                    ) :  
                    <div>Chargement en cours...</div>
                }

            </div>

            <div className='print-btn'>
                <button>Imprimer</button>
                <button>Transformer en devis</button>
                <button>Modifier</button>
            </div>
        </div>
    );
};

export default ReceiptView;

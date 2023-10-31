import React from 'react';

import '../../css/cards/suppliersCard.css'; // Assurez-vous que le chemin du fichier CSS est correct

const ReceiptsCard = () => {
    return (
        <div>
            <div className="ag-courses_item">
                <a href="/newReceipt" className="ag-courses-item_link">
                    <div className="ag-courses-item_bg"></div>
                    <div className="ag-courses-item_title">
                        Fournisseurs
                    </div>
                </a>
            </div>  
        </div>
    )
}



export default ReceiptsCard;



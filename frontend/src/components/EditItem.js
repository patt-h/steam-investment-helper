import React, { useState } from 'react';
import './edititem.css';

const EditItem = ({open, onClose, itemId, itemName, itemMarketHashName, itemBoughtPrice, itemQuantity}) => {
    
    const handleEdit = async () => {
        const formData = {
            id: itemId,
            name: document.getElementById("input-name").value,
            marketHashName: itemMarketHashName,
            boughtPrice: document.getElementById("input-price").value,
            quantity: document.getElementById("input-quantity").value
        }
        
        try {
            const response = await fetch('http://localhost:8080/api/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                window.location.reload();
            } 
            else {
                console.error('Error while sending data:', response.statusText);
            }
        }
        catch (error) {
            console.error('Error while sending data:', error);
        }
    };

    if (!open) {
        return null;
    }

    return (
        <div className="overlay">
        <div className="edit-modal-container">
            <div className="edit-modal-content">
                <h1>Edit item</h1>
                <table className="edit-table-container">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Bought price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" defaultValue={itemName} id="input-name"></input></td>
                            <td><input type="number" defaultValue={itemBoughtPrice} id="input-price"></input></td>
                            <td><input type="number" defaultValue={itemQuantity} id="input-quantity"></input></td>
                        </tr>
                    </tbody>
                </table>
                <div className="button-container">
                    <button className="edit-button" onClick={handleEdit}>Edit</button>
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default EditItem;
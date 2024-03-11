import React, { useState } from 'react';
import './additems.css';

const AddItem = ({open, onClose}) => {
    if (!open) {
        return null;
    }
    return (
        <div className="overlay">
            <div className="modal-container">
                <p onClick={onClose} className="close-modal">X</p>
                <div className="modal-content">
                    <h1>Add items to track</h1>
                    <table id="add-table" className="add-table-container">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Bought price</th>
                                <th>Quantity</th>
                                <th>Link to steam market</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text"></input></td>
                                <td><input type="text"></input></td>
                                <td><input type="text"></input></td>
                                <td><input type="text"></input></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="button-container">
                    <button className="submit-button">Submit</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddItem;
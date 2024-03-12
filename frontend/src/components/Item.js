import React, { useState, useEffect } from 'react';
import FetchData from './FetchData';
import AddItem from './AddItem';
import './table.css';

function Item() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchDataAndProcess = async () => {
      const jsonData = await FetchData();
      setData(jsonData);

      setTimeout(function() {
        jsonData.forEach(item => {
          const itemContainer = document.getElementById(`itemContainer${item.id}`);
          const itemDiv = document.createElement('div');
          itemDiv.classList.add('item');

          const deleteIcon = document.createElement('span');
          deleteIcon.classList.add('material-symbols-outlined');
          deleteIcon.classList.add('delete-icon');
          deleteIcon.classList.add('top-right');
          deleteIcon.textContent = "close";
          deleteIcon.style.display = "none";

          const editIcon = document.createElement('span');
          editIcon.classList.add('material-symbols-outlined');
          editIcon.classList.add('edit-icon');
          editIcon.classList.add('bottom-right');
          editIcon.textContent = "edit";            
          editIcon.style.display = "none";

          const historyIcon = document.createElement('span');
          historyIcon.classList.add('material-symbols-outlined');
          historyIcon.classList.add('history-icon');
          historyIcon.classList.add('top-left');
          historyIcon.textContent = "history";
          historyIcon.style.display = "none";
              
          itemContainer.addEventListener('mouseenter', () => {
            deleteIcon.style.display = 'inline';
            editIcon.style.display = 'inline';
            historyIcon.style.display = 'inline';
          })

          itemContainer.addEventListener('mouseleave', () => {
            deleteIcon.style.display = 'none';
            editIcon.style.display = 'none';
            historyIcon.style.display = 'none';
          })

          itemDiv.appendChild(deleteIcon);
          itemDiv.appendChild(editIcon);
          itemDiv.appendChild(historyIcon);
          itemContainer.appendChild(itemDiv);
        });
      }, 1);
    };
      
    fetchDataAndProcess();
  }, []);

  return (
    <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

    <div>
    <AddItem open={openModal} onClose={() => setOpenModal(false)} />
      <table className="table-container">
        <thead>
          <tr>
            <th>
              <button className="add-button" title="Add new item" onClick={() => setOpenModal(true)}>
                <span className="material-symbols-outlined">
                  <b>add</b>
                </span>
              </button>
            </th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Bought price</th>
            <th>Current price</th>
            <th>Gain / lose</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td id={`itemContainer${item.id}`}>
                <img src={`https://api.steamapis.com/image/item/730/${item.marketHashName}`} style={{ width: '100px', height: 'auto', padding: '0px' }} />
              </td>
              <td><b>{item.name}</b></td>
              <td>{item.quantity}</td>
              <td>{item.boughtPrice}zł</td>
              <td>{sessionStorage.getItem(item.marketHashName)}</td>
              <td style={{backgroundColor: isNaN(parseFloat(sessionStorage.getItem(item.marketHashName))) ? "gray" : item.boughtPrice > parseFloat(sessionStorage.getItem(item.marketHashName)) ? "#e93030" : "#4abf26"}}>
                <b>
                  <span className="profit">
                  {(parseFloat(sessionStorage.getItem(item.marketHashName)) * parseInt(item.quantity)).toFixed(2) - (parseFloat(item.boughtPrice) * parseInt(item.quantity)).toFixed(2)}zł
                  </span>
                </b>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Item;
import React, { useState, useEffect, useRef } from 'react';
import FetchData from './FetchData';
import AddItem from './AddItem';
import EditItem from './EditItem';
import DeleteItem from './DeleteItem';
import ItemHistory from './ItemHistory';
import './table.css';

function Table() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openHistoryModal, setOpenHistoryModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemName, setSelectedItemName] = useState(null);
  const [selectedItemMarketHashName, setSelectedItemMarketHashName] = useState(null);
  const [selectedBoughtPrice, setSelectedBoughtPrice] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(null);
  const totalRef = useRef(null);
  const totalCell = useRef(null);

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
          deleteIcon.title = "Remove this item";
          deleteIcon.textContent = "close";
          deleteIcon.style.display = "none";

          const editIcon = document.createElement('span');
          editIcon.classList.add('material-symbols-outlined');
          editIcon.classList.add('edit-icon');
          editIcon.classList.add('bottom-right');
          editIcon.title = "Edit parameters of this item"
          editIcon.textContent = "edit";            
          editIcon.style.display = "none";

          const historyIcon = document.createElement('span');
          historyIcon.classList.add('material-symbols-outlined');
          historyIcon.classList.add('history-icon');
          historyIcon.classList.add('top-left');
          historyIcon.title ="Check registered price history"
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

          editIcon.addEventListener('click', () => {
            setOpenEditModal(true);
            setSelectedItemId(item.id);
            setSelectedItemName(item.name);
            setSelectedItemMarketHashName(item.marketHashName);
            setSelectedBoughtPrice(item.boughtPrice);
            setSelectedQuantity(item.quantity);
          })

          deleteIcon.addEventListener('click', () => {
            setOpenDeleteModal(true);
            setSelectedItemId(item.id);
            setSelectedItemName(item.name);
          })

          historyIcon.addEventListener('click', () => {
            setOpenHistoryModal(true);
            setSelectedItemMarketHashName(item.marketHashName);
            setSelectedItemId(item.id)
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

  const sumColumn = () => {
    const table = document.getElementById("investments-table");
    
    if (!table) {
      return;
    }

    let total = 0;
    for (let i = 1; i < table.rows.length; i++) {
      const cell = table.rows[i].cells[5];
      if (cell && cell.textContent) {
        total += parseFloat(cell.textContent);
      }
    }

    totalRef.current.textContent = total.toFixed(2);
    totalRef.current.textContent = `${total >= 0 ? '+' : '-'}${Math.abs(total).toFixed(2)}zł`;
    totalCell.current.style.backgroundColor = total > 0 ? 'green' : total < 0 ? 'red' : 'black';
  }

  useEffect(() => {
    sumColumn();
  }, [data]);

  return (
    <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

    <div>
      <AddItem open={openModal} onClose={() => setOpenModal(false)}/>
      <DeleteItem open={openDeleteModal} onClose={() => setOpenDeleteModal(false)} itemId={selectedItemId} itemName={selectedItemName}/>
      <EditItem open={openEditModal} onClose={() => setOpenEditModal(false)} itemId={selectedItemId} itemName={selectedItemName} itemMarketHashName={selectedItemMarketHashName} itemBoughtPrice={selectedBoughtPrice} itemQuantity={selectedQuantity}/>
      <ItemHistory open={openHistoryModal} onClose={() => setOpenHistoryModal(false)} itemMarketHashName={selectedItemMarketHashName} itemId={selectedItemId} data={data}/>
      <table className="table-container" id="investments-table">
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
                  {((parseFloat(sessionStorage.getItem(item.marketHashName)) * parseInt(item.quantity)) - (parseFloat(item.boughtPrice) * parseInt(item.quantity))).toFixed(2)}zł
                  </span>
                </b>
              </td>
            </tr>
          ))}
          <tr>
           <td colSpan="5" className="total-row">Total</td>
           <td ref={totalCell}>
              <b>
                <span ref={totalRef} className="total">
                </span>
              </b>
           </td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Table;
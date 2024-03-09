import React, { useState, useEffect } from 'react';
import './table.css';

function Item() {
  const [data, setData] = useState([]);
  const [steamData, setSteamData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/all');
          const jsonData = await response.json();
          setData(jsonData);

          jsonData.forEach(item => {
            const itemContainer = document.getElementById(`itemContainer${item.id}`);
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');

            const deleteIcon = document.createElement('span');
            deleteIcon.classList.add('material-symbols-outlined');
            deleteIcon.classList.add('delete-icon')
            deleteIcon.classList.add('top-right')
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

          // const steamPromises = jsonData.map(item => 
          // fetch(`http://localhost:8080/api/steam/${item.marketHashName}`)
          //   .then(response => response.json())
          //   .then(data => ({
          //       ...data, 
          //       id: item.id
          //   }))
          // );
          const steamResponse = await Promise.all(steamPromises);
          setSteamData(steamResponse);
          steamResponse.map(item => {
              if (item.lowest_price !== undefined) {
                  item.lowest_price = item.lowest_price.replace(",", ".");
              }
          })

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
  }, []);

  useEffect(() => {
    const combined = data.map(item => {
    const correspondingSecondItem = steamData.find(data => data.id === item.id);
    return { ...item, ...correspondingSecondItem };
      });
      setCombinedData(combined);
    }, [data, steamData]);

  return (
    <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

    <div>
      <table className="table-container">
        <thead>
          <tr>
            <th>
              <button className="add-button" title="Add new item">
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
          {combinedData.map(item => (
            <tr key={item.id}>
              <td id={`itemContainer${item.id}`}>
                <img src={`https://api.steamapis.com/image/item/730/${item.marketHashName}`} style={{ width: '100px', height: 'auto', padding: '0px' }} />
              </td>
              <td><b>{item.name}</b></td>
              <td>{item.quantity}</td>
              <td>{item.boughtPrice.replace(".", ",")}zł</td>
              <td>{item.lowest_price}</td>
              <td id="gainCell">
                <b>
                  {(parseFloat(item.lowest_price) * parseInt(item.quantity)) - (parseFloat(item.boughtPrice) * parseInt(item.quantity))}zł
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

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

          const steamPromises = jsonData.map(item => 
          fetch(`http://localhost:8080/api/steam/${item.marketHashName}`)
            .then(response => response.json())
            .then(data => ({
                ...data, 
                id: item.id
            }))
          );
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
    

    <div>
      <table className="table-container">
        <thead>
          <tr>
            <th></th>
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
              <td>
                  <img src={`https://api.steamapis.com/image/item/730/${item.marketHashName}`} style={{ width: '150px', height: 'auto', padding: '0px' }}/>
              </td>
              <td><b>{item.name}</b></td>
              <td>{item.quantity}</td>
              <td>{item.boughtPrice.replace(".",",")}zł</td>
              <td>{item.lowest_price}</td>
              <td>{(parseFloat(item.lowest_price) * parseInt(item.quantity)) - (parseFloat(item.boughtPrice) * parseInt(item.quantity))}zł</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Item;

const DataFetch = async () => {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
  
      try {
        const response = await fetch('http://localhost:8080/api/all');
        const jsonData = await response.json();
    
        const steamPromises = jsonData.map(item => {
          if (!sessionStorage.getItem(item.marketHashName)) {
            return fetch(`http://localhost:8080/api/steam/${item.marketHashName}`)
              .then(response => response.json())
              .then(data => ({
                ...data,
                id: item.id
              }));
          } 
          else {
            return null;
          }
        });
    
        const steamResponses = await Promise.all(steamPromises.filter(promise => promise !== null));
    
        steamResponses.forEach(item => {
          if (item.lowest_price !== undefined) {
            item.lowest_price = item.lowest_price.replace(",", ".");
          }
        });
    
        const combinedData = jsonData.map(item => {
          const steamItem = steamResponses.find(responseItem => responseItem.id === item.id);
          return {
          ...item,
          ...(steamItem || {})
          };
        });
    
        combinedData.forEach(item => {
          if (!sessionStorage.getItem(item.marketHashName)) {
            sessionStorage.setItem(item.marketHashName, item.lowest_price);
          }
        });
  
        try {
            const response = await fetch(`http://localhost:8080/api/history/date/${todayString}`);
            const itemResponse = await fetch('http://localhost:8080/api/all');
  
            const responseData = await response.json();
            const itemData = await itemResponse.json();
  
            const itemIDs = responseData.map(item => parseInt(item.itemID));
            const IDs = itemData.map(item => item.id);
            const missingIDs = IDs.filter(id => !itemIDs.includes(id));
  
            if (missingIDs.length !== 0) {
              const formData = [];
  
              missingIDs.forEach(id => {
                  const foundItem = itemData.find(item => item.id === id);
                  formData.push({
                      itemID: id,
                      date: todayString,
                      price: parseFloat(sessionStorage.getItem(foundItem.marketHashName))
                  });
              });
              try {
                const secondResponse = await fetch('http://localhost:8080/api/history/addHistory', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(formData)
                });
              }
              catch (error) {
                console.error('Error while sending data:', error);
              }
          }
        }
        catch (error) {
            console.error("Error fetching data: ", error);
        }
  
        return combinedData;
      } 
      catch (error) {
        console.error("Error fetching data: ", error);
        return [];
      }
    };
  
    export default DataFetch;
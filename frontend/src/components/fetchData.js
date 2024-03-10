const fetchData = async () => {
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
  
      return combinedData;
    } 
    catch (error) {
      console.error("Error fetching data: ", error);
      return [];
    }
  };
  
  export default fetchData;
  
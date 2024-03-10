const fetchData = async () => {
    try {
        // Fetch data from DB
        const response = await fetch('http://localhost:8080/api/all');
        const jsonData = await response.json();

        // Fetch prices from Steam for each item in DB
        const steamPromises = jsonData.map(item => 
          fetch(`http://localhost:8080/api/steam/${item.marketHashName}`)
            .then(response => response.json())
            .then(data => ({
                ...data, 
                id: item.id
            }))
          );

          const steamResponse = await Promise.all(steamPromises);
          
          steamResponse.forEach(item => {
            if (item.lowest_price !== undefined) {
                item.lowest_price = item.lowest_price.replace(",", ".");
              }
          })

          const combinedData = jsonData.map((item, index) => ({
              ...item,
              ...steamResponse[index]
          }));

          return combinedData;
    } catch (error) {
        console.error("Error fetching data: ", error);
        return [];
    }
};

export default fetchData;
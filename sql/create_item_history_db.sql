CREATE TABLE item_history (
    historyID INT PRIMARY KEY AUTO_INCREMENT,
    itemID INT NOT NULL,
    date DATE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (itemID) REFERENCES items(id)
);
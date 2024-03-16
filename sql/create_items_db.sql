CREATE TABLE items (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    market_hash_name VARCHAR(255),
    price VARCHAR(255),
    quantity INT,
    PRIMARY KEY (id)
);
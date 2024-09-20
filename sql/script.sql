CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(11) UNIQUE NOT NULL
);

CREATE TABLE carriers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    code INT NOT NULL
);

INSERT INTO carriers (name, code) VALUES ('Vivo', 15);
INSERT INTO carriers (name, code) VALUES ('Tim', 41);
INSERT INTO carriers (name, code) VALUES ('Oi', 31);
INSERT INTO carriers (name, code) VALUES ('Claro', 21);

CREATE TABLE phones (
    id SERIAL PRIMARY KEY,
    client_id INT NOT NULL,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    carrier_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (carrier_id) REFERENCES carriers(id) ON DELETE CASCADE,
    CONSTRAINT unique_client_phone UNIQUE (client_id, phone_number)
);

CREATE TABLE recharges (
    id SERIAL PRIMARY KEY,
    phone_id INT NOT NULL,
    amount DECIMAL(10, 2) CHECK (amount BETWEEN 10.00 AND 1000.00) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (phone_id) REFERENCES phones(id) ON DELETE CASCADE
);
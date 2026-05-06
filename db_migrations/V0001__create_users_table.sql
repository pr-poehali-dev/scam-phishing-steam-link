CREATE TABLE IF NOT EXISTS t_p3297158_scam_phishing_steam_.users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(64) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  country VARCHAR(64) DEFAULT 'Россия',
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);
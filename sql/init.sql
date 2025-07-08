-- Crear ENUM para rol en users
CREATE TYPE rol_enum AS ENUM ('Admin', 'DT', 'Entrenador', 'Jugador', 'Arquero', 'Directivo');

-- Crear ENUM para status en competencies
CREATE TYPE status_enum AS ENUM ('Activa', 'Finalizado');

-- Tabla users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    names VARCHAR(100),
    email VARCHAR(150) UNIQUE NOT NULL,
    password TEXT,
    document VARCHAR(50),
    type_document VARCHAR(20),
    age INTEGER,
    date_birth DATE,
    stature INTEGER,
    weight INTEGER,
    position VARCHAR(20),
    image TEXT,
    rol rol_enum
);

-- Tabla competencies
CREATE TABLE competencies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    category VARCHAR(50),
    status status_enum,
    description TEXT
);

-- Tabla documents
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    document_file TEXT,
    civil_registry TEXT,
    lfb_file TEXT,
    name_user VARCHAR
);

-- Tabla competency_users (tabla pivote)
CREATE TABLE competency_users (
    id SERIAL PRIMARY KEY,
    competency_id INTEGER REFERENCES competencies(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

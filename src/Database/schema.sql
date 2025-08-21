-- ================================
-- Military Asset Management System
-- Schema Definition
-- ================================

-- Drop tables if they exist (to reset schema)
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS assignments CASCADE;
DROP TABLE IF EXISTS transfers CASCADE;
DROP TABLE IF EXISTS assets CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS bases CASCADE;

-- ================================
-- Roles Table
-- ================================
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL, -- e.g., ADMIN, BASE_COMMANDER, LOGISTICS_OFFICER
    description TEXT
);

-- ================================
-- Bases Table
-- ================================
CREATE TABLE bases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    location VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- Users Table
-- ================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
    base_id UUID REFERENCES bases(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- Assets Table
-- ================================
CREATE TABLE assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50), -- e.g., Vehicle, Weapon, Ammunition
    serial_number VARCHAR(100) UNIQUE,
    quantity INT DEFAULT 1 CHECK (quantity >= 0),
    base_id UUID REFERENCES bases(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'AVAILABLE', -- AVAILABLE, ASSIGNED, IN_TRANSFER
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- Assignments Table
-- ================================
CREATE TABLE assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
    assigned_to VARCHAR(100) NOT NULL, -- Could link to a person or unit name
    assigned_by UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
    assignment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expected_return_date TIMESTAMP,
    actual_return_date TIMESTAMP,
    status VARCHAR(50) DEFAULT 'ASSIGNED', -- ASSIGNED, RETURNED, OVERDUE
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- Transfers Table
-- ================================
CREATE TABLE transfers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
    from_base_id UUID NOT NULL REFERENCES bases(id) ON DELETE CASCADE,
    to_base_id UUID NOT NULL REFERENCES bases(id) ON DELETE CASCADE,
    requested_by UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
    approved_by UUID REFERENCES users(id) ON DELETE SET NULL,
    transfer_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, APPROVED, COMPLETED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- Audit Logs Table
-- ================================
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action VARCHAR(50) NOT NULL, -- e.g., ASSET_ASSIGNED, TRANSFER_INITIATED
    entity_type VARCHAR(50) NOT NULL, -- e.g., USER, ASSET, ASSIGNMENT
    entity_id UUID,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    details JSONB, -- Store additional info
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- Sample Roles (Seed Data)
-- ================================
INSERT INTO roles (name, description) VALUES
('ADMIN', 'System Administrator with full access'),
('BASE_COMMANDER', 'Commander of a base with approval rights'),
('LOGISTICS_OFFICER', 'Officer managing assets and transfers');


-- ================================
-- Seed Data for Military Asset Management System
-- ================================

-- Enable pgcrypto (Postgres only, ignore for MySQL)
-- CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ================================
-- Bases
-- ================================
INSERT INTO bases (id, name, location) VALUES
(gen_random_uuid(), 'Alpha Base', 'New Delhi'),
(gen_random_uuid(), 'Bravo Base', 'Mumbai'),
(gen_random_uuid(), 'Charlie Base', 'Bengaluru');

-- ================================
-- Users
-- ================================
-- Passwords here are just placeholders ("admin123" / "commander123" / "logistics123")
-- Replace with bcrypt hashes before production.

INSERT INTO users (id, username, password_hash, name, email, role_id, base_id) 
VALUES
(gen_random_uuid(), 'admin', '$2b$10$VhGd1234567890123456789abcdefghiJklmnopqrsTUVwxYZ', 'System Admin', 'admin@mams.com',
 (SELECT id FROM roles WHERE name='ADMIN'), NULL),

(gen_random_uuid(), 'commander1', '$2b$10$abcdefghiJklmnopqrsTUVwxYZ1234567890123456789VhGd', 'Commander Alpha', 'commander.alpha@mams.com',
 (SELECT id FROM roles WHERE name='BASE_COMMANDER'), (SELECT id FROM bases WHERE name='Alpha Base')),

(gen_random_uuid(), 'logistics1', '$2b$10$qrstuvwxYZabcdefghiJklmnop1234567890123456789VhGd', 'Logistics Officer Alpha', 'logistics.alpha@mams.com',
 (SELECT id FROM roles WHERE name='LOGISTICS_OFFICER'), (SELECT id FROM bases WHERE name='Alpha Base'));

-- ================================
-- Assets
-- ================================
INSERT INTO assets (id, name, type, serial_number, quantity, base_id, status) VALUES
(gen_random_uuid(), 'T-90 Tank', 'Vehicle', 'VEH-001', 5, (SELECT id FROM bases WHERE name='Alpha Base'), 'AVAILABLE'),
(gen_random_uuid(), 'INSAS Rifle', 'Weapon', 'WPN-101', 50, (SELECT id FROM bases WHERE name='Bravo Base'), 'AVAILABLE'),
(gen_random_uuid(), '5.56mm Ammo', 'Ammunition', 'AMM-500', 1000, (SELECT id FROM bases WHERE name='Charlie Base'), 'AVAILABLE');

-- ================================
-- Assignments
-- ================================
INSERT INTO assignments (id, asset_id, assigned_to, assigned_by, expected_return_date, status)
VALUES
(gen_random_uuid(), 
 (SELECT id FROM assets WHERE name='INSAS Rifle' LIMIT 1), 
 'Infantry Unit 21', 
 (SELECT id FROM users WHERE username='logistics1'), 
 NOW() + INTERVAL '30 days',
 'ASSIGNED');

-- ================================
-- Transfers
-- ================================
INSERT INTO transfers (id, asset_id, from_base_id, to_base_id, requested_by, status)
VALUES
(gen_random_uuid(),
 (SELECT id FROM assets WHERE name='5.56mm Ammo' LIMIT 1),
 (SELECT id FROM bases WHERE name='Charlie Base'),
 (SELECT id FROM bases WHERE name='Alpha Base'),
 (SELECT id FROM users WHERE username='commander1'),
 'PENDING');

-- ================================
-- Audit Logs
-- ================================
INSERT INTO audit_logs (id, action, entity_type, entity_id, user_id, details)
VALUES
(gen_random_uuid(), 'ASSET_ASSIGNED', 'ASSET', (SELECT id FROM assets WHERE name='INSAS Rifle' LIMIT 1),
 (SELECT id FROM users WHERE username='logistics1'),
 '{"note": "50 rifles assigned to Infantry Unit 21"}'::jsonb),

(gen_random_uuid(), 'TRANSFER_REQUESTED', 'ASSET', (SELECT id FROM assets WHERE name='5.56mm Ammo' LIMIT 1),
 (SELECT id FROM users WHERE username='commander1'),
 '{"note": "Request to move ammo from Charlie Base to Alpha Base"}'::jsonb);

-- ============================================
-- FARMAINK - ESQUEMA SIMPLIFICADO PARA MARIADB
-- ============================================

-- 1. CREAR BASE DE DATOS
DROP DATABASE IF EXISTS farmalink_db;
CREATE DATABASE farmalink_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE farmalink_db;

-- 2. TABLA USUARIOS
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'client', 'repartidor') NOT NULL DEFAULT 'client',
    phone VARCHAR(20) NULL,
    address TEXT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
) ENGINE=InnoDB;

-- 3. TABLA CATEGORÍAS
CREATE TABLE categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
) ENGINE=InnoDB;

-- 4. TABLA PRODUCTOS
CREATE TABLE products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT UNSIGNED NOT NULL,
    sku VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NULL,
    price DECIMAL(10, 2) NOT NULL,
    cost DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    stock INT NOT NULL DEFAULT 0,
    min_stock INT NOT NULL DEFAULT 10,
    image_url VARCHAR(500) NULL,
    requires_prescription BOOLEAN NOT NULL DEFAULT FALSE,
    dosage VARCHAR(100) NULL,
    active_ingredient VARCHAR(255) NULL,
    laboratory VARCHAR(255) NULL,
    expiration_date DATE NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    
    FOREIGN KEY (category_id) REFERENCES categories(id)
) ENGINE=InnoDB;

-- 5. TABLA PEDIDOS
CREATE TABLE orders (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    user_id BIGINT UNSIGNED NOT NULL,
    delivery_man_id BIGINT UNSIGNED NULL,
    subtotal DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    tax DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    shipping_cost DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    total DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'assigned', 'in_transit', 'delivered', 'cancelled') NOT NULL DEFAULT 'pending',
    payment_method ENUM('cash', 'card', 'transfer') NULL,
    payment_status ENUM('pending', 'paid', 'failed') NOT NULL DEFAULT 'pending',
    prescription_url VARCHAR(500) NULL,
    notes TEXT NULL,
    delivery_address TEXT NOT NULL,
    delivery_phone VARCHAR(20) NOT NULL,
    estimated_delivery TIMESTAMP NULL,
    delivered_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (delivery_man_id) REFERENCES users(id)
) ENGINE=InnoDB;

-- 6. TABLA ORDER_ITEMS
CREATE TABLE order_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) GENERATED ALWAYS AS (quantity * price_at_purchase) STORED,
    notes TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id),
    UNIQUE KEY uk_order_product (order_id, product_id)
) ENGINE=InnoDB;

-- ============================================
-- INSERTAR DATOS DE PRUEBA
-- ============================================

-- USUARIOS (password: 123456 - hash bcrypt)
INSERT INTO users (name, email, password, role, phone, address) VALUES
('Administrador Sistema', 'admin@farmalink.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', '+1 234 567 8900', 'Calle Principal #123'),
('Juan Pérez', 'cliente@gmail.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'client', '+1 234 567 8901', 'Avenida Central #456'),
('Carlos Moto', 'moto1@farmalink.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'repartidor', '+1 234 567 8902', 'Calle Secundaria #789');

-- CATEGORÍAS
INSERT INTO categories (name, slug, description) VALUES
('Medicamentos', 'medicamentos', 'Medicamentos recetados y de venta libre'),
('Cuidado Personal', 'cuidado-personal', 'Productos para higiene personal'),
('Equipos Médicos', 'equipos-medicos', 'Equipos y dispositivos médicos');

-- PRODUCTOS
INSERT INTO products (category_id, sku, name, slug, description, price, stock, requires_prescription, active_ingredient) VALUES
(1, 'MED-001', 'Paracetamol 500mg', 'paracetamol-500mg', 'Analgésico, 20 tabletas', 5.99, 150, FALSE, 'Paracetamol'),
(1, 'MED-002', 'Ibuprofeno 400mg', 'ibuprofeno-400mg', 'Antiinflamatorio, 30 tabletas', 8.50, 120, FALSE, 'Ibuprofeno'),
(1, 'MED-003', 'Amoxicilina 500mg', 'amoxicilina-500mg', 'Antibiótico, 12 cápsulas', 15.75, 80, TRUE, 'Amoxicilina'),
(2, 'CP-001', 'Jabón Antibacterial', 'jabon-antibacterial', 'Jabón líquido 500ml', 3.25, 200, FALSE, NULL),
(2, 'CP-002', 'Alcohol en Gel', 'alcohol-gel', 'Gel antibacterial 250ml', 4.50, 180, FALSE, NULL),
(3, 'EM-001', 'Tensiómetro Digital', 'tensiometro-digital', 'Tensiómetro automático', 45.99, 25, FALSE, NULL);

-- ============================================
-- VERIFICACIÓN
-- ============================================

SELECT '✅ Base de datos FarmaLink creada exitosamente' as Mensaje;

SELECT 
    (SELECT COUNT(*) FROM users) as Total_Usuarios,
    (SELECT COUNT(*) FROM categories) as Total_Categorias,
    (SELECT COUNT(*) FROM products) as Total_Productos;

-- Mostrar datos insertados
SELECT * FROM users;
SELECT * FROM categories;
SELECT * FROM products LIMIT 3;
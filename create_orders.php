<?php
header('Content-Type: text/plain');

$host = 'mysql-kindimanu.alwaysdata.net';
$user = 'kindimanu';
$pass = 'modcom2026';
$db = 'kindimanu_kindisokogarden';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $sql = "CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        product_id INT,
        product_name VARCHAR(255),
        product_description TEXT,
        product_cost DECIMAL(10,2),
        quantity INT DEFAULT 1,
        phone VARCHAR(50),
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    
    $pdo->exec($sql);
    echo "Orders table created successfully!";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
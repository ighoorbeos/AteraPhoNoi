-- ========================================
-- ATERA LANDING PAGE - DATABASE SETUP
-- ========================================

-- Tạo database
CREATE DATABASE IF NOT EXISTS atera_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Sử dụng database
USE atera_db;

-- Tạo user cho ứng dụng (localhost)
CREATE USER IF NOT EXISTS 'atera_user'@'localhost' IDENTIFIED BY 'Atera@2024#Secure';

-- Tạo user cho ứng dụng (remote - nếu cần)
CREATE USER IF NOT EXISTS 'atera_user'@'%' IDENTIFIED BY 'Atera@2024#Secure';

-- Cấp quyền CRUD cho user (localhost)
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX, ALTER, REFERENCES 
ON atera_db.* TO 'atera_user'@'localhost';

-- Cấp quyền CRUD cho user (remote)
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX, ALTER, REFERENCES 
ON atera_db.* TO 'atera_user'@'%';

-- Áp dụng thay đổi
FLUSH PRIVILEGES;

-- Hiển thị kết quả
SELECT 'Database atera_db created successfully!' as Status;
SELECT 'User atera_user created with necessary privileges!' as Status;

-- Kiểm tra database
SHOW DATABASES LIKE 'atera_db';

-- Kiểm tra user
SELECT user, host, 
  IF(Select_priv='Y', 'SELECT ', '') as SELECT_priv,
  IF(Insert_priv='Y', 'INSERT ', '') as INSERT_priv,
  IF(Update_priv='Y', 'UPDATE ', '') as UPDATE_priv,
  IF(Delete_priv='Y', 'DELETE ', '') as DELETE_priv
FROM mysql.user 
WHERE user = 'atera_user';

-- Hiển thị quyền của user
SHOW GRANTS FOR 'atera_user'@'localhost';
SHOW GRANTS FOR 'atera_user'@'%';

SELECT '========================================' as '';
SELECT 'SETUP COMPLETED!' as Status;
SELECT '========================================' as '';
SELECT 'Database: atera_db' as Info;
SELECT 'Username: atera_user' as Info;
SELECT 'Password: Atera@2024#Secure' as Info;
SELECT 'Next step: Run Spring Boot backend' as Info;
SELECT 'Command: mvn spring-boot:run' as Info;
SELECT '========================================' as '';

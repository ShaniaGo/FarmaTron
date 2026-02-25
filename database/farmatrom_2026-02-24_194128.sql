-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: farmatrom
-- ------------------------------------------------------
-- Server version	12.1.2-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `calificaciones`
--

DROP TABLE IF EXISTS `calificaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calificaciones` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `pedido_id` bigint(20) unsigned NOT NULL,
  `cliente_id` bigint(20) unsigned NOT NULL,
  `farmacia_id` bigint(20) unsigned NOT NULL,
  `repartidor_id` bigint(20) unsigned DEFAULT NULL,
  `puntuacion_farmacia` tinyint(4) DEFAULT NULL,
  `puntuacion_repartidor` tinyint(4) DEFAULT NULL,
  `comentario` text DEFAULT NULL,
  `fecha_calificacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `calificaciones_pedido_id_unique` (`pedido_id`),
  KEY `calificaciones_cliente_id_foreign` (`cliente_id`),
  KEY `calificaciones_farmacia_id_foreign` (`farmacia_id`),
  KEY `calificaciones_repartidor_id_foreign` (`repartidor_id`),
  CONSTRAINT `calificaciones_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `calificaciones_farmacia_id_foreign` FOREIGN KEY (`farmacia_id`) REFERENCES `farmacias` (`id`),
  CONSTRAINT `calificaciones_pedido_id_foreign` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`),
  CONSTRAINT `calificaciones_repartidor_id_foreign` FOREIGN KEY (`repartidor_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calificaciones`
--

/*!40000 ALTER TABLE `calificaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `calificaciones` ENABLE KEYS */;

--
-- Table structure for table `carrito_compras`
--

DROP TABLE IF EXISTS `carrito_compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito_compras` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `cliente_id` bigint(20) unsigned NOT NULL,
  `farmacia_id` bigint(20) unsigned NOT NULL,
  `stock_farmacia_id` bigint(20) unsigned NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1,
  `fecha_agregado` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_cliente_producto` (`cliente_id`,`stock_farmacia_id`),
  KEY `carrito_compras_farmacia_id_foreign` (`farmacia_id`),
  KEY `carrito_compras_stock_farmacia_id_foreign` (`stock_farmacia_id`),
  CONSTRAINT `carrito_compras_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `carrito_compras_farmacia_id_foreign` FOREIGN KEY (`farmacia_id`) REFERENCES `farmacias` (`id`),
  CONSTRAINT `carrito_compras_stock_farmacia_id_foreign` FOREIGN KEY (`stock_farmacia_id`) REFERENCES `stock_farmacia` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito_compras`
--

/*!40000 ALTER TABLE `carrito_compras` DISABLE KEYS */;
INSERT INTO `carrito_compras` VALUES (1,2,1,2,1,'2026-02-21 15:51:27','2026-02-21 15:51:27','2026-02-21 15:51:27'),(4,1,1,3,2,'2026-02-21 17:59:59','2026-02-21 17:59:59','2026-02-21 18:00:03');
/*!40000 ALTER TABLE `carrito_compras` ENABLE KEYS */;

--
-- Table structure for table `categoria_medicamentos`
--

DROP TABLE IF EXISTS `categoria_medicamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria_medicamentos` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `icono` varchar(50) DEFAULT NULL,
  `orden` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_medicamentos`
--

/*!40000 ALTER TABLE `categoria_medicamentos` DISABLE KEYS */;
INSERT INTO `categoria_medicamentos` VALUES (1,'Analgésicos','Medicamentos para el dolor','fa-pills',1,'2026-02-21 15:49:40','2026-02-21 15:49:40'),(2,'Antibióticos','Para infecciones bacterianas','fa-bacteria',2,'2026-02-21 15:49:40','2026-02-21 15:49:40'),(3,'Antigripales','Para resfriados y gripes','fa-head-side-cough',3,'2026-02-21 15:49:40','2026-02-21 15:49:40'),(4,'Vitaminas','Suplementos vitamínicos','fa-apple-alt',4,'2026-02-21 15:49:40','2026-02-21 15:49:40'),(5,'Cuidado Personal','Productos de higiene','fa-hand-sparkles',5,'2026-02-21 15:49:40','2026-02-21 15:49:40');
/*!40000 ALTER TABLE `categoria_medicamentos` ENABLE KEYS */;

--
-- Table structure for table `farmacias`
--

DROP TABLE IF EXISTS `farmacias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `farmacias` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `direccion` text NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `horario_apertura` time NOT NULL DEFAULT '08:00:00',
  `horario_cierre` time NOT NULL DEFAULT '22:00:00',
  `latitud` decimal(10,8) DEFAULT NULL,
  `longitud` decimal(11,8) DEFAULT NULL,
  `estado` enum('abierta','cerrada','en_mantenimiento') NOT NULL DEFAULT 'abierta',
  `rating` decimal(3,2) NOT NULL DEFAULT 0.00,
  `tiempo_entrega_promedio` int(11) NOT NULL DEFAULT 30,
  `costo_envio_base` decimal(6,2) NOT NULL DEFAULT 5.00,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farmacias`
--

/*!40000 ALTER TABLE `farmacias` DISABLE KEYS */;
INSERT INTO `farmacias` VALUES (1,'FarmaLink Express','Av. Libertador, Chacao, Caracas','02121234567','contacto@farma-link.com',NULL,'08:00:00','22:00:00',10.48059400,-66.90360600,'abierta',4.50,30,3.50,'2026-02-21 11:49:40','2026-02-21 15:49:40','2026-02-21 15:49:40'),(2,'FarmaLink Plaza Venezuela','Plaza Venezuela, Caracas','02127654321','plazavenezuela@farma-link.com',NULL,'24:00:00','24:00:00',10.49274100,-66.88831200,'abierta',4.20,25,4.00,'2026-02-21 11:49:40','2026-02-21 15:49:40','2026-02-21 15:49:40');
/*!40000 ALTER TABLE `farmacias` ENABLE KEYS */;

--
-- Table structure for table `medicamentos`
--

DROP TABLE IF EXISTS `medicamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicamentos` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `codigo_barras` varchar(50) DEFAULT NULL,
  `nombre_comercial` varchar(150) NOT NULL,
  `nombre_generico` varchar(150) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `fabricante` varchar(100) DEFAULT NULL,
  `categoria_id` bigint(20) unsigned DEFAULT NULL,
  `subcategoria` varchar(100) DEFAULT NULL,
  `forma_farmaceutica` enum('tableta','capsula','jarabe','inyectable','crema','ungüento','supositorio','gotas','inhalador','parche','otro','tableta efervescente','unidad','gel') NOT NULL,
  `concentracion` varchar(100) DEFAULT NULL,
  `contenido` varchar(100) DEFAULT NULL,
  `requiere_receta` tinyint(1) NOT NULL DEFAULT 0,
  `controlado` tinyint(1) NOT NULL DEFAULT 0,
  `fecha_vencimiento` date DEFAULT NULL,
  `precio_referencia` decimal(10,2) NOT NULL,
  `precio_regular` decimal(10,2) DEFAULT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `medicamentos_codigo_barras_unique` (`codigo_barras`),
  KEY `medicamentos_categoria_id_foreign` (`categoria_id`),
  CONSTRAINT `medicamentos_categoria_id_foreign` FOREIGN KEY (`categoria_id`) REFERENCES `categoria_medicamentos` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicamentos`
--

/*!40000 ALTER TABLE `medicamentos` DISABLE KEYS */;
INSERT INTO `medicamentos` VALUES (1,NULL,'Paracetamol 500mg','Paracetamol',NULL,NULL,1,NULL,'tableta','500mg','20 tabletas',0,0,NULL,2.50,NULL,NULL,1,'2026-02-21 11:49:40','2026-02-21 15:49:40','2026-02-21 15:49:40'),(2,NULL,'Ibuprofeno 400mg','Ibuprofeno',NULL,NULL,1,NULL,'tableta','400mg','24 tabletas',0,0,NULL,3.80,NULL,NULL,1,'2026-02-21 11:49:40','2026-02-21 15:49:40','2026-02-21 15:49:40'),(3,NULL,'Amoxicilina 500mg','Amoxicilina',NULL,NULL,2,NULL,'capsula','500mg','12 cápsulas',1,0,NULL,8.90,NULL,NULL,1,'2026-02-21 11:49:40','2026-02-21 15:49:40','2026-02-21 15:49:40'),(4,NULL,'Vitamina C 500mg','Ácido Ascórbico',NULL,NULL,4,NULL,'tableta','500mg','30 tabletas',0,0,NULL,4.50,NULL,NULL,1,'2026-02-21 11:49:40','2026-02-21 15:49:40','2026-02-21 15:49:40');
/*!40000 ALTER TABLE `medicamentos` ENABLE KEYS */;

--
-- Table structure for table `mensajes`
--

DROP TABLE IF EXISTS `mensajes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mensajes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `pedido_id` bigint(20) unsigned NOT NULL,
  `remitente_id` bigint(20) unsigned NOT NULL,
  `destinatario_id` bigint(20) unsigned NOT NULL,
  `mensaje` text NOT NULL,
  `tipo` enum('texto','imagen','audio','documento') NOT NULL DEFAULT 'texto',
  `archivo_url` varchar(255) DEFAULT NULL,
  `leido` tinyint(1) NOT NULL DEFAULT 0,
  `fecha_envio` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `mensajes_pedido_id_foreign` (`pedido_id`),
  KEY `mensajes_remitente_id_foreign` (`remitente_id`),
  KEY `mensajes_destinatario_id_foreign` (`destinatario_id`),
  CONSTRAINT `mensajes_destinatario_id_foreign` FOREIGN KEY (`destinatario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `mensajes_pedido_id_foreign` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`),
  CONSTRAINT `mensajes_remitente_id_foreign` FOREIGN KEY (`remitente_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensajes`
--

/*!40000 ALTER TABLE `mensajes` DISABLE KEYS */;
/*!40000 ALTER TABLE `mensajes` ENABLE KEYS */;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2026_02_06_225016_create_usuarios_table',1),(2,'2026_02_06_225157_create_farmacias_table',1),(3,'2026_02_06_225315_create_categoria_medicamentos_table',1),(4,'2026_02_06_225316_create_medicamentos_table',1),(5,'2026_02_06_225351_create_stock_farmacia_table',1),(6,'2026_02_06_225445_create_pedidos_table',1),(7,'2026_02_06_225543_create_pedido_detalles_table',1),(8,'2026_02_06_225601_create_seguimiento_pedidos_table',1),(9,'2026_02_06_225613_create_mensajes_table',1),(10,'2026_02_06_225628_create_promociones_table',1),(11,'2026_02_06_225644_create_calificaciones_table',1),(12,'2026_02_06_225703_create_carrito_compras_table',1),(13,'2026_02_07_003732_create_personal_access_tokens_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;

--
-- Table structure for table `pedido_detalles`
--

DROP TABLE IF EXISTS `pedido_detalles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido_detalles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `pedido_id` bigint(20) unsigned NOT NULL,
  `medicamento_id` bigint(20) unsigned NOT NULL,
  `stock_farmacia_id` bigint(20) unsigned NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1,
  `precio_unitario` decimal(10,2) NOT NULL,
  `subtotal_item` decimal(10,2) GENERATED ALWAYS AS (`cantidad` * `precio_unitario`) VIRTUAL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pedido_detalles_pedido_id_foreign` (`pedido_id`),
  KEY `pedido_detalles_medicamento_id_foreign` (`medicamento_id`),
  KEY `pedido_detalles_stock_farmacia_id_foreign` (`stock_farmacia_id`),
  CONSTRAINT `pedido_detalles_medicamento_id_foreign` FOREIGN KEY (`medicamento_id`) REFERENCES `medicamentos` (`id`),
  CONSTRAINT `pedido_detalles_pedido_id_foreign` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `pedido_detalles_stock_farmacia_id_foreign` FOREIGN KEY (`stock_farmacia_id`) REFERENCES `stock_farmacia` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_detalles`
--

/*!40000 ALTER TABLE `pedido_detalles` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedido_detalles` ENABLE KEYS */;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `numero_pedido` varchar(20) NOT NULL,
  `cliente_id` bigint(20) unsigned NOT NULL,
  `farmacia_id` bigint(20) unsigned NOT NULL,
  `repartidor_id` bigint(20) unsigned DEFAULT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `descuento` decimal(10,2) NOT NULL DEFAULT 0.00,
  `costo_envio` decimal(6,2) DEFAULT NULL,
  `impuestos` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `direccion_entrega` text NOT NULL,
  `telefono_contacto` varchar(20) DEFAULT NULL,
  `latitud_entrega` decimal(10,8) DEFAULT NULL,
  `longitud_entrega` decimal(11,8) DEFAULT NULL,
  `instrucciones_entrega` text DEFAULT NULL,
  `fecha_entrega_estimada` datetime DEFAULT NULL,
  `fecha_entrega_real` datetime DEFAULT NULL,
  `estado` enum('carrito','pendiente','confirmado','en_preparacion','listo_recojo','asignado_repartidor','en_camino','llegando','entregado','cancelado','rechazado') NOT NULL DEFAULT 'carrito',
  `motivo_cancelacion` text DEFAULT NULL,
  `metodo_pago` enum('efectivo','pago movil','divisa','transferencia') NOT NULL DEFAULT 'efectivo',
  `estado_pago` enum('pendiente','pagado','fallido','reembolsado') NOT NULL DEFAULT 'pendiente',
  `comprobante_pago_url` varchar(255) DEFAULT NULL,
  `codigo_seguimiento` varchar(50) DEFAULT NULL,
  `fecha_pedido` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pedidos_numero_pedido_unique` (`numero_pedido`),
  KEY `pedidos_cliente_id_foreign` (`cliente_id`),
  KEY `pedidos_farmacia_id_foreign` (`farmacia_id`),
  KEY `pedidos_repartidor_id_foreign` (`repartidor_id`),
  CONSTRAINT `pedidos_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `pedidos_farmacia_id_foreign` FOREIGN KEY (`farmacia_id`) REFERENCES `farmacias` (`id`),
  CONSTRAINT `pedidos_repartidor_id_foreign` FOREIGN KEY (`repartidor_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\Usuario',2,'auth_token','043aaebe626ab25bb4ccb70395775a325afa82054b0c5f45986e2a922720fbdd','[\"*\"]','2026-02-21 15:51:27',NULL,'2026-02-21 15:51:22','2026-02-21 15:51:27'),(2,'App\\Models\\Usuario',1,'auth_token','4b150288c7321dbb7eaf1812de3981fedab86c12535f67d06bdcc6c9af8ef206','[\"*\"]','2026-02-21 17:10:08',NULL,'2026-02-21 17:09:03','2026-02-21 17:10:08'),(3,'App\\Models\\Usuario',1,'auth_token','67ce729e1fe35018bad3995ebd727a5d215701942cab70f14c7820e848cdceb0','[\"*\"]',NULL,NULL,'2026-02-21 17:13:17','2026-02-21 17:13:17'),(4,'App\\Models\\Usuario',1,'auth_token','cccd4c8744faf71af001065bcfde08afce3f00030d19e5d133af5b20983b3021','[\"*\"]',NULL,NULL,'2026-02-21 17:13:43','2026-02-21 17:13:43'),(5,'App\\Models\\Usuario',1,'auth_token','986f8612bd0707b2470cd9c8252ee457d2fe5112978b35fb3a93e836ad2ecedc','[\"*\"]','2026-02-21 18:00:10',NULL,'2026-02-21 17:54:43','2026-02-21 18:00:10'),(6,'App\\Models\\Usuario',2,'auth_token','1a6582c0514382c01000117fc18153f08d80abf37a0f8732df0440eeb5a6922a','[\"*\"]','2026-02-25 03:37:14',NULL,'2026-02-25 03:33:05','2026-02-25 03:37:14');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;

--
-- Table structure for table `promociones`
--

DROP TABLE IF EXISTS `promociones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promociones` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `farmacia_id` bigint(20) unsigned DEFAULT NULL,
  `codigo_promocional` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `tipo_descuento` enum('porcentaje','monto_fijo','envio_gratis','n_x_m') NOT NULL,
  `valor_descuento` decimal(10,2) DEFAULT NULL,
  `monto_minimo` decimal(10,2) DEFAULT NULL,
  `fecha_inicio` datetime DEFAULT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  `usos_maximos` int(11) DEFAULT NULL,
  `usos_actuales` int(11) NOT NULL DEFAULT 0,
  `activa` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `promociones_codigo_promocional_unique` (`codigo_promocional`),
  KEY `promociones_farmacia_id_foreign` (`farmacia_id`),
  CONSTRAINT `promociones_farmacia_id_foreign` FOREIGN KEY (`farmacia_id`) REFERENCES `farmacias` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promociones`
--

/*!40000 ALTER TABLE `promociones` DISABLE KEYS */;
/*!40000 ALTER TABLE `promociones` ENABLE KEYS */;

--
-- Table structure for table `seguimiento_pedidos`
--

DROP TABLE IF EXISTS `seguimiento_pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seguimiento_pedidos` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `pedido_id` bigint(20) unsigned NOT NULL,
  `estado` varchar(50) NOT NULL,
  `ubicacion_lat` decimal(10,8) DEFAULT NULL,
  `ubicacion_lng` decimal(11,8) DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `fecha_evento` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `seguimiento_pedidos_pedido_id_foreign` (`pedido_id`),
  CONSTRAINT `seguimiento_pedidos_pedido_id_foreign` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seguimiento_pedidos`
--

/*!40000 ALTER TABLE `seguimiento_pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `seguimiento_pedidos` ENABLE KEYS */;

--
-- Table structure for table `stock_farmacia`
--

DROP TABLE IF EXISTS `stock_farmacia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock_farmacia` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `farmacia_id` bigint(20) unsigned NOT NULL,
  `medicamento_id` bigint(20) unsigned NOT NULL,
  `stock_actual` int(11) NOT NULL DEFAULT 0,
  `stock_minimo` int(11) NOT NULL DEFAULT 5,
  `precio_venta` decimal(10,2) NOT NULL,
  `disponible` tinyint(1) NOT NULL DEFAULT 1,
  `ubicacion_estante` varchar(50) DEFAULT NULL,
  `promocion` tinyint(1) NOT NULL DEFAULT 0,
  `descuento_porcentaje` decimal(5,2) NOT NULL DEFAULT 0.00,
  `precio_promocion` decimal(10,2) DEFAULT NULL,
  `ultima_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_farmacia_medicamento` (`farmacia_id`,`medicamento_id`),
  KEY `stock_farmacia_medicamento_id_foreign` (`medicamento_id`),
  CONSTRAINT `stock_farmacia_farmacia_id_foreign` FOREIGN KEY (`farmacia_id`) REFERENCES `farmacias` (`id`) ON DELETE CASCADE,
  CONSTRAINT `stock_farmacia_medicamento_id_foreign` FOREIGN KEY (`medicamento_id`) REFERENCES `medicamentos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_farmacia`
--

/*!40000 ALTER TABLE `stock_farmacia` DISABLE KEYS */;
INSERT INTO `stock_farmacia` VALUES (1,1,1,115,10,3.00,1,NULL,0,0.00,NULL,'2026-02-21 11:49:40','2026-02-21 15:49:40','2026-02-21 15:49:40'),(2,1,2,174,10,4.56,1,NULL,0,0.00,NULL,'2026-02-21 11:49:40','2026-02-21 15:49:40','2026-02-21 15:49:40'),(3,1,3,176,10,10.68,1,NULL,0,0.00,NULL,'2026-02-21 11:49:40','2026-02-21 15:49:40','2026-02-21 15:49:40'),(4,1,4,172,10,5.40,1,NULL,0,0.00,NULL,'2026-02-21 11:49:41','2026-02-21 15:49:41','2026-02-21 15:49:41');
/*!40000 ALTER TABLE `stock_farmacia` ENABLE KEYS */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `cedula` int(10) unsigned NOT NULL,
  `primer_nombre` varchar(20) NOT NULL,
  `segundo_nombre` varchar(20) NOT NULL,
  `primer_apellido` varchar(20) NOT NULL,
  `segundo_apellido` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `clave` varchar(255) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `direccion` text DEFAULT NULL,
  `tipo` enum('cliente','farmaceutico','repartidor','admin') NOT NULL DEFAULT 'cliente',
  `fecha_nacimiento` date DEFAULT NULL,
  `genero` enum('M','F','Otro') DEFAULT NULL,
  `foto_perfil` varchar(255) DEFAULT NULL,
  `licencia_conducir` varchar(50) DEFAULT NULL,
  `vehiculo_tipo` enum('moto','auto','bicicleta') DEFAULT NULL,
  `placa_vehiculo` varchar(20) DEFAULT NULL,
  `estado` enum('activo','inactivo','suspendido','ocupado') NOT NULL DEFAULT 'activo',
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `ultimo_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuarios_cedula_unique` (`cedula`),
  UNIQUE KEY `usuarios_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,2625451,'Shania','Rose','Gomez','Khan','shania@gmail.com','$2y$12$b1/aIQEppSqqITDKWvjqjudL4KeNZqyve0fjCEEbN.g3yBeewItv2','04149876543','Av. Principal, Caracas','admin',NULL,NULL,NULL,NULL,NULL,NULL,'activo','2026-02-21 15:49:40','2026-02-21 17:54:43','2026-02-21 15:49:40','2026-02-21 17:54:43'),(2,27302402,'Jeferson','Yexael','Oramas','Rojas','jeff@gmail.com','$2y$12$YyY/zKPY.yD5g7o3WRx.t.MEqponA5cWG97jvH5Q1PaC1xVdMvk0W','04149876543','Av. Principal, Caracas','cliente',NULL,NULL,NULL,NULL,NULL,NULL,'activo','2026-02-21 15:49:40','2026-02-25 03:33:04','2026-02-21 15:49:40','2026-02-25 03:33:04');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

--
-- Dumping routines for database 'farmatrom'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-24 19:41:49

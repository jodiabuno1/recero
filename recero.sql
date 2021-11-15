-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 09-11-2021 a las 13:26:22
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `recero`
--
CREATE DATABASE IF NOT EXISTS `recero` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `recero`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comunas`
--

CREATE TABLE `comunas` (
  `Id_Comuna` int(11) NOT NULL,
  `Nombre_Comuna` varchar(255) NOT NULL,
  `Id_Provincia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `comunas`
--

INSERT INTO `comunas` (`Id_Comuna`, `Nombre_Comuna`, `Id_Provincia`) VALUES
(1, 'Llay-Llay', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contenedor`
--

CREATE TABLE `contenedor` (
  `Id_Contenedor` int(11) NOT NULL,
  `Peso_Max` double NOT NULL,
  `Peso_Min` double NOT NULL,
  `Tipo_Contenedor` varchar(255) NOT NULL,
  `Is_Valid` varchar(255) NOT NULL,
  `Id_Residuos` int(11) NOT NULL,
  `Precio_kilo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direccion`
--

CREATE TABLE `direccion` (
  `Id_Direccion` int(11) NOT NULL,
  `Id_Comuna` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `direccion`
--

INSERT INTO `direccion` (`Id_Direccion`, `Id_Comuna`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `Rut_Num_Empresa` varchar(15) NOT NULL,
  `Nombre_Empresa` varchar(255) NOT NULL,
  `Dirección_Empresa` varchar(255) NOT NULL,
  `Rol_Empresa` varchar(255) NOT NULL,
  `Razón_Social` varchar(255) NOT NULL,
  `Correo_Empresa` varchar(255) NOT NULL,
  `Cantidad_Empleados` int(11) NOT NULL,
  `Id_Dirección` int(11) NOT NULL,
  `Descripción_empresa` varchar(255) NOT NULL,
  `Id_Metodo_Pago` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturación`
--

CREATE TABLE `facturación` (
  `Id_Facturación` int(11) NOT NULL,
  `Id_Ruta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ficha_solicitud`
--

CREATE TABLE `ficha_solicitud` (
  `Id_Ficha` int(11) NOT NULL,
  `Id_Contenedor` int(11) NOT NULL,
  `Fecha_Ficha` varchar(255) NOT NULL,
  `Id_Dirección` int(11) NOT NULL,
  `Rut_Num_Usuario` varchar(15) NOT NULL,
  `Rut_Num_Empresa` varchar(15) NOT NULL,
  `Is_Valid` varchar(255) NOT NULL,
  `Id_Ruta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `Id_Historial` int(11) NOT NULL,
  `Rut_Num_Usuario` varchar(15) NOT NULL,
  `Fecha_Historial` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--

CREATE TABLE `login` (
  `Id_Login` int(11) NOT NULL,
  `Id_Perfil` int(11) NOT NULL,
  `Rut_Num_Usuario` varchar(15) NOT NULL,
  `Is_Valid` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodo_pago`
--

CREATE TABLE `metodo_pago` (
  `Id_Metodo_Pago` int(11) NOT NULL,
  `Descripción_MP` varchar(255) NOT NULL,
  `Tipo_Banco` varchar(255) NOT NULL,
  `Is_Valid` varchar(255) NOT NULL,
  `Fecha_Creación_MP` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil`
--

CREATE TABLE `perfil` (
  `Id_Perfil` int(11) NOT NULL,
  `Descripcion_Perfil` varchar(255) NOT NULL,
  `Rut_Num_Usuario` varchar(15) NOT NULL,
  `Is_Valid` tinyint(1) NOT NULL,
  `Fecha_Creacion` varchar(255) NOT NULL,
  `Contrasena_Perfil` varchar(255) NOT NULL,
  `skills` varchar(255) NOT NULL,
  `educacion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `perfil`
--

INSERT INTO `perfil` (`Id_Perfil`, `Descripcion_Perfil`, `Rut_Num_Usuario`, `Is_Valid`, `Fecha_Creacion`, `Contrasena_Perfil`, `skills`, `educacion`) VALUES
(1, 'Mi nombre es Franco Delpin, soy un Analista Programador Computacional con más de 7 años de experiencia en desarrollo Backend y FrontEnd. \r\n\r\nAnteriormente estudiante de Ingeniería Informática. \r\n', '182787752', 1, '2021-27-10', '9a5669df596c2c8dedec34c39b09555686881227', 'JavaScript - JavaEE - PHP - .NET - C# - Linux - Oracle - SOAP - REST', 'DuocUC Viña Del Mar - Ingeniería Informatica - Analista Programador Computacional');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provincias`
--

CREATE TABLE `provincias` (
  `Id_Provincia` int(11) NOT NULL,
  `Descripcion_Provincia` varchar(255) NOT NULL,
  `Id_Region` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `provincias`
--

INSERT INTO `provincias` (`Id_Provincia`, `Descripcion_Provincia`, `Id_Region`) VALUES
(1, 'San Felipe', 5),
(2, 'San Felipe', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `region`
--

CREATE TABLE `region` (
  `Id_Region` int(11) NOT NULL,
  `Descripcion_Region` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `region`
--

INSERT INTO `region` (`Id_Region`, `Descripcion_Region`) VALUES
(5, 'Región Valparaiso');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `residuos`
--

CREATE TABLE `residuos` (
  `Id_Residuos` int(11) NOT NULL,
  `Descripcion_Residuos` varchar(255) NOT NULL,
  `Tipo_Residuos` varchar(255) NOT NULL,
  `Cantidad_Tara` int(11) NOT NULL,
  `Is_Valid` varchar(255) NOT NULL,
  `Precio_Iva` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `residuos`
--

INSERT INTO `residuos` (`Id_Residuos`, `Descripcion_Residuos`, `Tipo_Residuos`, `Cantidad_Tara`, `Is_Valid`, `Precio_Iva`) VALUES
(1, 'Residuo Toxico De Hospital', 'Biologicos', 1000, '', 45000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ruta_solicitada`
--

CREATE TABLE `ruta_solicitada` (
  `Id_Ruta` int(11) NOT NULL,
  `Longitud` double NOT NULL,
  `Latirud` double NOT NULL,
  `Id_Dirección` int(11) NOT NULL,
  `Descripción_Ruta` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajador`
--

CREATE TABLE `trabajador` (
  `Id_Trabajador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `Rut_Num_Usuario` varchar(15) NOT NULL,
  `Nombres_Usuario` varchar(255) NOT NULL,
  `Apellido_Paterno` varchar(255) NOT NULL,
  `Apellido_Materno` varchar(255) NOT NULL,
  `Id_Direccion` int(11) NOT NULL,
  `Fecha_Nacimiento` varchar(255) NOT NULL,
  `Correo_Usuario` varchar(255) NOT NULL,
  `Cargo` varchar(255) NOT NULL,
  `Is_Empresa` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`Rut_Num_Usuario`, `Nombres_Usuario`, `Apellido_Paterno`, `Apellido_Materno`, `Id_Direccion`, `Fecha_Nacimiento`, `Correo_Usuario`, `Cargo`, `Is_Empresa`) VALUES
('182787752', 'Franco Giovanni', 'Delpin', 'Rivera', 1, '1993-03-19', 'shakaespaa@gmail.com', 'Administracion', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculo`
--

CREATE TABLE `vehiculo` (
  `Id_Vehiculo` int(11) NOT NULL,
  `Descripción_Vehiculo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `vehiculo`
--

INSERT INTO `vehiculo` (`Id_Vehiculo`, `Descripción_Vehiculo`) VALUES
(1, 'Vehiculo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comunas`
--
ALTER TABLE `comunas`
  ADD PRIMARY KEY (`Id_Comuna`),
  ADD KEY `fk_comuna` (`Id_Provincia`);

--
-- Indices de la tabla `contenedor`
--
ALTER TABLE `contenedor`
  ADD PRIMARY KEY (`Id_Contenedor`),
  ADD KEY `fk_contenedor` (`Id_Residuos`);

--
-- Indices de la tabla `direccion`
--
ALTER TABLE `direccion`
  ADD PRIMARY KEY (`Id_Direccion`),
  ADD KEY `fk_comuna_dirección` (`Id_Comuna`);

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`Rut_Num_Empresa`),
  ADD KEY `fk_dirección_empresa` (`Id_Dirección`),
  ADD KEY `fk_metdo_pago` (`Id_Metodo_Pago`);

--
-- Indices de la tabla `facturación`
--
ALTER TABLE `facturación`
  ADD PRIMARY KEY (`Id_Facturación`),
  ADD KEY `fk_ruta_facturación` (`Id_Ruta`);

--
-- Indices de la tabla `ficha_solicitud`
--
ALTER TABLE `ficha_solicitud`
  ADD PRIMARY KEY (`Id_Ficha`),
  ADD KEY `fk_contenedor_ficha` (`Id_Contenedor`),
  ADD KEY `fk_ficha_dirección` (`Id_Dirección`),
  ADD KEY `fk_ruta_solicitada` (`Id_Ruta`),
  ADD KEY `fk_usuario` (`Rut_Num_Usuario`),
  ADD KEY `fk_empresa` (`Rut_Num_Empresa`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`Id_Historial`);

--
-- Indices de la tabla `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`Id_Login`),
  ADD KEY `fk_perfil` (`Id_Perfil`),
  ADD KEY `fk_rut_usuario` (`Rut_Num_Usuario`);

--
-- Indices de la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
  ADD PRIMARY KEY (`Id_Metodo_Pago`);

--
-- Indices de la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`Id_Perfil`),
  ADD KEY `fk_Num_Usuario` (`Rut_Num_Usuario`);

--
-- Indices de la tabla `provincias`
--
ALTER TABLE `provincias`
  ADD PRIMARY KEY (`Id_Provincia`),
  ADD KEY `fk_región` (`Id_Region`);

--
-- Indices de la tabla `region`
--
ALTER TABLE `region`
  ADD PRIMARY KEY (`Id_Region`);

--
-- Indices de la tabla `residuos`
--
ALTER TABLE `residuos`
  ADD PRIMARY KEY (`Id_Residuos`);

--
-- Indices de la tabla `ruta_solicitada`
--
ALTER TABLE `ruta_solicitada`
  ADD PRIMARY KEY (`Id_Ruta`),
  ADD KEY `fk_ruta` (`Id_Dirección`);

--
-- Indices de la tabla `trabajador`
--
ALTER TABLE `trabajador`
  ADD PRIMARY KEY (`Id_Trabajador`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`Rut_Num_Usuario`),
  ADD KEY `fk_Dirección` (`Id_Direccion`);

--
-- Indices de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD PRIMARY KEY (`Id_Vehiculo`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comunas`
--
ALTER TABLE `comunas`
  ADD CONSTRAINT `fk_comuna` FOREIGN KEY (`Id_Provincia`) REFERENCES `provincias` (`Id_Provincia`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `contenedor`
--
ALTER TABLE `contenedor`
  ADD CONSTRAINT `fk_contenedor` FOREIGN KEY (`Id_Residuos`) REFERENCES `residuos` (`Id_Residuos`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `direccion`
--
ALTER TABLE `direccion`
  ADD CONSTRAINT `fk_comuna_dirección` FOREIGN KEY (`Id_Comuna`) REFERENCES `comunas` (`Id_Comuna`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD CONSTRAINT `fk_dirección_empresa` FOREIGN KEY (`Id_Dirección`) REFERENCES `direccion` (`Id_Direccion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_metdo_pago` FOREIGN KEY (`Id_Metodo_Pago`) REFERENCES `metodo_pago` (`Id_Metodo_Pago`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `facturación`
--
ALTER TABLE `facturación`
  ADD CONSTRAINT `fk_ruta_facturación` FOREIGN KEY (`Id_Ruta`) REFERENCES `ruta_solicitada` (`Id_Ruta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ficha_solicitud`
--
ALTER TABLE `ficha_solicitud`
  ADD CONSTRAINT `fk_contenedor_ficha` FOREIGN KEY (`Id_Contenedor`) REFERENCES `contenedor` (`Id_Contenedor`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_empresa` FOREIGN KEY (`Rut_Num_Empresa`) REFERENCES `empresa` (`Rut_Num_Empresa`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_ficha_dirección` FOREIGN KEY (`Id_Dirección`) REFERENCES `direccion` (`Id_Direccion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_ruta_solicitada` FOREIGN KEY (`Id_Ruta`) REFERENCES `ruta_solicitada` (`Id_Ruta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`Rut_Num_Usuario`) REFERENCES `usuario` (`Rut_Num_Usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `fk_perfil` FOREIGN KEY (`Id_Perfil`) REFERENCES `perfil` (`Id_Perfil`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_rut_usuario` FOREIGN KEY (`Rut_Num_Usuario`) REFERENCES `usuario` (`Rut_Num_Usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD CONSTRAINT `fk_Num_Usuario` FOREIGN KEY (`Rut_Num_Usuario`) REFERENCES `usuario` (`Rut_Num_Usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `provincias`
--
ALTER TABLE `provincias`
  ADD CONSTRAINT `fk_región` FOREIGN KEY (`Id_Region`) REFERENCES `region` (`Id_Region`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ruta_solicitada`
--
ALTER TABLE `ruta_solicitada`
  ADD CONSTRAINT `fk_ruta` FOREIGN KEY (`Id_Dirección`) REFERENCES `direccion` (`Id_Direccion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_Dirección` FOREIGN KEY (`Id_Direccion`) REFERENCES `direccion` (`Id_Direccion`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

PASO 1

Para desplegar la app se necesita crear la base de datos en MySql con las siguientes lineas de código:

create database employees character set utf8 collate utf8_unicode_ci;
use employees;

create table employees(
	id int not null auto_increment,
    fullname varchar(255),
    functions varchar(255),
    PRIMARY KEY (id)
);

create table roles(
	id int not null auto_increment,
    idemployee int not null,
    idboss int not null,
    PRIMARY KEY (id)
); 

ALTER TABLE roles ADD CONSTRAINT fk_id_employee FOREIGN KEY(idemployee) REFERENCES employees(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE roles ADD CONSTRAINT fk_id_boss FOREIGN KEY(idboss) REFERENCES employees(id) ON DELETE CASCADE ON UPDATE CASCADE;

-------------------------------------------------------------------------------------------------------------------------------
PASO 2

Se debe configuar el archivo config.json con las variables propias de la base de datos y el ambiente de MySQL creado en el PASO 1.

--------------------------------------------------------------------------------------------------------------------------------

PASO 3

Asegurarse de que no falta ninguna dependencia por instalar con el comando npm install o verificar cada modulo que se requiera.

La ejecución del backend se hace mediante el comando nodemon index.js

La ejecución del frontend se hace con el comando ng serve


NOTA: No se realizó el contenedor de docker y circle CI dado a la ausencia de conocimiento en el tema.


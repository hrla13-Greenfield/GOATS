const sequelize = require('sequelize');
const mysql = require('mysql');

// -- ---
// -- Globals
// -- ---

// -- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
// -- SET FOREIGN_KEY_CHECKS=0;

// -- ---
// -- Table 'User'
// --
// -- ---

// DROP TABLE IF EXISTS `User`;
        
// CREATE TABLE `User` (
//  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
//  `Name` VARCHAR NULL DEFAULT NULL,
//  `Password` VARCHAR NULL DEFAULT NULL,
//  `Currrent` INTEGER NULL DEFAULT NULL,
//  `Points` INTEGER NULL DEFAULT NULL,
//  PRIMARY KEY (`id`)
// );

// -- ---
// -- Table 'History'
// --
// -- ---

// DROP TABLE IF EXISTS `History`;
        
// CREATE TABLE `History` (
//  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
//  `Name` VARCHAR NULL DEFAULT NULL,
//  `URL` VARCHAR NULL DEFAULT NULL,
//  `Image` VARCHAR NULL DEFAULT NULL,
//  `Address` VARCHAR NULL DEFAULT NULL,
//  `Opening_Hours` VARCHAR NULL DEFAULT NULL,
//  `Category` VARCHAR NULL DEFAULT NULL,
//  `Rating` INTEGER NULL DEFAULT NULL,
//  `User_id` INTEGER NOT NULL DEFAULT NULL,
//  PRIMARY KEY (`id`)
// );

// -- ---
// -- Table 'Group'
// --
// -- ---

// DROP TABLE IF EXISTS `Group`;
        
// CREATE TABLE `Group` (
//  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
//  `Name` VARCHAR NULL DEFAULT NULL,
//  PRIMARY KEY (`id`)
// );

// -- ---
// -- Table 'User_Group'
// --
// -- ---

// DROP TABLE IF EXISTS `User_Group`;
        
// CREATE TABLE `User_Group` (
//  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
//  `Group_id` INTEGER NULL DEFAULT NULL,
//  `User_id` INTEGER NULL DEFAULT NULL,
//  PRIMARY KEY (`id`)
// );

// -- ---
// -- Foreign Keys
// -- ---

// ALTER TABLE `History` ADD FOREIGN KEY (User_id) REFERENCES `User` (`id`);
// ALTER TABLE `User_Group` ADD FOREIGN KEY (Group_id) REFERENCES `Group` (`id`);
// ALTER TABLE `User_Group` ADD FOREIGN KEY (User_id) REFERENCES `User` (`id`);

// -- ---
// -- Table Properties
// -- ---

// -- ALTER TABLE `User` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
// -- ALTER TABLE `History` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
// -- ALTER TABLE `Group` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
// -- ALTER TABLE `User_Group` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

// -- ---
// -- Test Data
// -- ---

// -- INSERT INTO `User` (`id`,`Name`,`Password`,`Currrent`,`Points`) VALUES
// -- ('','','','','');
// -- INSERT INTO `History` (`id`,`Name`,`URL`,`Image`,`Address`,`Opening_Hours`,`Category`,`Rating`,`User_id`) VALUES
// -- ('','','','','','','','','');
// -- INSERT INTO `Group` (`id`,`Name`) VALUES
// -- ('','');
// -- INSERT INTO `User_Group` (`id`,`Group_id`,`User_id`) VALUES
// -- ('','','');
SET foreign_key_checks=0;

DROP DATABASE IF EXISTS formsli;
CREATE DATABASE formsli CHARACTER SET utf8 COLLATE utf8_unicode_ci;

USE formsli;

DROP TABLE IF EXISTS User;
CREATE TABLE IF NOT EXISTS User (
    id VARCHAR(36) NOT NULL,
    externalId VARCHAR(255) NOT NULL,
    ownerId VARCHAR(36),
    accountId VARCHAR(36),
    email VARCHAR(255) NOT NULL,
    userGroup VARCHAR(64) NOT NULL,
    given_name VARCHAR(255) NOT NULL,
    family_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(64),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    isDeleted BOOLEAN DEFAULT 0,
    UNIQUE INDEX `UNIQ_INDX_User_email` (`email` ASC),
    UNIQUE INDEX `UNIQ_INDX_User_id_account_id` (`id` ASC, `accountId` ASC),
    UNIQUE INDEX `UNIQ_INDX_User_external_id_account_id` (`externalId` ASC, `accountId` ASC),
    PRIMARY KEY (id),
    FOREIGN KEY (accountId) REFERENCES Account(id)
);

DROP TABLE IF EXISTS PlanType;
CREATE TABLE  IF NOT EXISTS PlanType (
    id VARCHAR(36) NOT NULL,
    ownerId VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    cost FLOAT(9),
    billingTerm VARCHAR(64),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    isDeleted BOOLEAN DEFAULT 0,
    active BOOLEAN DEFAULT 0,
    UNIQUE INDEX `UNIQ_INDX_PlanType_id` (`id` ASC),
    INDEX `INDX_PlanType_id` (`id` ASC, `active` DESC),
    PRIMARY KEY (id),
    FOREIGN KEY (ownerId) REFERENCES User(id)
);

DROP TABLE IF EXISTS Plan;
CREATE TABLE  IF NOT EXISTS Plan (
    id VARCHAR(36) NOT NULL,
    accountId VARCHAR(36),
    ownerId VARCHAR(36) NOT NULL,
    planTypeId VARCHAR(36) NOT NULL,
    startDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    endDate TIMESTAMP,
    active BOOLEAN,
    lastBillDate TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    isDeleted BOOLEAN DEFAULT 0,
    UNIQUE INDEX `INDX_Plan_id` (`id` ASC),
    INDEX `INDX_Plan_id_active` (`id` ASC, `active` DESC),
    PRIMARY KEY (id),
    FOREIGN KEY (planTypeId) REFERENCES PlanType(id),
    FOREIGN KEY (ownerId) REFERENCES User(id)
);

DROP TABLE IF EXISTS Address;
CREATE TABLE  IF NOT EXISTS Address (
    id VARCHAR(36) NOT NULL,
    accountId VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    addressee VARCHAR(255) NOT NULL,
    addressType ENUM('BILLING', 'CONTACT'),
    phone_number VARCHAR(64),
    email VARCHAR(255),
    street VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    country VARCHAR(255),
    UNIQUE INDEX `INDX_Address_id` (`id` ASC),
    UNIQUE INDEX `INDX_Address_id_account_id` (`id` ASC, `accountId` ASC),
    PRIMARY KEY (id),
    FOREIGN KEY (accountId) REFERENCES Account(id)
);

DROP TABLE IF EXISTS Account;
CREATE TABLE  IF NOT EXISTS Account (
    id VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    website VARCHAR(255),
    taxId VARCHAR(255),
    ownerId VARCHAR(36) NOT NULL,
    planId VARCHAR(36),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT 1,
    UNIQUE INDEX `INDX_Account_id` (`id` ASC),
    UNIQUE INDEX `INDX_Account_id_active` (`id` ASC, `active` DESC),
    PRIMARY KEY (id),
    FOREIGN KEY (ownerId) REFERENCES User(id),
    FOREIGN KEY (planId) REFERENCES Plan(id)
);

DROP TABLE IF EXISTS IntegrationType;
CREATE TABLE  IF NOT EXISTS IntegrationType (
    id VARCHAR(36) NOT NULL,
    ownerId VARCHAR(36) NOT NULL,
    planTypeId VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    active BOOLEAN DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE INDEX `INDX_IntegrationType_id` (`id` ASC),
    UNIQUE INDEX `INDX_IntegrationType_id_active` (`id` ASC, `active` DESC),
    PRIMARY KEY (id),
    FOREIGN KEY (planTypeId) REFERENCES PlanType(id),
    FOREIGN KEY (ownerId) REFERENCES User(id)
);

DROP TABLE IF EXISTS Integration;
CREATE TABLE  IF NOT EXISTS Integration (
    id VARCHAR(36) NOT NULL,
    integrationTypeId VARCHAR(36) NOT NULL,
    ownerId VARCHAR(36) NOT NULL,
    accountId VARCHAR(36) NOT NULL,
    formId VARCHAR(36) NOT NULL,
    active BOOLEAN DEFAULT 0,
    authType VARCHAR(255),
    auth VARCHAR(1024),
    target VARCHAR(255),
    method VARCHAR(255),
    lastExecuted TIMESTAMP,
    lastExecutionResult BOOLEAN,
    lastExecutionResultMessage VARCHAR(1024),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    isDeleted BOOLEAN DEFAULT 0,
    UNIQUE INDEX `INDX_Integration_id` (`id` ASC),
    INDEX `INDX_Integration_id_integration_type_id` (`id` ASC, `integrationTypeId` ASC),
    UNIQUE INDEX `INDX_Integration_id_account_id_form_id` (`id` ASC, `accountId` ASC, `formId` ASC),
    PRIMARY KEY (id),
    FOREIGN KEY (integrationTypeId) REFERENCES IntegrationType(id),
    FOREIGN KEY (accountId) REFERENCES Account(id),
    FOREIGN KEY (formId) REFERENCES Form(id),
    FOREIGN KEY (ownerId) REFERENCES User(id)
);

DROP TABLE IF EXISTS FormVersion;
CREATE TABLE  IF NOT EXISTS FormVersion (
    id VARCHAR(36) NOT NULL,
    formId VARCHAR(36) NOT NULL,
    ownerId VARCHAR(36) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes varchar(255) NOT NULL,
    formData TEXT,
    UNIQUE INDEX `INDX_FormVersion_id` (`id` ASC),
    UNIQUE INDEX `INDX_FormVersion_id_form_id` (`id` ASC, `formId` ASC),
    UNIQUE INDEX `INDX_FormVersion_id_created_at` (`id` ASC, `createdAt` DESC),
    PRIMARY KEY (id),
    FOREIGN KEY (ownerId) REFERENCES User(id)
);

DROP TABLE IF EXISTS Form;
CREATE TABLE  IF NOT EXISTS Form (
    id VARCHAR(36) NOT NULL,
    ownerId VARCHAR(36) NOT NULL,
    versionId VARCHAR(36) NOT NULL,
    accountId VARCHAR(36) NOT NULL,
    `name` varchar(256),
    description varchar(512),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    startsAt TIMESTAMP,
    endsAt TIMESTAMP,
    isPaused BOOLEAN DEFAULT 1,
    PRIMARY KEY (id),
    UNIQUE INDEX `INDX_Form_id` (`id` ASC),
    UNIQUE INDEX `INDX_Form_id_account_id` (`id` ASC, `accountId` ASC),
    UNIQUE INDEX `INDX_Form_id_version_id` (`id` ASC, `versionId` ASC),
    FOREIGN KEY (accountId) REFERENCES Account(id),
    FOREIGN KEY (ownerId) REFERENCES User(id),
    FOREIGN KEY (versionId) REFERENCES FormVersion(id)
);

DROP TABLE IF EXISTS FormEntry;
CREATE TABLE  IF NOT EXISTS FormEntry (
    id INT UNSIGNED AUTO_INCREMENT,
    formId VARCHAR(36) NOT NULL,
    data TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE INDEX `INDX_FormEntry_id` (`id` ASC),
    UNIQUE INDEX `INDX_FormEntry_id_created_at` (`id` ASC, `formId` ASC),
    UNIQUE INDEX `INDX_FormEntry_id_created_at` (`id` ASC, `createdAt` DESC),
    FOREIGN KEY (formId) REFERENCES Form(id)
);
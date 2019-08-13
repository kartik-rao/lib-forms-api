SHOW ENGINE INNODB STATUS;
SET foreign_key_checks=0;

START TRANSACTION;

CREATE TABLE User (
    id INT NOT NULL AUTO_INCREMENT,
    externalId VARCHAR(255) NOT NULL,
    ownerId INT,
    accountId INT,
    email VARCHAR(255) NOT NULL,
    userGroup VARCHAR(64) NOT NULL,
    given_name VARCHAR(255) NOT NULL,
    family_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(64),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    isDeleted BOOLEAN DEFAULT 0,
    UNIQUE INDEX `INDX_User_id` (`id` ASC),
    PRIMARY KEY (id),
    FOREIGN KEY (accountId) REFERENCES Account(id)
);

CREATE TABLE PlanType (
    id INT NOT NULL AUTO_INCREMENT,
    ownerId INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    cost FLOAT(9),
    billingTerm VARCHAR(64),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    isDeleted BOOLEAN DEFAULT 0,
    active BOOLEAN DEFAULT 0,
    UNIQUE INDEX `INDX_PlanType_id` (`id` ASC),
    PRIMARY KEY (id),
    FOREIGN KEY (ownerId) REFERENCES User(id)
);

CREATE TABLE Plan (
    id INT NOT NULL AUTO_INCREMENT,
    accountId INT,
    ownerId INT NOT NULL,
    planTypeId INT NOT NULL,
    startDate DEFAULT CURRENT_TIMESTAMP NOT NULL,
    endDate TIMESTAMP,
    active BOOLEAN,
    lastBillDate TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    isDeleted BOOLEAN DEFAULT 0,
    UNIQUE INDEX `INDX_Plan_id` (`id` ASC),
    PRIMARY KEY (id),
    FOREIGN KEY (planTypeId) REFERENCES PlanType(id),
    FOREIGN KEY (ownerId) REFERENCES User(id)
)

CREATE TABLE Address (
    id INT NOT NULL AUTO_INCREMENT,
    accountId INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    addressee VARCHAR(255) NOT NULL,
    addressType ENUM('BILLING', 'CONTACT')
    phone_number VARCHAR(64),
    email VARCHAR(255),
    street VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    country VARCHAR(255),
    UNIQUE INDEX `INDX_Address_id` (`id` ASC),
    PRIMARY KEY (id),
    FOREIGN KEY (accountId) REFERENCES Account(id)
)

CREATE TABLE Account (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    website VARCHAR(255),
    taxId VARCHAR(255)
    ownerId INT NOT NULL,
    planId INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT 1,
    UNIQUE INDEX `INDX_Account_id` (`id` ASC),
    PRIMARY KEY (id),
    FOREIGN KEY (ownerId) REFERENCES User(id),
    FOREIGN KEY (planId) REFERENCES Plan(id)
);

CREATE TABLE IntegrationType (
    id INT NOT NULL AUTO_INCREMENT,
    ownerId INT NOT NULL,
    planTypeId INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    active BOOLEAN DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE INDEX `INDX_IntegrationType_id` (`id` ASC),
    PRIMARY KEY (id),
    FOREIGN KEY (planTypeId) REFERENCES PlanType(id),
    FOREIGN KEY (ownerId) REFERENCES User(id)
);

 CREATE TABLE Integration (
    id INT NOT NULL AUTO_INCREMENT,
    integrationTypeId INT NOT NULL,
    ownerId INT NOT NULL,
    accountId INT NOT NULL,
    formId INT NOT NULL,
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
    PRIMARY KEY (id),
    FOREIGN KEY (integrationTypeId) REFERENCES IntegrationType(id),
    FOREIGN KEY (accountId) REFERENCES Account(id),
    FOREIGN KEY (formId) REFERENCES Form(id),
    FOREIGN KEY (ownerId) REFERENCES User(id)
);

CREATE TABLE FormVersion (
    id INT NOT NULL AUTO_INCREMENT,
    ownerId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes varchar(255) NOT NULL,
    formData JSON,
    PRIMARY KEY (id),
    FOREIGN KEY (ownerId) REFERENCES User(id)
);

CREATE TABLE Form (
    id INT NOT NULL AUTO_INCREMENT,
    ownerId INT NOT NULL,
    versionId INT NOT NULL,
    accountId INT NOT NULL,
    name varchar(256),
    desc varchar(512),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    startsAt TIMESTAMP,
    endsAt TIMESTAMP,
    isPaused BOOLEAN DEFAULT 1,
    PRIMARY KEY (id),
    FOREIGN KEY (accountId) REFERENCES Account(id),
    FOREIGN KEY (ownerId) REFERENCES User(id),
    FOREIGN KEY (versionId) REFERENCES FormVersion(id),
);

commit;
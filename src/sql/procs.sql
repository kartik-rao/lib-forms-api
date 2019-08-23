DROP PROCEDURE IF EXISTS changeAccountPlan;
DELIMITER //
CREATE PROCEDURE changeAccountPlan(IN p_account_id VARCHAR(36), IN p_plan_id VARCHAR(36), IN p_isotime VARCHAR(24))
  BEGIN
    SET @v_current_plan_id = NULL;
    SET @s1 = 'SELECT planId into @v_current_plan_id FROM Account where id=? ';
    PREPARE stmt FROM @s1;
    SET @accountId = p_account_id;
    EXECUTE stmt USING @accountId;
    DEALLOCATE PREPARE stmt;
    START TRANSACTION;
        IF (SELECT @v_current_plan_id IS NOT NULL) THEN
            SET @s2 = 'UPDATE Plan set active=0, endDate=? WHERE id=?';
            PREPARE end_curr_plan FROM @s2;
            SET @planId = v_current_plan_id;
            SET @endDate = p_isotime;
            EXECUTE end_curr_plan USING @endDate, @planId;
            DEALLOCATE PREPARE end_curr_plan;
        END IF;
        SET @s4 = 'UPDATE Account set updatedAt=?, planId=? WHERE id=?';
        PREPARE attach_new_plan FROM @s4;
        SET @updatedAt = p_isotime;
        SET @planId = p_plan_id;
        SET @accountId = p_account_id;
        EXECUTE attach_new_plan USING @updatedAt, @planId, @accountId;
        DEALLOCATE PREPARE attach_new_plan;

        PREPARE get_updated_account FROM 'SELECT * FROM Account WHERE id=?';
        SET @accountId = p_account_id;
        EXECUTE get_updated_account USING @accountId;
        DEALLOCATE PREPARE get_updated_account;
    COMMIT;
 END //
 DELIMITER ;
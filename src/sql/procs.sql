DROP PROCEDURE IF EXISTS changeAccountPlan;
CREATE PROCEDURE changeAccountPlan(IN p_account_id VARCHAR(36), IN p_plan_id VARCHAR(36), IN p_isotime VARCHAR(24))
  BEGIN
    -- Get current plan for this account
    DECLARE v_current_plan_id VARCHAR(36)
    PREPARE stmt FROM 'SELECT planId FROM Account where accountId=? into v_current_plan_id';
    SET @accountId = p_account_id;
    EXECUTE stmt USING @accountId;
    DEALLOCATE PREPARE stmt;
    START TRANSACTION
        -- End the current plan
        IF EXISTS(v_current_plan_id) THEN
            PREPARE end_curr_plan FROM 'UPDATE Plan set active=0, endDate=? WHERE planId=?';
            SET @planId = v_current_plan_id
            SET @endDate = p_isotime
            EXECUTE end_curr_plan USING @endDate, @planId;
            DEALLOCATE PREPARE end_curr_plan;
        END IF;

        -- Start the new plan
        PREPARE start_new_plan FROM 'UPDATE Plan set active=1, startDate=? WHERE planId=?';
        SET @planId = p_plan_id
        SET @startDate = p_isotime
        EXECUTE end_curr_plan USING @startDate, @planId;
        DEALLOCATE PREPARE start_new_plan;

        -- Update the account with the new planId
        PREPARE attach_new_plan FROM 'UPDATE Account set updatedAt=?, planId=? WHERE accountId=?';
        SET @updatedAt = p_isotime;
        SET @planId = p_plan_id;
        SET @accountId = p_account_id;
        EXECUTE attach_new_plan USING @updatedAt, @planId, @accountId;
        DEALLOCATE PREPARE attach_new_plan;

        -- Return the updated account
        PREPARE get_updated_account FROM 'SELECT * FROM Account WHERE accountId=?';
        SET @accountId = p_account_id;
        EXECUTE get_updated_account USING @accountId;
        DEALLOCATE PREPARE get_updated_account;
    COMMIT;
 END
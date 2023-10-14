const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(config.db,
        `SELECT 
            id, 
            title, 
            detail, 
            create_at, 
            update_at, 
            enabled
        FROM 
            chores 
        LIMIT 
            ${offset}, ${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

async function getOne(id) {
    try {
        const result = await db.query(config.db,
            `SELECT 
                id, 
                title, 
                detail, 
                create_at, 
                update_at, 
                enabled
            FROM 
                chores 
            WHERE id = ${id}`);
        const data = helper.emptyOrRows(result);
        return {data};
    } catch (e) {
        console.log(e);
    }
}

async function create(task){
    let success = false;
    const result = await db.query(config.db,
        `INSERT INTO 
            chores(title, detail, create_at, update_at, enabled) 
        VALUES 
        (
            ?,
            ?,
            CURRENT_TIMESTAMP,
            CURRENT_TIMESTAMP,
            ?
        )`,
        [
            task.title,
            task.detail,
            task.enabled
        ]
    );
  
    let message = 'Error in creating task';
  
    if (result.affectedRows) {
      message = 'Task created successfully';
      success = true;
    }
  
    return {message, success};
}

async function update(id, task){
    let success = false;
    const result = await db.query(config.db,
        `UPDATE 
            chores
        SET 
            title = ?,
            detail = ?,
            update_at = CURRENT_TIMESTAMP,
            enabled = ?
        WHERE 
            id=?` ,
            [
                task.title,
                task.detail,
                task.enabled,
                id  
            ]
    );
  
    let message = 'Error in updating task';
  
    if (result.affectedRows) {
      message = 'Task updated successfully';
      success = true;
    }
  
    return {message, success};
}

async function change(id, status) {

    let success = false;
    status = (status === 0) ? 1 : status;

    const result = await db.queryNewDB(
      `UPDATE chores  SET status = ?  WHERE id = ?`,
      [status, id]
    );
  
    let message = "Error in change status task";
  
    if (result.affectedRows) {
      (message = "Task item change status successfully"), (success = true);
    }
  
    return { message, success };
  }

module.exports = {
  getMultiple,
  getOne,
  create,
  update,
  change
}
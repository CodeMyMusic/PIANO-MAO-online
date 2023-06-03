import mys

function selectFromTable(tableName, columns, conditions) {
    // Construct the SQL query using template literals
    const sql = `SELECT ${columns.join(', ')} FROM ${tableName} WHERE ${conditions.map(condition => `${condition.column} ${condition.operator} ?`).join(' AND ')}`;
  
    // Create an array of values to substitute the placeholders in the query
    const params = conditions.map(condition => condition.value);
  
    // Acquire a connection from the pool
    pool.getConnection(function(err, connection) {
      if (err) {
        console.error(err);
        return;
      }
  
      // Execute the query
      connection.query(sql, params, function(error, results, fields) {
        // Release the connection back to the pool
        connection.release();
  
        if (error) {
          console.error(error);
          return;
        }
  
        console.log(`Selected ${results.length} row(s) from ${tableName} table`);
        console.log(results);
      });
    });
  }
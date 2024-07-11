import db from '../db'

/**
 * Executes a given stored procedure with specified parameters as an object.
 * @param {string} procedureName - The name of the stored procedure to execute.
 * @param {Object} paramsObj - An object containing the parameters to pass to the procedure.
 * @returns {Promise<Array>} - The rows returned from the procedure execution.
 */
// const executeFunction = async (procedureName, paramsObj) => {
//   try {
//     // Convert the paramsObj into an array of values
//     const params = Object.values(paramsObj)

//     // Construct the SQL command to execute the stored procedure
//     const queryText = `SELECT * FROM ${procedureName}(${params.map((_, i) => `$${i + 1}`).join(', ')})`

//     // Execute the query
//     const result = await db.query(queryText, params)

//     // Output the results for verification
//     console.log('Procedure executed. Number of rows returned:', result.rows.length)
//     return result.rows
//   } catch (error) {
//     console.error('Error executing stored procedure', error.stack)
//     throw error
//   }
// }

// const executeFunction = async (procedureName, paramsObj = {}) => {
//   try {
//     // Convert the paramsObj into an array of values
//     const params = Object.values(paramsObj)

//     // Construct the SQL command to execute the stored procedure
//     const queryText = `SELECT * FROM ${procedureName}(${params.map((_, i) => `$${i + 1}`).join(', ')})`

//     // Execute the query
//     const result = await db.query(queryText, params)

//     // Output the results for verification
//     console.log('Procedure executed. Number of rows returned:', result.rows.length)
//     return result.rows
//   } catch (error) {
//     console.error('Error executing stored procedure', error)
//     throw error
//   }
// }

const executeFunction = async (procedureName, paramsObj = {}) => {
  try {
    // Convert the paramsObj into an array of values
    const params = Object.values(paramsObj)

    // Construct the SQL command to execute the stored procedure
    const queryText = `SELECT * FROM ${procedureName}(${params.map((_, i) => `$${i + 1}`).join(', ')})`

    // Execute the query
    const result = await db.query(queryText, params)

    // Output the results for verification
    console.log('Procedure executed. Number of rows returned:', result.rows.length)
    return result.rows
  } catch (error) {
    // Check for PostgreSQL RAISE EXCEPTION messages
    if (error.code === 'P0001') {
      // Throw the exact error message from PostgreSQL
      throw new Error(error.message)
    }

    console.error('Error executing stored procedure', error)
    throw error
  }
}

export default executeFunction

const sql = require("mssql");
var Promise = require("promise");

const config = {
  user: process.env.DB_USER || "pongpanot.sa",
  password: process.env.DB_PASSWORD || "Bank01470147",
  server: process.env.DB_SERVER || "192.168.1.30",
  database: "MconOil_T",
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

async function connectDB() {
  const pool = new sql.ConnectionPool(config);

  try {
    await pool.connect();
    //console.log('Connected to database');

    return pool;
  } catch (err) {
    console.log("Database connection failed!", err);

    return err;
  }
}

// const api = async (query,rowsAffected) => {
//     const DB = await connectDB(config)

//     try {
//         const result = await DB.request().query(query);
//         //console.log(result)
//         if(rowsAffected == true){
//             return result.rowsAffected[0]
//         }

//         return  result.recordset;
//     }
//     catch (err) {
//         console.log('Error querying database', err);

//         throw err;
//     }
//     finally {
//         DB.close();
//     }

// }

const api = async (query, rowsAffected, type, table) => {
  //await poolConnect;
  try {
    let pool = await sql.connect(config);

    if (type == "bulk") {
      await pool.request().bulk(table);

      pool.close;
      sql.close;
      return true;
    } else {
      let data = await pool.request().query(query);

      pool.close;
      sql.close;

      if (rowsAffected == true) {
        return data.rowsAffected[0];
      } else {
        return data.recordset;
      }
    }
  } catch (e) {
    throw e;
  }
};

module.exports = api;

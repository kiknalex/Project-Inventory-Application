const pool = require("./pool");

const getAllGames = async () => {
  const { rows } = await pool.query("SELECT * FROM games");
  return rows;
};

const getGameDetails = async (id) => {
  const { rows } = await pool.query("SELECT * FROM games INNER JOIN tech_info ON games.gameid = tech_info.gameid WHERE games.gameid = $1", [id]);
  return rows;
};

const deleteRow = async (rowId) => {
  try {
    await pool.query("DELETE FROM games WHERE gameId = $1", [rowId]);
    console.log("Row deleted.");
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllGames,
  getGameDetails,
  deleteRow,
};

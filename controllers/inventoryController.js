const db = require("../db/queries.js");
exports.displayIndex = async (req, res) => {
  const rows = await db.getAllGames();
  res.render("index", {
    rows: rows,
  });
};

exports.deleteRow = async (req, res) => {
  const rowId = parseInt(req.params.id, 10);

  if (typeof rowId === "number") {
    console.log(rowId + "row has been deleted");
    db.deleteRow(rowId);
  } else {
    console.error("Wrong ID");
  }
  res.redirect("/");
};

exports.displayGameDetails = async (req, res) => {
  const gameId = parseInt(req.params.id, 10);
  console.log("This controller gets called 2 times o.o", gameId);

  if (typeof gameId === "number" && !isNaN(gameId)) {
    const rows = await db.getGameDetails(gameId);
    res.render("gamedetails", {
      rows: rows,
    });
  } else {
    console.error("Wrong ID");
    res.send("Bad ID");
  }
};

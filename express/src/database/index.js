const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
//db.post = require("./models/post.js")(db.sequelize, DataTypes);
db.movie = require("./models/movie.js")(db.sequelize, DataTypes);
db.reservation = require("./models/reservation.js")(db.sequelize, DataTypes);
db.session = require("./models/session.js")(db.sequelize, DataTypes);
db.review = require("./models/review.js")(db.sequelize, DataTypes);


// Relate post and user.
//db.post.belongsTo(db.user, { foreignKey: { name: "username", allowNull: false } });

// Relate review and user.
db.review.belongsTo(db.user, { foreignKey: { name: "username", allowNull: false },onDelete: 'CASCADE' });
db.review.belongsTo(db.movie, { foreignKey: { name: "movie_id", allowNull: false },onDelete: 'CASCADE'});
 
db.reservation.belongsTo(db.user, { foreignKey: { name: "username", allowNull: false },onDelete: 'CASCADE'});
db.reservation.belongsTo(db.session, { foreignKey: { name: "session_id", allowNull: false },onDelete: 'CASCADE'});

db.session.belongsTo(db.movie, { foreignKey: { name: "movie_id", allowNull: false },onDelete: 'CASCADE'});


// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema. force: true - Add this parameter below if you are facing any issues with sql
  await db.sequelize.sync({  });

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });
  
  await seedData();
};

async function seedData() {
  const count = await db.user.count();

  // Only seed data if necessary.
  if(count > 0)
    return;

  const argon2 = require("argon2");

  let hash = await argon2.hash("abc123", { type: argon2.argon2id });
  await db.user.create({ username: "yashb", password_hash: hash, first_name: "Yash", last_name : "Bhadra" });

  hash = await argon2.hash("def456", { type: argon2.argon2id });
  await db.user.create({ username: "shekhar", password_hash: hash, first_name: "Shekhar", last_name : "Kalra" });
}

module.exports = db;

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
  await db.sequelize.sync({ });

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
  await db.user.create({ username: "yashb", password_hash: hash, email: "yash@gmail.com"});

  hash = await argon2.hash("def456", { type: argon2.argon2id });
  await db.user.create({ username: "vish", password_hash: hash, email : "vish@gmail.com" });

  hash = await argon2.hash("admin", { type: argon2.argon2id });
  await db.user.create({ username: "admin", password_hash: hash, email : "admin@loopcinema.com" });

  await db.movie.create({ movie_name: "Gran Turismo" });
  await db.movie.create({ movie_name: "Blue Beetle" });
  await db.movie.create({ movie_name: "Oppenheimer" });

  await db.session.create({ session_time: "10:00:00", session_ticket_count: "10", movie_id: "1" });
  await db.session.create({ session_time: "02:00:00", session_ticket_count: "10", movie_id: "1" });

  await db.session.create({ session_time: "11:00:00", session_ticket_count: "10", movie_id: "2" });
  await db.session.create({ session_time: "03:00:00", session_ticket_count: "10", movie_id: "2" });

  await db.session.create({ session_time: "12:00:00", session_ticket_count: "10", movie_id: "3" });
  await db.session.create({ session_time: "04:00:00", session_ticket_count: "10", movie_id: "3" });

}  
module.exports = db;

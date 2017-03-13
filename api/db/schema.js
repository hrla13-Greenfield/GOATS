const Sequelize = require('sequelize');
const db = require('./db.js');

const User = db.define('User', {
  username: Sequelize.STRING,
  // password?
  current: Sequelize.STRING, // current activity selection
  points: Sequelize.STRING,
});

const Group = db.define('Group', {
  name: Sequelize.STRING,
});

const UserGroup = db.define('UserGroup', {});

const UserHistory = db.define('UserHistory', {
  name: Sequelize.STRING,
  url: Sequelize.STRING,
  image: Sequelize.STRING,
  address: Sequelize.STRING,
  open_hours: Sequelize.STRING,
  category: Sequelize.STRING,
  user_rating: Sequelize.STRING,
});

const PendingInvites = db.define('PendingInvites', {});

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });
UserHistory.belongsTo(User);
User.hasOne(UserHistory);
User.hasMany(PendingInvites);
PendingInvites.belongsTo(User);

User.sync();
Group.sync();
UserGroup.sync();
UserHistory.sync();
PendingInvites.sync();

exports.User = User;
exports.Group = Group;
exports.UserGroup = UserGroup;
exports.UserHistory = UserHistory;

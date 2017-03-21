const Sequelize = require('sequelize');
const db = require('./db.js');

//User table connects to Group through UserGroups [junction table]

const User = db.define('User', {
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  username: Sequelize.STRING,
  current: Sequelize.STRING,
  points: Sequelize.STRING,
  image: Sequelize.STRING,
});

const Group = db.define('Group', {
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  name: Sequelize.STRING,
});

const UserGroup = db.define('UserGroup', {
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

const UserHistory = db.define('UserHistory', {
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  name: Sequelize.STRING,
  url: Sequelize.STRING,
  image: Sequelize.STRING,
  address: Sequelize.STRING,
  open_hours: Sequelize.STRING,
  category: Sequelize.STRING,
  phone: Sequelize.STRING,
  user_rating: Sequelize.STRING,
});

const PendingInvites = db.define('PendingInvites', {
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  sentBy: Sequelize.INTEGER,
});

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });
UserHistory.belongsTo(User);
User.hasOne(UserHistory);
User.hasMany(PendingInvites);
PendingInvites.belongsTo(User);
PendingInvites.belongsTo(Group);

User.sync();
Group.sync();
UserGroup.sync();
UserHistory.sync();
PendingInvites.sync();

exports.User = User;
exports.Group = Group;
exports.UserGroup = UserGroup;
exports.UserHistory = UserHistory;
exports.PendingInvites = PendingInvites;

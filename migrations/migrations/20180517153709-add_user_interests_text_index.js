'use strict';

module.exports = {
  up(db, next) {
    db
      .collection('usermodels')
      .createIndex(
        { content: 'text', interests: 'text' },
        { name: 'userinterests' },
      );
    next();
  },

  down(db, next) {
    db.collection('usermodels').dropIndex('userinterests');
    next();
  },
};

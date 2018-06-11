'use strict';
module.exports = {
    up: function (db, next) {
        db
            .collection('usermodels')
            .createIndex({ content: 'text', interests: 'text' }, { name: 'userinterests' });
        next();
    },
    down: function (db, next) {
        db.collection('usermodels').dropIndex('userinterests');
        next();
    },
};
//# sourceMappingURL=20180517153709-add_user_interests_text_index.js.map
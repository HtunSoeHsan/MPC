const orm = require('../config/orm');

const messages = {
    name: 'messages',

    listAll: async function() {
        const result = await orm.selectAll(this.name)
        return result;
    },

    getRoomMsgs: async function(roomId,userId) {
        const result = await orm.directQuery(
        `SELECT messages.room_id, messages.user_id, users.avatar_dirct, users.display_name, messages.message_body 
        FROM messages LEFT JOIN users ON users.id = user_id WHERE room_id = ${roomId};`);
        return result;
    },

    getMyRoomMsgs: async function(roomId,userId) {
        const result = await orm.directQuery(
        `SELECT messages.room_id, users.avatar_dirct, users.display_name, messages.message_body 
        FROM messages LEFT JOIN users ON users.id = user_id WHERE room_id = ${roomId} AND user_id =${userId};`);
        return result;
    },

    // add message output: { user, channel, msg }
    addMsgToRoom: async function(userId, roomId, msg) {
        const variableQuery = `(user_id, room_id, message_body)`;
        const dataQuery = `(${userId}, ${roomId}, \'${msg}\')`;
        await orm.insertOne(this.name,variableQuery,dataQuery);
    },

    // delete all messages for 1 room output: { message: 'success' or 'failure' }
    removeMsgByRoom: async function(roomID) {
        const index = `room_id = ${roomID}`;
        await orm.deleteOne(this.name, index);
    }
};

module.exports = messages;
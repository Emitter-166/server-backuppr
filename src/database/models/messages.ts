import { Sequelize, INTEGER, STRING, BLOB, BOOLEAN } from "sequelize";

export const model = (sequelize: Sequelize) => {
    sequelize.define('messages', {
       channelId: {
        type: STRING
       },
       userId: {
        type: STRING
       },
       messageId: {
        type: STRING
       },
       time: {
        type: INTEGER
       },
       content: {
        type: BLOB
       },
       attachments: {
        type: BOOLEAN
       },
       reactions: {
        type: STRING
       }

    })
}
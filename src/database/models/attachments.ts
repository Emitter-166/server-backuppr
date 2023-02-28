import { Sequelize, INTEGER, STRING, BLOB } from "sequelize";

export const model = (sequelize: Sequelize) => {
    sequelize.define('attachments', {
       messageId: {
        type: STRING
       },
       name: {
        type: STRING
       },
       attachments: {
        type: BLOB
       }
    })
}
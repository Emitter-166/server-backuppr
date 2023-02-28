import {
    Client,
    Collection,
    GuildTextBasedChannel,
    IntentsBitField,
    Message,
    TextBasedChannel,
    TextChannel
} from 'discord.js';
import * as path from 'path';
import * as fs from 'fs';
import {
    Sequelize
} from 'sequelize';

require('dotenv').config({
    path: path.join(__dirname, ".env")
})


export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'backup.db',
    logging: false
})


const path_to_models = path.join(__dirname, 'database', 'models');

fs.readdirSync(path_to_models)
    .forEach(modelFile => {
        const model = require(path.join(path_to_models, modelFile));
        model.model(sequelize);
    })




sequelize.sync({
    alter: true
}).then(sequelize => {
    client.login(process.env._TOKEN);
})


const F = IntentsBitField.Flags;
const client = new Client({
    intents: [F.Guilds, F.GuildMessages, F.GuildMembers, F.MessageContent]
})


client.once('ready', async (client) => {
    console.log("ready");

    const msg = await get_msg("1014257444337238147", "1080101590884692011");
    console.log(msg.attachments.at(0));

})



export const backup = async (serverId: string, client: Client) => {
    const guild = await client.guilds.fetch(serverId);

    const channels = await guild.channels.fetch();

    const messages_model = sequelize.model("messages");
    const attachments_model = sequelize.model("attachments")

    //going over every channels 
    for (let raw_channel of channels) {

        if (raw_channel[1] === null) return;
        if (!raw_channel[1].isTextBased) return;

        const channel = raw_channel[1] as GuildTextBasedChannel




        let messages = [];
        let attachments = [];
        
        let raw_messages = new Collection<string, Message>();

        let last = "";

        do {
             raw_messages = last !== "" ? await channel.messages.fetch({limit: 100}) : await channel.messages.fetch({
                before: last,
                limit: 100
            })

            messages = raw_messages.map(msg => {

                //handling attachments
                msg.attachments.forEach(async attachment => {
                    const data = (await fetch(attachment.url)).body;

                });
            })

        } while (raw_messages.size === 100)


    }
}

const get_msg = async (channelId: string, msg: string) => {
    const channel = (await client.channels.fetch(channelId)) as GuildTextBasedChannel;
    return channel.messages.fetch(msg);
}
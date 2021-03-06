const ModeratorBot = require('../classes/Client.js');
const { Message } = require('discord.js');

module.exports = {
    name: 'delrole',
    aliases: [],

    /**
     * @param {ModeratorBot} client Discord Client
     * @param {Message} message Discord Message
     * @param {String[]} args Command Arguments
    */
    run: async(client, message, args) => {
        const member = message.mentions.members.last();
        const role = message.mentions.roles.last() || args.slice(1).join(' ');

        if(!member) return message.reply('specify user for removing role!');
        if(!role) return message.reply('specify role for removing!');

        client.moderator.roles.remove(member, role)
        .then(data => {
            return message.channel.send(`${role} successfully removed!`);
        })
        .catch(err => {
            return message.reply(err.message);
        })
    }
}
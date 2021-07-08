# Examples for creating a bot

This is just the smallest part of what can be done. More examples can be found here: **[discord-moderator/examples](https://github.com/xyligan-gp/discord-moderator/tree/master/example)**

## Client and module initialization
```JS
const Discord = require('discord.js');
const client = new Discord.Client();
const Moderator = require('discord-moderator');
const moderator = new Moderator(client, {
    muteManager: true,
    warnManager: true,

    muteConfig: {
        tableName: 'mutes',
        checkCountdown: '10s'
    },

    warnConfig: {
        tableName: 'warns',
        maxWarns: 3,
        punishment: 'tempmute',
        muteTime: '12h'
    }
});

client.on('ready', () => {
    console.log(`${client.user.tag} ready!`);
});

client.login('YOUR_BOT_TOKEN_HERE');
```

## Bot command initialization
```JS
client.on('message', message => {
    const messageArray = message.content.split(' ');
    const command = messageArray[0];
    const args = messageArray.slice(1);
});
```

## Writing bot commands

### Command `kick`
```JS
if(command === '!kick') {
    if(!moderator.utils.checkMemberPermissions(['KICK_MEMBERS'], message.member)) return;

    const member = message.mentions.members.last();
    const reason = args.slice(1).join(' ');

    moderator.punishments.kick(member, reason, message.author.id);
}
```

### Command `ban`

```JS
if(command === '!ban') {
    if(!moderator.utils.checkMemberPermissions(['KICK_MEMBERS'], message.member)) return;

    const member = message.mentions.members.last();
    const reason = args.slice(1).join(' ');

    moderator.punishments.ban(member, reason, message.author.id);
}
```

### Command `mute`

```JS
if(command === '!mute') {
    if(!moderator.utils.checkMemberPermissions(['KICK_MEMBERS'], message.member)) return;

    const member = message.mentions.members.last();
    const roleID = '295193127333241854';
    const reason = args.slice(1).join(' ');

    moderator.mutes.add(member, message.channel, roleID, reason);
}
```

### Command `tempmute`

```JS
if(command === '!tempmute') {
    if(!moderator.utils.checkMemberPermissions(['KICK_MEMBERS'], message.member)) return;

    const member = message.mentions.members.last();
    const roleID = '295193127333241854';
    const time = '1d';
    const reason = args.slice(1).join(' ');

    moderator.mutes.temp(member, message.channel, roleID, time, reason);
}
```

### Command `unmute`

```JS
if(command === '!unmute') {
    if(!moderator.utils.checkMemberPermissions(['KICK_MEMBERS'], message.member)) return;

    const member = message.mentions.members.last();

    moderator.mutes.remove(member);
}
```

## Module events and work with them

### Event `ready`

```JS
moderator.on('ready', client => {
    console.log('Discord Moderator ready!');
});
```

### Event `addMute`

```JS
moderator.on('addMute', data => {
    const guild = client.guilds.cache.get(data.guildID);
    const member = guild.members.cache.get(data.userID);

    return console.log(`User ${member.user.tag} got a mute on server ${guild.name} for ${data.muteReason}!`);
});
```

### Event `addWarn`

```JS
moderator.on('addWarn', data => {
    const guild = client.guilds.cache.get(data.guildID);
    const member = guild.members.cache.get(data.userID);

    return console.log(`User ${member.user.tag} got a warn on server ${guild.name} for ${data.warnReason}!`);
});
```

### Event `ban`

```JS
moderator.on('ban', data => {
    const guild = client.guilds.cache.get(data.guildID);
    const member = guild.members.cache.get(data.userID);

    return console.log(`User ${member.user.tag} banned on server ${guild.name} for ${data.reason}!`);
});
```

### Event `kick`

```JS
moderator.on('kick', data => {
    const guild = client.guilds.cache.get(data.guildID);
    const member = guild.members.cache.get(data.userID);

    return console.log(`User ${member.user.tag} kicked on server ${guild.name} for ${data.reason}!`);
});
```

### Event `muteEnded`

```JS
moderator.on('muteEnded', data => {
    const guild = client.guilds.cache.get(data.guildID);
    const member = guild.members.cache.get(data.userID);

    return console.log(`User ${member.user.tag} expired mute on server ${guild.name}!`);
});
```

### Event `removeMute`

```JS
moderator.on('removeMute', data => {
    const guild = client.guilds.cache.get(data.guildID);
    const member = guild.members.cache.get(data.userID);

    return console.log(`User ${member.user.tag} unmuted on server ${guild.name}!`);
});
```

### Event `removeWarn`

```JS
moderator.on('removeWarn', data => {
    const guild = client.guilds.cache.get(data.guildID);
    const member = guild.members.cache.get(data.userID);

    return console.log(`User ${member.user.tag} unwarned on server ${guild.name}!`);
});
```
const { Client } = require('discord.js');
const client = new Client({
    partials: ['MESSAGE', 'REACTION']
});
require('dotenv').config();

const PREFIX = "$";

client.on('ready', () => {
    console.log(`The bot ${client.user.tag} has logged in.`)
});

client.on('messageReactionAdd', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === '780571065537396776') {
        switch (name) {
            case '🍎':
                member.roles.add('780577710753841162');
                break
            case '🎮':
                member.roles.add('780577362516377640');
                break
            case '🤡':
                member.roles.add('780577976802213909');
                break
            case '💩':
                member.roles.add('780330415071821835');
                break
        }
    };
});

client.on('messageReactionRemove', (reaction, user) => {
    console.log('hello')
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === '780571065537396776') {
        switch (name) {
            case '🍎':
                member.roles.remove('780577710753841162');
                break
            case '🎮':
                member.roles.remove('780577362516377640');
                break
            case '🤡':
                member.roles.remove('780577976802213909');
                break
            case '💩':
                member.roles.remove('780330415071821835');
                break
        }
    }
});

client.on('message', async (message) => {
    if(message.author.bot) return;
    if(message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);        
        if (CMD_NAME === 'kick') {
            if(!message.member.hasPermission('KICK_MEMBERS')) 
                return message.reply('You do not have permissions to use that command.');
            if (args.length === 0) return message.reply('Please provide an ID');
            const member = message.guild.members.cache.get(args[0]);
            if (member) {
                member
                    .kick()
                    .then((member) => message.channel.send(`${member} was kicked.`))
                    .catch((err) => message.channel.send('I do not have permissions :('));
            } else {
                message.channel.send('That member was not found');
            }
        } else if (CMD_NAME === 'ban') {
            if(!message.member.hasPermission('BAN_MEMBERS')) 
            return message.reply('You do not have permissions to use that command.');
            if (args.length === 0) return message.reply('Please provide an ID');
            
            try {
                const user = await message.guild.members.ban(args[0]);
                message.channel.send('User was banned succesfully');
            } catch (err) {
                console.log(err);
                message.channel.send('An error occured. Either I do not have permissions or the user was not found');
            }
        }
    } 
});
 
client.on('message', msg => {
    if(msg.author.bot) return;
    if(msg.content.toLowerCase() == 'ping') {
        msg.reply('Pong');
    }
    if(msg.content.toLowerCase() == 'deja de seguirme') {
        msg.reply('deja de seguirme');
    }
    if(msg.content.includes('!count')) {
        msg.reply(`Numero de miembros: ${msg.guild.memberCount}`)
    }
});


client.login(process.env.TOKEN);
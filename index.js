require('dotenv').config();

const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;


const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    Partials: [User, Message, GuildMember, ThreadMember],
});

const { loadEvents } = require('./handlers/eventHandler');

client.events = new Collection();
client.commands = new Collection();
const { connect } = require('mongoose');
connect(process.env.databaseURL, {
}).then(() => console.log('Client is connected to database!'));
loadEvents(client);

client.login(process.env.DISCORD_TOKEN);

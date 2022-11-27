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

loadEvents(client);

client.login(process.env.DISCORD_TOKEN);

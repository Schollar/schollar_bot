const { REST, Routes, client } = require('discord.js');
require('dotenv').config();
const fs = require('node:fs');
require('./deploy-commands.js');

const commands = [];

const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        commands.push(command.data.toJSON());
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

// and deploy your commands!
async function deployCommands() {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationCommands(process.env.clientId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    }
    catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
}

module.exports = { deployCommands };
// Update commands from cli while bot is running
// node -e 'require(\"./deploy-commands.js\").deployCommands()'

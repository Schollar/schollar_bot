require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
    console.log(`
    \r\n ______     ______     __  __     ______     __         __         ______     ______     ______     ______     ______  \r\n\/\\  ___\\   \/\\  ___\\   \/\\ \\_\\ \\   \/\\  __ \\   \/\\ \\       \/\\ \\       \/\\  __ \\   \/\\  == \\   \/\\  == \\   \/\\  __ \\   \/\\__  _\\ \r\n\\ \\___  \\  \\ \\ \\____  \\ \\  __ \\  \\ \\ \\\/\\ \\  \\ \\ \\____  \\ \\ \\____  \\ \\  __ \\  \\ \\  __<   \\ \\  __<   \\ \\ \\\/\\ \\  \\\/_\/\\ \\\/ \r\n \\\/\\_____\\  \\ \\_____\\  \\ \\_\\ \\_\\  \\ \\_____\\  \\ \\_____\\  \\ \\_____\\  \\ \\_\\ \\_\\  \\ \\_\\ \\_\\  \\ \\_____\\  \\ \\_____\\    \\ \\_\\ \r\n  \\\/_____\/   \\\/_____\/   \\\/_\/\\\/_\/   \\\/_____\/   \\\/_____\/   \\\/_____\/   \\\/_\/\\\/_\/   \\\/_\/ \/_\/   \\\/_____\/   \\\/_____\/     \\\/_\/ \r\n                                                                                                                       \r\n
    `);
    console.log(`
    \r\n ______     __   __     __         __     __   __     ______    \r\n\/\\  __ \\   \/\\ \"-.\\ \\   \/\\ \\       \/\\ \\   \/\\ \"-.\\ \\   \/\\  ___\\   \r\n\\ \\ \\\/\\ \\  \\ \\ \\-.  \\  \\ \\ \\____  \\ \\ \\  \\ \\ \\-.  \\  \\ \\  __\\   \r\n \\ \\_____\\  \\ \\_\\\\\"\\_\\  \\ \\_____\\  \\ \\_\\  \\ \\_\\\\\"\\_\\  \\ \\_____\\ \r\n  \\\/_____\/   \\\/_\/ \\\/_\/   \\\/_____\/   \\\/_\/   \\\/_\/ \\\/_\/   \\\/_____\/ \r\n                                                                \r\n
        `);
});
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(process.env.DISCORD_TOKEN);
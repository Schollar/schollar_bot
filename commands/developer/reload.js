/* eslint-disable curly */
const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, Client } = require('discord.js');
const { loadCommands } = require('../../handlers/commandHandler');
const { loadEvents } = require('../../handlers/eventHandler');

module.exports = {
    devloper: true,
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reload commands/events.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand((options) => options
            .setName('events')
            .setDescription('Reload your events.'))
        .addSubcommand((options) => options
            .setName('commands')
            .setDescription('Reload your commands')),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const subCommand = interaction.options.getSubcommand();

        switch (subCommand) {
            case 'events': {
                for (const [key, value] of client.events)
                    client.removeListener(`${key}`, value, true);
                loadEvents(client);
                await interaction.reply({ content: 'Reloaded Events', ephemeral: true });
            } break;
            case 'commands': {
                loadCommands(client);
                await interaction.reply({ content: 'Reloaded Commands', ephemeral: true });
            }
                break;
        }
    },
};
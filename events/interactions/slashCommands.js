const { ChatInputCommandInteraction } = require('discord.js');
module.exports = {
    name: 'interactionCreate',
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) {
            return interaction.reply(
                {
                    content: 'Command is outdated.',
                    ephemeral: true,
                });
        }
        if (command.developer && interaction.user.id !== '175803472007004160') {
            return interaction.reply(
                {
                    content: 'Command only availible to developers.',
                    ephemeral: true,
                });
        }

        command.execute(interaction, client);
    },
};
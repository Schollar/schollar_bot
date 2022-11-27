const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pongers!'),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        await interaction.reply({ content: 'Pong', ephemeral: true });
    },
};
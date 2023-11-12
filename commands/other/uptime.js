const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('uptime')
    .setDescription('Krijg te zien hoelang de bot sessie online is.'),

    async execute(interaction) {
        const { client } = interaction;
        const days = Math.floor(client.uptime / 86400000)
        const hours = Math.floor(client.uptime / 3600000) % 24
        const minutes = Math.floor(client.uptime / 60000) % 60
        const seconds = Math.floor(client.uptime / 1000) % 60

        interaction.reply({ content: `Ik ben nu ${days} dagen, ${hours} uur, ${minutes} minuten en ${seconds} seconden online!`, ephemeral: true })
    }
}
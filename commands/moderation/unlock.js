const { SlashCommandBuilder, ChannelType, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unlock')
    .setDescription('Open een kanaal voor alle leden in de Discord server.')
    .addChannelOption(channel => channel
        .setName('kanaal')
        .setDescription('Kies een kanaal om te openen voor alle leden.')
        .addChannelTypes(ChannelType.GuildText)
    ),

    async execute(interaction) {
        if(!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply({ text: 'Je hebt niet de juiste permissies om deze actie uit te voeren.', ephemeral: true })

        const channel = interaction.options.getChannel('kanaal');

        channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
            [PermissionFlagsBits.SendMessages]: true,
        });

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Zortus Roleplay - Moderatie', iconURL: 'https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&' })
            .setColor(0xFFFFFF)
            .setDescription(`Kanaal <#${channel.id}> is geopend voor leden van de Discord server.`)

        await interaction.reply({ embeds: [embed], ephemeral: true })
    }
}
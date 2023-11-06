const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('Voeg een gebruiker toe aan je ticket.')
        .addUserOption(user => user
            .setName('gebruiker')
            .setDescription('Selecteer een gebruiker.')
            .setRequired(true)
        ),

    async execute(interaction) {
        const gebruiker = interaction.options.getUser('gebruiker');

        interaction.channel.permissionOverwrites.edit(gebruiker.id, {
            [PermissionFlagsBits.ViewChannel]: true,
            [PermissionFlagsBits.SendMessages]: true,
            [PermissionFlagsBits.AttachFiles]: true,
            [PermissionFlagsBits.ReadMessageHistory]: true,
        }).then(() => {
            const embed = new EmbedBuilder()
                .setAuthor({ name: 'Zortus Roleplay - Ticket', iconURL: 'https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&' })
                .setColor(0xFFFFFF)
                .setDescription(`${interaction.user} heeft zojuist ${gebruiker.user} toegevoegd aan deze ticket!`)

            interaction.reply({ embeds: [embed] });
        });
    }
}
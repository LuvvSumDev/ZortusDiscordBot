const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Unban een gebruiker van de Discord server')
    .addStringOption(option => option
        .setName('gebruiker-id')
        .setDescription('ID van de gebruiker die een unban moet krijgen')
        .setRequired(true)
    ),

    async execute(interaction) {
        const unbanUser = interaction.options.getString('gebruiker-id');

        await interaction.guild.members.unban(unbanUser);

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Zortus Roleplay - Moderatie', iconURL: 'https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&' })
            .setColor(0xFFFFFF)
            .setDescription(`Een gebruiker heeft zojuist een unban gekregen van de Discord server!`)
            .setFields(
                {
                    name: "Gebruiker:",
                    value: `<@${unbanUser}>`,
                    inline: false
                },
                {
                    name: "Unban gekregen van:",
                    value: `<@${interaction.member.id}>`,
                    inline: false
                }
            )

        await interaction.reply({ embeds: [embed] });
    }
}
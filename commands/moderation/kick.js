const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick een gebruiker uit de server')
    .addUserOption(option => option
        .setName('gebruiker')
        .setDescription('Selecteer de gebruiker')
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName('reden')
        .setDescription('Geef een reden op')
        .setRequired(true)
    ),

    async execute(interaction){
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.reply({ content: 'Je hebt niet de juiste permissies om deze actie uit te voeren.', ephemeral: true })

        const kickUser = interaction.options.getUser('gebruiker');
        const kickMember = interaction.guild.members.cache.get(kickUser.id);
        const reason = interaction.options.getString('reden') || 'Geen reden opgegeven.';

        const DMEmbed = new EmbedBuilder()
            .setAuthor({ name: 'Zortus Roleplay - Moderatie', iconURL: 'https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&' })
            .setColor(0xFFFFFF)
            .setDescription('Je bent gekicked van de Zortus Roleplay Discord server!')
            .setFields(
                {
                    name: "Gekicked door:",
                    value: `<@${interaction.member.id}>`,
                    inline: false
                },
                {
                    name: "Opgegeven reden:",
                    value: `${reason}`,
                    inline: false
                }
            )

        await kickMember.send({ embeds: [DMEmbed] }).catch(err => {
            return;
        });

        await interaction.guild.members.kick(kickUser);

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Zortus Roleplay - Moderatie', iconURL: 'https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&' })
            .setColor(0xFFFFFF)
            .setDescription(`Er is een gebruiker van de Discord server gekicked!`)
            .setFields(
                {
                    name: "Gebruiker:",
                    value: `<@${kickUser.id}>`,
                    inline: false
                },
                {
                    name: "Gekicked door:",
                    value: `<@${interaction.member.id}>`,
                    inline: false
                },
                {
                    name: "Opgegeven reden:",
                    value: `${reason}`,
                    inline: false
                }
            )

        await interaction.reply({ embeds: [embed] });
    }
}
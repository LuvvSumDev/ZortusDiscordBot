const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Verban een gebruiker uit de server')
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
        const banUser = interaction.options.getUser('gebruiker');
        const banMember = interaction.guild.members.cache.get(banUser.id);
        const reason = interaction.options.getString('reden');
        
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.reply({ content: 'Je hebt niet de juiste permissies om deze actie uit te voeren.', ephemeral: true })

        const DMEmbed = new EmbedBuilder()
            .setAuthor({ name: 'Zortus Roleplay - Moderatie', iconURL: 'https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&' })
            .setColor(0xFFFFFF)
            .setDescription('Je bent verbannen van de Zortus Roleplay Discord server!')
            .setFields(
                {
                    name: "Verbannen door:",
                    value: `<@${interaction.member.id}>`,
                    inline: false
                },
                {
                    name: "Opgegeven reden:",
                    value: `${reason}`,
                    inline: false
                }
            )

        await banMember.send({ embeds: [DMEmbed] }).catch(err => {
            return;
        });
        
        await interaction.guild.members.ban(banUser);

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Zortus Roleplay - Moderatie', iconURL: 'https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&' })
            .setColor(0xFFFFFF)
            .setDescription(`Er is een gebruiker van de Discord server verbannen!`)
            .setFields(
                {
                    name: "Gebruiker:",
                    value: `<@${banUser.id}>`,
                    inline: false
                },
                {
                    name: "Verbannen door:",
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
const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Geef een gebruiker een time-out.')
        .addUserOption(option => option
            .setName('gebruiker')
            .setDescription('Selecteer de gebruiker')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('duur')
            .setDescription('De duur van de time-out')
            .setRequired(true)
            .addChoices(
                { name: '60 Seconden', value: '60' },
                { name: '2 Minuten', value: '120' },
                { name: '5 Minuten', value: '300' },
                { name: '10 Minuten', value: '600' },
                { name: '15 Minuten', value: '900' },
                { name: '20 Minuten', value: '1200' },
                { name: '30 Minuten', value: '1800' },
                { name: '45 Minuten', value: '2700' },
                { name: '1 Uur', value: '3600' },
                { name: '2 Uur', value: '7200' },
                { name: '3 Uur', value: '10800' },
                { name: '5 Uur', value: '18000' },
                { name: '10 Uur', value: '36000' },
                { name: '1 Dag', value: '86400' },
                { name: '2 Dagen', value: '172800' },
                { name: '3 Dagen', value: '259200' },
                { name: '5 Dagen', value: '432000' },
                { name: '1 Week', value: '604800' },
            )
        )
        .addStringOption(option => option
            .setName('reden')
            .setDescription('De reden van de time-out')
        ),

    async execute(interaction) {
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return interaction.reply({ content: 'Je hebt niet de juiste permissies om deze actie uit te voeren.', ephemeral: true })

        const timeOutUser = interaction.options.getMember('gebruiker');
        const timeOutMember = interaction.guild.members.fetch(timeOutUser.id);
        const duration = interaction.options.getString('duur');
        const reason = interaction.options.getString('reden') || 'Geen reden opgegeven.';

        const DMEmbed = new EmbedBuilder()
            .setAuthor({ name: 'Zortus Roleplay - Moderatie', iconURL: 'https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&' })
            .setColor(0xFFFFFF)
            .setDescription('Je hebt een time-out gekregen op de Zortus Discord server!')
            .setFields(
                {
                    name: "Time-out gekregen van:",
                    value: `<@${interaction.member.id}>`,
                    inline: false
                },
                {
                    name: "Duur van time-out:",
                    value: `${duration / 60} minuten`,
                    inline: false
                },
                {
                    name: "Opgegeven reden:",
                    value: `${reason}`,
                    inline: false
                }
            )

        await timeOutUser.send({ embeds: [DMEmbed] }).catch(err => {
            return;
        });

        await timeOutUser.timeout(duration * 1000, reason);

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Zortus Roleplay - Moderatie', iconURL: 'https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&' })
            .setColor(0xFFFFFF)
            .setDescription(`Er heeft een gebruiker van de Discord server een time-out gekregen!`)
            .setFields(
                {
                    name: "Gebruiker:",
                    value: `<@${timeOutUser.id}>`,
                    inline: false
                },
                {
                    name: "Time-out gekregen van:",
                    value: `<@${interaction.member.id}>`,
                    inline: false
                },
                {
                    name: "Duur van time-out:",
                    value: `${duration / 60} minuten`,
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
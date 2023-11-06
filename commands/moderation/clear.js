const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Verwijder 1 of meerdere hier voor gestuurde berichten.')
    .addIntegerOption(option => option
        .setName('aantal')
        .setDescription('Aantal berichten dat je wilt verwijderen.')
        .setRequired(true)
    ),
    async execute(interaction) {
        if(!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.reply({ text: 'Je hebt niet de juiste permissies om deze actie uit te voeren.', ephemeral: true })

        const amount = interaction.options.getInteger('aantal')
        if (parseInt(amount) > 99) {
            return interaction.reply({content: 'Je moet een getal **onder** 99 invullen!', ephemeral: true})
        } else {
            try {
                let { size } = await interaction.channel.bulkDelete(amount)
                await interaction.reply({ content: `Je hebt **${size}** berichten verwijderd.`, ephemeral: true })
            } catch(error) {
                console.log(error)
                return interaction.reply({ content: 'Ik kan geen berichten verwijderen die ouder zijn dan 14 dagen.', ephemeral: true })
            }
        }
    }
}
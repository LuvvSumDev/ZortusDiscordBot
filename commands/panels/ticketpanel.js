const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ticketpanel')
		.setDescription('Maak het ticket paneel aan.'),
	async execute(interaction) {
        const sendChannel = interaction.guild.channels.cache.get(config.ticketChannel)

        const select = new StringSelectMenuBuilder()
			.setCustomId('ticket_choosecategory')
			.setPlaceholder('Waar gaat het ticket over?')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Algemeen ticket')
					.setDescription('🎟️ Geen specifiek onderwerp')
					.setValue('ticket_global'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Refund aanvraag')
					.setDescription('🎟️ Refund aanvraag indienen')
					.setValue('ticket_refund'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Klacht indienen')
					.setDescription('🎟️ Klacht tegen specifiek stafflid of speler')
					.setValue('ticket_klacht'),
				new StringSelectMenuOptionBuilder()
                    .setLabel('Unban aanvragen')
                    .setDescription('🎟️ Je ban aanvechten')
                    .setValue('ticket_unban'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Donatie informatie')
                    .setDescription('🎟️ Vragen omtrend donaties')
                    .setValue('ticket_donation'),
			);

		const row = new ActionRowBuilder()
			.addComponents(select);

        const ticketEmbed = new EmbedBuilder()
            .setColor(0xFFFFFF)
            .setAuthor({ name: 'Zortus Roleplay - Tickets', iconURL: 'https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&' })
            .setDescription('Beste spelers van **Zortus Roleplay**! Je bent op de juiste plek gekomen om een vraag te stellen aan ons team! \n\n Klik op de knop onder dit bericht om een ticket te openen! Kies de beste categorie die bij jouw vraag past, staat deze categorie er niet bij kunnen we deze wellicht later toevoegen.\n\nKies voor nu voor de meest passende categorie!')

        const message = await sendChannel.send({
            embeds: [ticketEmbed],
            components: [row]
        });

        await interaction.reply({ content: 'Je hebt het ticket paneel verstuurd!', ephemeral: true });
	},
};
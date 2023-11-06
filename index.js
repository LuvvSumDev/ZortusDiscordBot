const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Events, ChannelType, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Embed } = require('discord.js');
const config = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isStringSelectMenu()) {
		if (interaction.values[0] === 'ticket_global') {
			await interaction.reply({ content: `Ticket wordt aangemaakt...`, ephemeral: true });

			const support = interaction.guild.roles.cache.get('1169260968501596271');
			const ticket = await interaction.guild.channels.create({
				name: `ticket-${interaction.user.username}`,
				type: ChannelType.GuildText,
				parent: config.ticketCategory,
				permissionOverwrites: [
					{
						id: interaction.user.id,
						allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
					},
					{
						id: support,
						allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
					},
					{
						id: interaction.guild.roles.everyone,
						deny: [PermissionFlagsBits.ViewChannel]
					}
				]
			});

			ticket.setTopic(ticket.id);

			await interaction.editReply({ content: `${ticket} is aangemaakt!`, ephemeral: true });

			const openedTicketEmbed = new EmbedBuilder()
				.setAuthor({ name: 'Zortus Roleplay - Ticket', iconURL: 'https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&' })
				.setColor(0xFFFFFF)
				.setDescription(`Hey ${interaction.user}, bedankt voor het openen van een support ticket op de **Zortus Roleplay** server! Ons team staat klaar om je vragen te beantwoorden! \n\n Om je zo goed mogelijk te helpen vragen we je daarom ook alvast je vraag kort uit te leggen, dit zorgt ervoor dat je direct het juiste persoon te spreken krijgt! \n\n Bedankt voor je medewerking!`)
				.setThumbnail('https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&')

			const openedTicketButtons = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('ticket_sluiten')
						.setLabel('Sluit Ticket')
						.setStyle(ButtonStyle.Secondary),
				)

			await client.channels.cache.get(ticket.id).send({ content: `${interaction.user} & ${support}`, embeds: [openedTicketEmbed], components: [openedTicketButtons] });
		} else if (interaction.values[0] === 'ticket_refund') {
			await interaction.reply({ content: `Ticket wordt aangemaakt...`, ephemeral: true });

			const support = interaction.guild.roles.cache.get('1169260968501596271');
			const ticket = await interaction.guild.channels.create({
				name: `refund-${interaction.user.username}`,
				type: ChannelType.GuildText,
				parent: config.ticketCategory,
				permissionOverwrites: [
					{
						id: interaction.user.id,
						allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
					},
					{
						id: support,
						allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
					},
					{
						id: interaction.guild.roles.everyone,
						deny: [PermissionFlagsBits.ViewChannel]
					}
				]
			});

			ticket.setTopic(ticket.id);

			await interaction.editReply({ content: `${ticket} is aangemaakt!`, ephemeral: true });

			const openedTicketEmbed = new EmbedBuilder()
				.setAuthor({ name: 'Zortus Roleplay - Ticket', iconURL: 'https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&' })
				.setColor(0xFFFFFF)
				.setDescription(`Hey ${interaction.user}, bedankt voor het openen van een support ticket op de **Zortus Roleplay** server! Ons team staat klaar om je vragen te beantwoorden! \n\n Om je zo goed mogelijk te helpen vragen we je daarom ook alvast je vraag kort uit te leggen, dit zorgt ervoor dat je direct het juiste persoon te spreken krijgt! \n\n Bedankt voor je medewerking!`)
				.setThumbnail('https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&')

			const openedTicketButtons = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('ticket_sluiten')
						.setLabel('Sluit Ticket')
						.setStyle(ButtonStyle.Secondary),
				)

			await client.channels.cache.get(ticket.id).send({ content: `${interaction.user} & ${support}`, embeds: [openedTicketEmbed], components: [openedTicketButtons] });
		} else if (interaction.values[0] === 'ticket_klacht') {
			await interaction.reply({ content: `Ticket wordt aangemaakt...`, ephemeral: true });

			const support = interaction.guild.roles.cache.get('1169260968501596271');
			const ticket = await interaction.guild.channels.create({
				name: `klacht-${interaction.user.username}`,
				type: ChannelType.GuildText,
				parent: config.ticketCategory,
				permissionOverwrites: [
					{
						id: interaction.user.id,
						allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
					},
					{
						id: support,
						allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
					},
					{
						id: interaction.guild.roles.everyone,
						deny: [PermissionFlagsBits.ViewChannel]
					}
				]
			});

			ticket.setTopic(ticket.id);

			await interaction.editReply({ content: `${ticket} is aangemaakt!`, ephemeral: true });

			const openedTicketEmbed = new EmbedBuilder()
				.setAuthor({ name: 'Zortus Roleplay - Ticket', iconURL: 'https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&' })
				.setColor(0xFFFFFF)
				.setDescription(`Hey ${interaction.user}, bedankt voor het openen van een support ticket op de **Zortus Roleplay** server! Ons team staat klaar om je vragen te beantwoorden! \n\n Om je zo goed mogelijk te helpen vragen we je daarom ook alvast je vraag kort uit te leggen, dit zorgt ervoor dat je direct het juiste persoon te spreken krijgt! \n\n Bedankt voor je medewerking!`)
				.setThumbnail('https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&')

			const openedTicketButtons = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('ticket_sluiten')
						.setLabel('Sluit Ticket')
						.setStyle(ButtonStyle.Secondary),
				)

			await client.channels.cache.get(ticket.id).send({ content: `${interaction.user} & ${support}`, embeds: [openedTicketEmbed], components: [openedTicketButtons] });
		} else if (interaction.values[0] === 'ticket_unban') {
			await interaction.reply({ content: `Ticket wordt aangemaakt...`, ephemeral: true });

			const support = interaction.guild.roles.cache.get('1169260968501596271');
			const ticket = await interaction.guild.channels.create({
				name: `unban-${interaction.user.username}`,
				type: ChannelType.GuildText,
				parent: config.ticketCategory,
				permissionOverwrites: [
					{
						id: interaction.user.id,
						allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
					},
					{
						id: support,
						allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
					},
					{
						id: interaction.guild.roles.everyone,
						deny: [PermissionFlagsBits.ViewChannel]
					}
				]
			});

			ticket.setTopic(ticket.id);

			await interaction.editReply({ content: `${ticket} is aangemaakt!`, ephemeral: true });

			const openedTicketEmbed = new EmbedBuilder()
				.setAuthor({ name: 'Zortus Roleplay - Ticket', iconURL: 'https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&' })
				.setColor(0xFFFFFF)
				.setDescription(`Hey ${interaction.user}, bedankt voor het openen van een support ticket op de **Zortus Roleplay** server! Ons team staat klaar om je vragen te beantwoorden! \n\n Om je zo goed mogelijk te helpen vragen we je daarom ook alvast je vraag kort uit te leggen, dit zorgt ervoor dat je direct het juiste persoon te spreken krijgt! \n\n Bedankt voor je medewerking!`)
				.setThumbnail('https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&')

			const openedTicketButtons = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('ticket_sluiten')
						.setLabel('Sluit Ticket')
						.setStyle(ButtonStyle.Secondary),
				)

			await client.channels.cache.get(ticket.id).send({ content: `${interaction.user} & ${support}`, embeds: [openedTicketEmbed], components: [openedTicketButtons] });
		} else if (interaction.values[0] === 'ticket_donation') {
			await interaction.reply({ content: `Ticket wordt aangemaakt...`, ephemeral: true });

			const support = interaction.guild.roles.cache.get('1169260968501596271');
			const ticket = await interaction.guild.channels.create({
				name: `donatie-${interaction.user.username}`,
				type: ChannelType.GuildText,
				parent: config.ticketCategory,
				permissionOverwrites: [
					{
						id: interaction.user.id,
						allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
					},
					{
						id: support,
						allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
					},
					{
						id: interaction.guild.roles.everyone,
						deny: [PermissionFlagsBits.ViewChannel]
					}
				]
			});

			ticket.setTopic(ticket.id);

			await interaction.editReply({ content: `${ticket} is aangemaakt!`, ephemeral: true });

			const openedTicketEmbed = new EmbedBuilder()
				.setAuthor({ name: 'Zortus Roleplay - Ticket', iconURL: 'https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&' })
				.setColor(0xFFFFFF)
				.setDescription(`Hey ${interaction.user}, bedankt voor het openen van een support ticket op de **Zortus Roleplay** server! Ons team staat klaar om je vragen te beantwoorden! \n\n Om je zo goed mogelijk te helpen vragen we je daarom ook alvast je vraag kort uit te leggen, dit zorgt ervoor dat je direct het juiste persoon te spreken krijgt! \n\n Bedankt voor je medewerking!`)
				.setThumbnail('https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&')

			const openedTicketButtons = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('ticket_sluiten')
						.setLabel('Sluit Ticket')
						.setStyle(ButtonStyle.Secondary),
				)

			await client.channels.cache.get(ticket.id).send({ content: `${interaction.user} & ${support}`, embeds: [openedTicketEmbed], components: [openedTicketButtons] });
		}
	} else if (interaction.isButton()) {
		if (interaction.customId === 'ticket_sluiten') {
			const closedTicketEmbed = new EmbedBuilder()
				.setAuthor({ name: 'Zortus Roleplay - Ticket', iconURL: 'https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&' })
				.setColor(0xFFFFFF)
				.setDescription('De ticket is gesloten en wordt over 5 seconden verwijderd!')

			interaction.reply({ embeds: [closedTicketEmbed] });

			const ticketLogChannel = interaction.guild.channels.cache.get(config.ticketLogChannel);
			const ticketLogEmbed = new EmbedBuilder()
				.setAuthor({ name: 'Zortus Roleplay - Ticket', iconURL: 'https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&' })
				.setColor(0xFFFFFF)
				.setDescription(`Er is zojuist een ticket gesloten op deze server. Meer informatie over het sluiten van dit ticket vind je hieronder. De transcriptie is ook hier te vinden. 🏷\n\n**__Extra Informatie:__**\n- Ticketnaam: \`Placeholder\`\n- Gesloten door: ${interaction.user}`)

			ticketLogChannel.send({ embeds: [ticketLogEmbed] });

			setTimeout(() => {
				interaction.channel.delete();
			}, 5000);
		}
	}
});

client.login(config.token);
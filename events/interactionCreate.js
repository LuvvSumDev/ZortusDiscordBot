const { Events, EmbedBuilder, ChannelType, PermissionFlagsBits, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { createTranscript } = require('discord-html-transcripts');
const config = require('../config.json');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()) {;
		    const command = interaction.client.commands.get(interaction.commandName);

		    if (!command) {
		    	console.error(`No command matching ${interaction.commandName} was found.`);
		    	return;
		    }

		    try {
		    	await command.execute(interaction);
		    } catch (error) {
		    	console.error(`Error executing ${interaction.commandName}`);
		    	console.error(error);
		    }
        }

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
    
                const ticketLogRows = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('ticket_transcript')
                            .setLabel('Krijg Transcriptie')
                            .setStyle(ButtonStyle.Secondary)
                    )
    
                    
                global.attachment = await createTranscript(interaction.channel, {
                    limit: -1,
                    returnType: 'attachment',
                    returnBuffer: false,
                    filename: `ticket-transcript.html`,
                    poweredBy: false,
                    hydrate: true
                });
    
                ticketLogChannel.send({ embeds: [ticketLogEmbed], components: [ticketLogRows] });
    
                setTimeout(() => {
                    interaction.channel.delete();
                }, 5000);
            } else if (interaction.customId === 'ticket_transcript') {
                const member = interaction.guild.members.cache.get(interaction.user.id);
    
                await member.send({ files: [global.attachment] });
            }
        }
    }
};
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Events, EmbedBuilder, ChannelType } = require('discord.js');
const config = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent] });

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

client.on(Events.MessageCreate, async message => {
	if (message.author.bot) return;

	const suggestionChannel = client.channels.cache.get(config.suggestionChannel);
	const bugChannel = client.channels.cache.get(config.bugChannel);
	const bugOutcomeChannel = client.channels.cache.get(config.bugOutcomeChannel);

	if (message.channelId == suggestionChannel) {
		const suggestionEmbed = new EmbedBuilder()
			.setAuthor({ name: 'Zortus Roleplay - Suggesties', iconURL: 'https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&' })
			.setColor(0xFFFFFF)
			.setThumbnail('https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&')
			.setDescription(`**Suggestie verzonden door:**\n<@${message.author.id}> (${message.author.username})\n\n**Ingestuurde suggestie:**\n\`${message.content}\``)

		const suggestion = await suggestionChannel.send({ embeds: [suggestionEmbed] });

		suggestion.react('👍');
		suggestion.react('👎');

		await suggestion.startThread({ name: 'Suggestie Discussie', autoArchiveDuration: 60, type: ChannelType.PublicThread });

		message.delete();
	} else if (message.channelId == bugChannel) {
		const bugEmbed = new EmbedBuilder()
			.setAuthor({ name: 'Zortus Roleplay - Bug Meldingen', iconURL: 'https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&' })
			.setColor(0xFFFFFF)
			.setThumbnail('https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&')
			.setDescription(`**Bug melding verzonden door:**\n<@${message.author.id}> (${message.author.username})\n\n**Gemelde bug:**\n\`${message.content}\``)

		const bug = await bugOutcomeChannel.send({ embeds: [bugEmbed] });

		await bug.startThread({ name: 'Bug Melding', autoArchiveDuration: 60, type: ChannelType.PublicThread });

		message.delete();

		const member = client.users.cache.get(message.author.id);

		const bugReportMadeEmbed = new EmbedBuilder()
			.setAuthor({ name: 'Zortus Roleplay - Bug Meldingen', iconURL: 'https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&' })
			.setColor(0xFFFFFF)
			.setThumbnail('https://cdn.discordapp.com/attachments/1169103447606431834/1169103713529516093/zortus.png?ex=65542fae&is=6541baae&hm=3e9525adf794493afa093e40feabe8b43f0f95372d0d9f93f1f13fc3b16829d2&')
			.setDescription(`Je bug melding is verstuurd, niemand kan de bug melding zien, maar de Developers hebben deze melding wel binnengekregen! Hieronder staat je aangegeven bug melding.\n\n**Gemelde bug:**\n\`${message.content}\``)
    
		await member.send({ embeds: [bugReportMadeEmbed] });
	}
})

client.login(config.token);
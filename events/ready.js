const { Events } = require('discord.js');
const colors = require('colors');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
        console.log(`[+] Bot is ready! Logged in as ${client.user.tag} [+]`.blue);
	},
};
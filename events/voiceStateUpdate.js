// This doens't work, it for some reason deletes random channels. Good luck fixing it if you would like to use this function! :)

/* const { Events, PermissionsBitField, ChannelType } = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldState, newState) {
        if (newState.channel?.id == config.supportCreateChannelId) {
            const supportChannel = newState.guild.channels.create({
                name: `Support (${newState.member.user.displayName})`,
                type: ChannelType.GuildVoice,
                parent: newState.channel.parent,
                topic: config.supportCreateChannelId,
                permissionOverwrites: [{
                    id: newState.member.id,
                    allow: [PermissionsBitField.Flags.ManageChannels]
                }, {
                    id: newState.guild.id,
                    deny: [PermissionsBitField.Flags.Connect]
                }],
                userLimit: '1'
            }).then(channel => {
                newState.setChannel(channel);
            })
        }
    
        if (oldState.channel?.id != config.supportCreateChannelId && !oldState.channel?.members.size) {
            oldState.channel?.delete();
        }
    }
} */

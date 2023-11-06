const { Events } = require('discord.js');

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(interaction) {
        if (newState.channel?.id == supportCreateChannelId) {
            const supportChannel = newState.guild.channels.create({
                name: `Support (${newState.member.user.displayName})`,
                type: ChannelType.GuildVoice,
                parent: newState.channel.parent,
                topic: supportCreateChannelId,
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
    
        if (oldState.channel?.id != supportCreateChannelId && !oldState.channel?.members.size) {
            oldState.channel?.delete();
        }
    }
}
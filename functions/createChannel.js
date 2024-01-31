const { EmbedBuilder, ChannelType } = require('discord.js');

module.exports = async (team1, team2, client, interaction, userChannel, slotsPerTeam) => {
    const guild = interaction.guild;

    let team1channel = await guild.channels.create({
        name: 'teampicker-team-1',
        type: ChannelType.GuildVoice,
        parent: userChannel.parent,
        userLimit: slotsPerTeam,
    })

    let team2channel = await guild.channels.create({
        name: 'teampicker-team-2',
        type: ChannelType.GuildVoice,
        parent: userChannel.parent,
        userLimit: slotsPerTeam,
    })

    team1.forEach(async (element) => {
        let member = await guild.members.fetch(element);
        if (member.voice.channel) {
            await member.voice.setChannel(team1channel);
        }
    });

    team2.forEach(async (element) => {
        let member = await guild.members.fetch(element);
        if (member.voice.channel) {
            await member.voice.setChannel(team2channel);
        }
    });


    const startembed = new EmbedBuilder()
    .setDescription('Podzielono wszystkich na kanaly! **GL HF** 🥰')
    .setColor('#37eb34')
    .setTimestamp();


    interaction.editReply({ embeds: [startembed] });
};
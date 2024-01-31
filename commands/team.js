const { EmbedBuilder } = require('discord.js');
const KnuthShuffle = require('../functions/knuthShuffle');
const CreateChannel = require('../functions/createChannel');

module.exports = async (client, interaction) => {


    let userChannel = await interaction.member.voice.channel;

    if(!userChannel) return interaction.reply({ content: 'Musisz być na kanale głosowym!', ephemeral: true });

    if(userChannel.name == 'teampicker-team-1' || userChannel.name == 'teampicker-team-2') return interaction.reply({ content: 'Nie mozesz wywolac komendy na kanale druzyn!', ephemeral: true });


    let usersInChannel = KnuthShuffle(client.channels.cache.get(userChannel.id).members.map(m => m.user.id));

    if(usersInChannel.length % 2 == 1) return interaction.reply({ content: `Mordko, musi byc parzysta liczba osob na kanale (Na kanale jest ${usersInChannel.length} osob)`, ephemeral: true });

    let team1 = "";
    let team2 = "";

    let team1Arr = [];
    let team2Arr = [];

    usersInChannel.forEach((user, index) => {
        if(index < usersInChannel.length / 2) {
            team1 += ` - <@${user}>\n`;
            team1Arr.push(user);
        } else {
            team2 += ` - <@${user}>\n`;
            team2Arr.push(user);
        }
    })

    const embed = new EmbedBuilder()
        .setTitle('Wylosowano drużyny!')
        .setColor('#0099ff')
        .setDescription(`Na kanale glosowym **${userChannel.name}** wywolane przez: **${interaction.user.tag}**`)
        .addFields(
            { name: 'Druzyna 1', value: team1, inline: false},
            { name: '\u200B', value: '\u200B' },
            { name: 'Druzyna 2', value: team2, inline: false },
        )
        .setTimestamp();


    const startembed = new EmbedBuilder()
        .setDescription('Za 5 sekund przenose was na inne kanaly!')
        .setColor('#0099ff')
        .setTimestamp();

    interaction.reply({ embeds: [embed, startembed] });

    setTimeout(() => {
        CreateChannel(team1Arr, team2Arr, client, interaction, userChannel, (usersInChannel.length / 2));
    }, 5000)


    




}
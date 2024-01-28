const { EmbedBuilder  } = require('discord.js');

module.exports = async (client, interaction) => {

    let userChannel = interaction.member.voice.channel;

    if(!userChannel) return interaction.reply({ content: 'Musisz być na kanale głosowym!', ephemeral: true });
    let usersInChannel = KnuthShuffle(client.channels.cache.get(userChannel.id).members.map(m => m.user.id));

    if(usersInChannel.length % 2 == 1) return interaction.reply({ content: 'Mordko, musi byc parzysta liczba osob na kanale', ephemeral: true });

    let team1 = "";
    let team2 = "";

    usersInChannel.forEach((user, index) => {
        if(index < usersInChannel.length / 2) team1 += ` - <@${user}>\n`;
        else team2 += ` - <@${user}>\n`;
    })

    const embed = new EmbedBuilder()
        .setTitle('Wylosowano drużyny!')
        .setColor('#0099ff')
        .setDescription(`Na kanale **${userChannel.name}** wywolane przez: **${interaction.user.tag}**`)
        .addFields(
            { name: 'Druzyna 1', value: team1, inline: false},
            { name: '\u200B', value: '\u200B' },
            { name: 'Druzyna 2', value: team2, inline: false },
        )
        .setTimestamp();

    interaction.reply({ embeds: [embed] });


    




}

function KnuthShuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
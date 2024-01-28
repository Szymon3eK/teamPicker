module.exports = async (client, config) => {
    let presence = Object.values(config.activites);

    client.user.setPresence({ activities: [{ name: `${presence[Math.floor(Math.random() * presence.length)]}` }] });

    setInterval(() => {
        client.user.setPresence({ activities: [{ name: `${presence[Math.floor(Math.random() * presence.length)]}` }] });
    }, 10000);

}
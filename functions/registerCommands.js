const { Client, GatewayIntentBits, REST, Routes  } = require('discord.js');
const commandsJSON = require('../commands.json');
module.exports = async (client, config) => {

    const commands = Object.values(commandsJSON);

    console.log(commands);
    
    const rest = new REST({ version: '10' }).setToken(config.token);
      
    try {
        await rest.put(Routes.applicationCommands(config.client_id), { body: commands });
    } catch (error) {
        console.error(error);
    }
}
const { Client, GatewayIntentBits, REST, Routes  } = require('discord.js');
const config = require('./config.json');
const path = require('path');
const fs = require('fs');

const setActivity = require('./functions/setActivity');
const registerCommands = require('./functions/registerCommands');
const commandteam = require('./commands/team.js');

const client = new Client({ 	
    intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    ], 
});

client.on('ready', () => {
    console.log(`Wlaczono bota: ${client.user.tag}`);
    setActivity(client, config);
    registerCommands(client, config);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'team') {
        commandteam(client, interaction);
      }


  });

  client.login(config.token);
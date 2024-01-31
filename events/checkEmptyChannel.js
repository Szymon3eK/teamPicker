module.exports = (client, config) => {


    client.on('voiceStateUpdate', (oldState, newState) => {

        if(!oldState.channel) return;
        if(oldState.channel.name != 'teampicker-team-1' && oldState.channel.name != 'teampicker-team-2') return;

        if(oldState.channel.members.size == 0) {
            oldState.channel.delete();
        }
      });
};
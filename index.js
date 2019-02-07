// require the discord.js module
const Discord = require('discord.js');
const auth = require('./auth.json');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	console.log('Ready!');
});

// login to Discord with your app's token
client.login(auth.token);



//Messaging System
client.on('message', message => {

	
	if (message.author == client.user)
		return;
	

	if(message.content.substring(0, 1) == '!')
	{
		var args = message.content.substring(1).split(' ');
        var cmd = args[0];
		switch(cmd) {
		case 'lfg':			
			//message.reply(' is currently in room: ' + message.member.voiceChannel);			
			//message.channel.send('Invite:' + Invite.channel);
			var options = {
				maxAge: 0
			};
			if(message.member.voiceChannel != null)
			{
				var invite = message.member.voiceChannel.createInvite(options).then((newInvite) => {
					message.channel.send("https://discord.gg/" + newInvite.code).then(msg => {
						msg.delete(180000)
					})
				})
				.catch((e)=>{message.channel.send('Error generating invite: (' + e + ')') });

				message.delete(1000); 		
			}
		break;
		}
	}
});
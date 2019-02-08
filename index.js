// require the discord.js module
const Discord = require('discord.js');
const auth = require('./auth.json');


//rainbow text module
const chalkAnimation = require('chalk-animation');
console.log('Connecting...')

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {	
	//Clear the console
	console.log('\033[2J');
	console.log('\033[H');

	//On connection display this bot's name
	console.log(`Logged in as ${client.user.tag}!`);

	//Start a connected symbol
	const rainbow = chalkAnimation.rainbow('Connected' + 
		'\n\nWelcome to The-Gamers-Lounge Bot created by: Ran Crump'); // Animation starts
	setTimeout(() => {
	    rainbow.stop(); // Stop animation after 8 seconds
	}, 8000);
});

// login to Discord with your app's token
client.login(auth.token);

//On Message Recieved
client.on('message', message => {

	//If the message is from the Bot ignore it
	if (message.author == client.user)
		return;
	

	if(message.content.substring(0, 1) == '!')
	{
		var args = message.content.substring(1).split(' ');
        var cmd = args[0];
		switch(cmd) {
		case 'lfg':			

				let options = {
					maxAge: 0
				};

				let reference = message.member.voiceChannel;
				let outputReference;
			if (args.length > 3)
			{
				let tempReturnMessage = message.content.substring(4, message.content.length);				

				if(message.member.voiceChannel != null)
				{
					outputReference = reference.createInvite(options).then((newInvite) => {
						message.channel.send('https://discord.gg/' + newInvite.code + ' ' + tempReturnMessage).then(msg => { //Embed user Icon and find a way to make hyperlinks :)
							msg.delete(180000);			
						})
						.catch((e)=>{console.log('Error generating invite: (' + e + ')') });
					})
					.catch((e)=>{console.log('Error generating invite: (' + e + ')') });
					message.delete(1000); 	
					return;	
				}				
			} else {
				if(message.member.voiceChannel != null)
				{
					outputReference = reference.createInvite(options).then((newInvite) => {
						message.channel.send("https://discord.gg/" + newInvite.code).then(msg => {
							msg.delete(180000);	
						})
						.catch((e)=>{console.log('Error generating invite: (' + e + ')') });
					})
					.catch((e)=>{console.log('Error generating invite: (' + e + ')') });
					message.delete(1000); 	
					return;		
				}				
			}
		break;
		}
	}
});









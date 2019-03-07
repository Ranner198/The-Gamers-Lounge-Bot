// require the discord.js module
const Discord = require('discord.js');
const auth = require('./auth.json');

//Request Ajax
var request = require('ajax-request');

//NPM Testing
var Stack = require('printstack')

//Since APEX API is FUCKING MENTAL
var https = require('follow-redirects').https;

//rainbow text module
const chalkAnimation = require('chalk-animation');
console.log('Connecting...')

//Dank Memes Webscraper
var request = require('request');                                 
//Webscrape Framework
var cheerio = require('cheerio');
//URL
const DankMemesURL = 'https://www.reddit.com/r/dankmemes/';
const ReditURL = 'https://www.reddit.com/r/';

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
	/*
		setTimeout(() => {
	    rainbow.stop(); // Stop animation after 8 seconds
	}, 8000);
	*/

	//Set status
	client.user.setActivity("Type !lfg to start a group"); 
});

// login to Discord with your app's token
client.login(auth.Security.token);

//On user joined 
/*
client.on('guildMemberAdd', member => {
	if (member.guild.memberCount == 1000)
	{
		member.guild.channels.get('542217964330418178').send("@everyone Thank you so much for helping us reach: " + member.guild.memberCount + ' members!'); 
	}
});
*/

//On Message Recieved
client.on('message', message => {

	//If the message is from the Bot ignore it
	if(message.author.bot) return;

	//If someone that's not an admin posts a link
	if (message.content.includes('www') || message.content.includes('WWW') || message.content.includes('http') || message.content.includes('.com'))
	{
		if(message.member.highestRole.position == 6)
		{					
			message.reply('Please don\'t post links in chat, message an admin if you need to');
			message.member.guild.channels.get("544341140044775434").send(message.content);
			message.delete(1000);
		}
	}

	if(message.content.substring(0, 1) == '!' || message.content.substring(0, 1) == '.')
	{
		var args = message.content.substring(1).split(' ');
        var cmd = args[0];
		switch(cmd) {
		case 'help':
			message.author.createDM().then((newDM) => {
				message.author.send('Solarized Cyan: #2aa198 ```yaml' +
				'\n❖ This is a list of commands' + 
				'\n\n◇ !lfg, !lfg <message>' + 
				'\n\n◇ !fortnite <epic username>' + 
				'\n\n◇ !apex <username>, !apex <Console: 1 = XBOX 2 = PSN> <username>' +
				'\n\n◇ !rip, !rip <@user>' +
				'```');
				//message.delete(1000);
			})
			.catch ((e) => {Stack.PrintStack('Error creating Invite: ' + e)});
		break;
		case 'server':
		case 'info':
			if(message.member.highestRole.name == 'MODS')
			{			
				message.channel.send('Current Discord Channel Users: ' + message.guild.memberCount +
				'\nRegion: ' + message.guild.region);
				message.delete(1000);
			}
		break;
		case 'test':
			if(message.member.highestRole.name == 'MODS')
			{			
				Stack.PrintStack("I am Running!");
			}
		break;		
		case 'rip':
		case 'oof':
			if (message.content.length <= 4)
				message.channel.send('Puts a flower on @' + message.author.tag + '\'s grave');
			else
			{ 
				let tempString = message.content.substring(5, message.content.length);
				message.channel.send('Puts a flower on ' + tempString + '\'s grave');
			}
		break;
		//Fortnite Stats Tracker
		case 'fortnite':	
		case 'Fortnite':
			if (message.content < 5)
			{
				message.reply("Please add your name to the end like so \"!fortnite <username>\"");
			} else {

				let name = 	message.content.substring(10, message.content.length);
				request({
					url:'https://api.fortnitetracker.com/v1/profile/pc/' + name,
					method: 'GET',
					data: {
						key: "Wins"
					},
					headers: {"TRN-Api-Key": auth.Security.TRNAuth},
				}, function(err, res, body) {		
					
					if (err)
					{
						message.channel.send("Error occured:" + err);
					} else {
						
						var jsonData = JSON.parse(body);
						if (!jsonData.lifeTimeStats)
						{
							message.channel.send("User: " + name + " not found!");
						} else
						{
							message.channel.send("Fornite Stats Tracker:\n" + 
							"System: " + jsonData.platformName + "\n" +
							"Name: " + jsonData.epicUserHandle + "\n" +
							"Kills: " + jsonData.lifeTimeStats[10].value + "\n" +
							"Kill/Death Ratio: " + jsonData.lifeTimeStats[11].value + "\n" +
							"Stats Powered By TRN Tracker!");
							return;
						}
					}
				});				
			}
		break;
		case 'PUBG':
		case 'pubG':
		case 'PubG':
		case 'pubg':
			if (message.content < 5)
			{
				message.reply("Please add your name to the end like so \"!stats <username>\"");
			} else {
				//https://api.pubg.com/shards/steam/players?filter[playerNames]=shroud
				let name = 	message.content.substring(5, message.content.length);
				request({
					url:'https://api.pubg.com/shards/PC/players?filter[playerNames]=' + name,
					method: 'GET',
					data: {
						key: "Wins"
					},
					headers: {"Bearer": auth.Security.PUBGAuth, accept: "application/vnd.api+json"},					
				}, function(err, res, body) {	
					//console.log(body);		
					/*
					if (err)
					{
						message.channel.send("Error occured:" + err);
					} else {
						
						var jsonData = JSON.parse(body);
						if (!jsonData.lifeTimeStats)
						{
							message.channel.send("User: " + name + " not found!");
						} else
						{						
							message.channel.send("Fornite Stats Tracker:\n" + 
							"System: " + jsonData.platformName + "\n" +
							"Name: " + jsonData.epicUserHandle + "\n" +
							"Kills: " + jsonData.lifeTimeStats[10].value + "\n" +
							"Kill/Death Ratio: " + jsonData.lifeTimeStats[11].value + "\n" +
							"Stats Powered By PUBG Tracker!");
							return;							
						}
					} */
				});				
			}
		break;
		case 'Apex':
		case 'apex':
			let cleanString = message.content.replace(/\s/g, "");
			if (cleanString < 6)
			{
				message.reply("Please add your name to the end like so \"!apex <username>\" or \"!apex <Console: 1 = XBOX 2 = PSN> <username>\"");
			} else {
				let platform = 5;
				let name;
				if (cleanString[5] == 1)
				{
					platform = 1;
					name = 	message.content.substring(7, message.content.length);
				}
				else if (cleanString[5] == 2)
				{
					platform = 2;
					name = 	message.content.substring(7, message.content.length);
				}
				else 
				{
					name = 	message.content.substring(6, message.content.length);
				}
				https.get('https://public-api.tracker.gg/apex/v1/standard/profile/'+platform+'/'+name, {
					headers: {
						"TRN-Api-Key" : auth.Security.ApexAuth
					}
				}, function (res) {
					var data = '';
					res.on('data', function (chunk) {
						data += chunk.toString();
					});
					res.on('end', function () { //Reached Endpoint of API
						var json; 
						try { 
							
							json = JSON.parse(data); //Parse Data

							let bannerItem1 = '', bannerItem2 = '', bannerItem3 = ''; //create placeholding local variables

							let UploadImage = json.data.children[0].metadata.bgimage.toString();

							//Try to access the banner items
							var count = Object.keys(json.data.stats).length;
							var output = [];
							for (var i = 0; i < count; i++) {
								if (i % 2 == 0)
								{
									output.push('\n◇' + json.data.stats[i].metadata.name + ': ' + json.data.stats[i].displayValue);									
								} else {
									output.push('\n◇' + json.data.stats[i].metadata.name + ': ' + json.data.stats[i].displayValue);
								}

								try {
									if (json.data.stats[i].rank > 0)
										output.push('\n◈' + json.data.stats[i].metadata.name + ' Rank: ' + json.data.stats[i].displayRank);
								} catch (e) {
									output.push('\n◈' + json.data.stats[i].metadata.name + ' Rank: ""');
								}
							}					

							message.channel.send("```fix\n◈Name: " + name +
							"\n◇Level: " + json.data.stats[0].value +
							"\n◈Current Legend: " + json.data.children[0].metadata.legend_name +
							output.join('') + '```',{
								embed: {
									image: {
										url: UploadImage
									}
								}							
							});
						}
						catch (e) {
						// Not json
						Stack.PrintStack(e);
						}
					});
					}).on('error', function (err) {
					console.error(err);
				});						
			}
			break;
			case 'meme':

                //Request URL webscrape
                webscrape();

                function webscrape() {

                    var URL = '';
                    
                    //For Custom Search
                    if (message.content.length > 6)
                    {
                        if (message.content.includes('http')) {
                            URL = message.content.substring(6, message.content.length) + '/';
                        } else {
                            //The URL will be a redit post
                            URL = ReditURL + message.content.substring(6, message.content.length) + '/';
                        }
                        
                        request(URL, function(err, resp, html) {
                            //If there is no error
                            if (!err){
    
                                //The URL Data
                                const $ = cheerio.load(html);
                                
                                //Save embeded urls
                                var returnInfo = [];
    
                                //Treverse the webpage and select the media elements
                                $('.media-element').each(function(i, element){
                                    var temp = $(this).attr('src');
                                    returnInfo.push(temp);
                                }); 

                                //Generate a random number
                                var randomNum = Math.floor(Math.random() * returnInfo.length);

                                //If the scrape returned something
                                if (returnInfo.length > 0)   
                                {									
									try {
										message.channel.send({
											embed: {
												image: {
													url: returnInfo[randomNum]
												}
											}							
										});   
									} catch (error) {
										Stack.PrintStack(error);
									}                           
								}
							}
                        });
                    } 
                    else //For Dank Memes Webscrape
                    {
                        request(DankMemesURL, function(err, resp, html) {
							//If there is no error
							if (!err){

								//The URL Data
								const $ = cheerio.load(html);
								
								//Save embeded urls
								var returnInfo = [];

								//Treverse the webpage and select the media elements
								$('.media-element').each(function(i, element){
									var temp = $(this).attr('src');
									returnInfo.push(temp);
								}); 

								//Generate a random number
								var randomNum = Math.floor(Math.random() * returnInfo.length);
								
								//If the scrape returned something
								if (returnInfo.length > 0)   
								{      
									try {
										message.channel.send({
											embed: {
												image: {
													url: returnInfo[randomNum]
												}
											}							
										});   
									} catch (error) {
										Stack.PrintStack(error);
									}               
								}
							}
                        });
                    }
                }
			break;
			//New Link Testing
			case 'lfg':
				let options = {
					maxAge: 0
				};
				//console.log(CurrentUsers.from(collection.values()));	
				let reference = message.member.voiceChannel;
				let outputReference;

				if(message.member.voiceChannel != null)
				{
					let channelID = message.member.voiceChannelID;
					let channelName = message.member.guild.channels.get(channelID).name;
					let MaxUsers = message.member.voiceChannel.userLimit;
					let CurrentUsers = message.member.voiceChannel.members.array();
					let Count = 0;
					for	(var x in CurrentUsers) {
						Count++;
					}

					if (message.content.length > 3)
					{
						let tempReturnMessage = message.content.substring(4, message.content.length);				
						outputReference = reference.createInvite(options).then((newInvite) => {
							message.channel.send({					
								embed: {
									file: "ApexLegends.png",
									color: 4386548,
									description: channelName + ' (' + Count + '/' + MaxUsers + ') ' + 'Join Here: --> https://discord.gg/' + newInvite.code + ' ' + tempReturnMessage			
								}						
							}).then(msg => {
								msg.delete(600000);	
								if (message.member.voiceChannel.full)
								{
									msg.delete(1000);
								}
							})
							.catch((e)=>{Stack.PrintStack('Error generating invite: (' + e + ')') });
						})
						.catch((e)=>{Stack.PrintStack('Error generating invite: (' + e + ')') });
						return;									
					} else {
						outputReference = reference.createInvite(options).then((newInvite) => {
							message.channel.send({					
								embed: {
									file: "ApexLegends.png",
									color: 4386548,
									description: channelName + ' (' + Count + '/' + MaxUsers + ') ' + 'Join Here: --> https://discord.gg/' + newInvite.code + ' ' + tempReturnMessage			
								}						
							}).then(msg => {
								msg.delete(600000);	
								if (message.member.voiceChannel.full)
								{
									msg.delete(1000);
								}
							})
							.catch((e)=>{Stack.PrintStack('Error generating invite: (' + e + ')') });
						})
						.catch((e)=>{Stack.PrintStack('Error generating invite: (' + e + ')') });
						return;									
					}
				} else
				message.reply(' Pls join a voice chat to use this feature');
			break;
		}
	}
});
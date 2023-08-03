// charset=UTF-8; permissions=Send Messages
// https://discordapi.com/permissions.html

// Создать экземпляр клиента Discord
const Discord = require('discord.js');
const client = new Discord.Client({
	intents: [
		"Guilds", // for guild related things
		//"GuildMembers", // for guild members related things
		//"GuildBans", // for manage guild bans
		//"GuildEmojisAndStickers", // for manage emojis and stickers
		//"GuildIntegrations", // for discord Integrations
		//"GuildWebhooks", // for discord webhooks
		//"GuildInvites", // for guild invite managing
		//"GuildVoiceStates", // for voice related things
		//"GuildPresences", // for user presence things
		"GuildMessages", // for guild messages things
		//"GuildMessageReactions", // for message reactions things
		//"GuildMessageTyping", // for message typing things
		//"DirectMessages", // for dm messages
		//"DirectMessageReactions", // for dm message reaction
		//"DirectMessageTyping", // for dm message typing
		"MessageContent", // enable if you need message content things
	],
});
console.log(`[7;33mdiscord.js v${Discord.version}[0;33m with [32m${client.guilds.cache.size+1}[33m guilds[0m`);
// Загрузить настройки
const { prefix, state, token } = require('./config.json');
// Отладка
//client.on('raw', console.log);

client.once('ready', () => {
	let dateNow = new Date().toLocaleString('ru', { hour12: false })
	console.log(`\n[36m> ${client.user.tag}:[0m бот запущен ${dateNow.replace(', ', ' в ')}\n`);
	//const ch = client.channels.cache.get(clientID); // connexion works here
	//ch.send("Check");
	////const guild = await client.guilds.fetch(clientId);
	//console.log(client.guilds.cache.size);
	//client.channels.commands.cache.find(c => c.name === 'ping').delete()

	//client.user.setStatus(state[0]);
	//client.user.setActivity(`команду > ${prefix}ping`);
	// или
	client.user.setPresence({
		activities: [
      { name: `команду > ${prefix}ping или ${prefix}help`, type: 2 }
    ],
    status: state[0],
	})
});

// Сообщение подлючившимуся к каналу (не тестировано)
client.on('guildMemberAdd', async (member) => {
	// Отправляет сообщение по назначенному каналу на сервере
	const channel = member.guild.channels.find(ch => ch.name === 'песочница');
	// Не реагировать, если канал не найден на этом сервере
	if (!channel) return;
	// Отправить сообщение с упоминанием участника
	channel.send(`Добро пожаловать на сервер, ${member}`);
});

// Прочитать сообщение и совершить действие
client.on('messageCreate', async (message) => {
	// Запретить боту реагировать на сообщения ботов
	if (message.author.bot) {
		// Реагировать только на сообщения других ботов
		if (message.author.id === client.user.id) return;
		message.react('\ud83e\udd16'); // :robot:
		
	} else {	
		if (message.content.startsWith(prefix)) {
			const command = message.content.slice(prefix.length).toLowerCase();
		
			switch(command) {
				case 'help': {
					const embed = new Discord.EmbedBuilder()
						.setColor(0xFF0000) // RED
						.setThumbnail('https://i.imgur.com/wSTFkRM.png')
						.setAuthor(
							{ name: 'Документация', iconURL: 'https://i.imgur.com/wSTFkRM.png', url: 'https://discordjs.guide' }
						)
						.setTitle('Команды:')
						.setURL('https://anidiots.guide/getting-started')
						.setDescription('Доступные команды для бота')
						.addFields(
							{ name: `${prefix}help`, value: 'Эту команду вы выполнили', inline: true },
							{ name: `${prefix}ping`, value: 'Отвечает на команду и добавляет реакцию', inline: true },
						)
						//.addBlankField()
						//.setImage('https://i.imgur.com/wSTFkRM.png')
						.setTimestamp()
						.setFooter(
							{ text: '? Бывает ещё мелкий текст перед Title', iconURL: 'https://i.imgur.com/wSTFkRM.png' }
						);
					message.channel.send({ embeds: [embed] });
					
					message.react('\ud83d\udc41\u200d\ud83d\udde8'); // :eye_in_speech_bubble:
					console.log(`[36m> ${message.author.username}:[0m ответ на команду [45m${command}[0m`);
					break;
				}
				case 'ping': {
					// Ответ отправителю сообщения
					message.reply('pong :wave:');
					// Сообщение на канал
					//message.channel.send('Привет, я БОТ!' + message.author.displayAvatarURL);
					// Личное сообщение, аналогично message.member.send(``);
					//message.author.send(`Привет, ${message.member.displayName}!`);
					
					message.react('\ud83d\udc41\u200d\ud83d\udde8'); // :eye_in_speech_bubble:
					console.log(`[36m> ${message.author.username}:[0m ответ на команду [45m${command}[0m`);
					break;
				}
				default: {
					message.react('\ud83c\udfb2'); // :game_die:
					console.log(`[36m> ${message.author.username}:[0m команда [41m${command}[0m не распознана`);
					break;
				}
			}
		} else {
			console.log(`[36m> ${message.author.username}:[0m отправил [90m"${message}"[0m`);
		}
	}
});

client.login(process.env.TOKEN)
	.then(() => {
		client.user.setStatus(state[1]);
	})
	.catch(console.error);

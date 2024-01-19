'use strict'; // charset=UTF-8; https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584
// https://discordapi.com/permissions.html

// Создать экземпляр клиента Discord
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const client = new Client({
	botId: "essence",
	intents: [
		GatewayIntentBits.Guilds, // for guild related things
		//GatewayIntentBits.GuildMembers, // for guild members related things
		//GatewayIntentBits.GuildBans, // for manage guild bans
		//GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
		//GatewayIntentBits.GuildIntegrations, // for discord Integrations
		//GatewayIntentBits.GuildWebhooks, // for discord webhooks
		//GatewayIntentBits.GuildInvites, // for guild invite managing
		//GatewayIntentBits.GuildVoiceStates, // for voice related things
		//GatewayIntentBits.GuildPresences, // for user presence things
		GatewayIntentBits.GuildMessages, // for guild messages things
		//GatewayIntentBits.GuildMessageReactions, // for message reactions things
		//GatewayIntentBits.GuildMessageTyping, // for message typing things
		//GatewayIntentBits.DirectMessages, // for dm messages
		//GatewayIntentBits.DirectMessageReactions, // for dm message reaction
		//GatewayIntentBits.DirectMessageTyping, // for dm message typing
		GatewayIntentBits.MessageContent, // enable if you need message content things
	],
});
console.log(`[7;33mdiscord.js v${require("discord.js/package.json").version}[0;33m with [32m${client.guilds.cache.size+1}[33m guilds[0m`);
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
client.on('guildMemberAdd', async member => {
	// Отправляет сообщение по назначенному каналу на сервере
	const channel = member.guild.channels.find(ch => ch.name === 'песочница');
	// Не реагировать, если канал не найден на этом сервере
	if (!channel) return;
	// Отправить сообщение с упоминанием участника
	channel.send(`Добро пожаловать на сервер, ${member}`);
});

// Прочитать сообщение и совершить действие
client.on('messageCreate', async message => {
	// Запретить боту реагировать на сообщения ботов
	if (message.author.bot) {
		// Реагировать только на сообщения других ботов
		if (message.author.id === client.user.id) return;
		message.react('\ud83e\udd16'); // :robot:
		
	} else {	
		if (message.content.startsWith(prefix)) {
			const command = message.content.slice(prefix.length).toLowerCase();
		
			switch(command) {
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

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
	
	if (interaction.commandName === 'help') {
		const guildId = process.env.GUILD_ID_X18;
		const currentCommands = await client.application.commands.fetch(
		//	guildId && { guildId: guildId } // global or guildId
		);
		if (!currentCommands?.size) return;
		
		const fields = [];
		currentCommands.forEach((cmd) => {
			const field = {
				name: `${cmd.id}`,
				value: `**${prefix}${cmd.name}**\n${cmd.description}`,
				inline: false
			}
			fields.push(field);
		});
		
		const embed = new EmbedBuilder()
			.setColor(0xFF0000) // RED
			.setThumbnail('https://github.com/discordjs/guide/blob/main/guide/.vuepress/assets/discord-avatar-djs.png?raw=true')
			.setAuthor({
				iconURL: 'https://cdn.discordapp.com/embed/avatars/2.png',
				name: 'Документация',
				url: 'https://discordjs.guide'
			})
			.setTitle('Команды:')
			.setURL('https://anidiots.guide/getting-started')
			.setDescription(`Доступны ${currentCommands.size} команды для бота`)
			.addFields(fields)
			//.addField({ name: '\u200b', value: '\u200b' })
			//.setImage('https://cdn.discordapp.com/embed/avatars/0.png')
			.setTimestamp()
			.setFooter({
				text: '? Бывает ещё мелкий текст перед Title',
				iconURL: 'https://i.imgur.com/wSTFkRM.png'
			});
		await interaction.reply({ embeds: [embed], ephemeral: true });
		
		console.log(`[36m> ${interaction.user.username}:[0m ответ на слеш-команду [45m${interaction.commandName}[0m`);
	}
});

client.login(process.env.TOKEN)
	.then(() => {
		client.user.setStatus(state[1]);
	})
	.catch(console.error);

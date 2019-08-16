// charset=UTF-8; permissions=Send Messages
// https://discordapi.com/permissions.html

// Создать экземпляр клиента Discord
const Discord = require('discord.js');
const client = new Discord.Client();
// Загрузить настройки
const { prefix, state, token } = require('./config.json');

// Отладка
//client.on('raw', console.log);

client.once('ready', () => {
  let dateNow = new Date().toLocaleString('ru', { hour12: false })
  console.log(`\n> ${client.user.tag}: бот запущен ${dateNow.replace(' ', ' в ')}\n`);
  
  //client.user.setStatus(state[0]);
  //client.user.setActivity(`команду > ${prefix}ping`);
  // или
  client.user.setPresence({
    game: { name: `команду > ${prefix}ping или ${prefix}help`, type: 2 },
    status: state[1]
  })
    // Настройка статуса и подсказки
    .then(result => {
      client.user.setStatus(state[0]);
      console.log(result);
      console.log(`ClientUser.END\n`);
    })
    .catch(error => {
      client.user.setStatus(state[2]);
      console.error(`${error}\n`);
    });
});

// Сообщение подлючившимуся к каналу (не тестировано)
client.on('guildMemberAdd', member => {
  // Отправляет сообщение по назначенному каналу на сервере
  const channel = member.guild.channels.find(ch => ch.name === 'песочница');
  // Не реагировать, если канал не найден на этом сервере
  if (!channel) return;
  // Отправить сообщение с упоминанием участника
  channel.send(`Добро пожаловать на сервер, ${member}`);
});

// Прочитать сообщение и совершить действие
client.on('message', async msg => {
  // Запретить боту реагировать на сообщения ботов
  if (msg.author.bot) {
    // Реагировать только на сообщения других ботов
    if (msg.author.id === client.user.id) return;
    msg.react('\ud83e\udd16'); // :robot:
    
  } else {
    if (msg.content.startsWith(prefix)) {
      const command = msg.content.slice(prefix.length).toLowerCase();
      
      switch(command) {
        case 'help': {
          const embed = new Discord.RichEmbed()
            .setColor('RED') // 0xFF0000
            .setThumbnail('https://i.imgur.com/wSTFkRM.png')
            .setAuthor('Документация', 'https://i.imgur.com/wSTFkRM.png', 'https://discordjs.guide')
            .setTitle('Команды:')
            .setURL('https://anidiots.guide/getting-started')
            .setDescription('Доступные команды для бота')
            .addField('!help', 'Эту команду вы выполнили')
            //.addBlankField()
            .addField('!ping', 'Отвечает на команду и добавляет реакцию')
            //.setImage('https://i.imgur.com/wSTFkRM.png')
            .setTimestamp()
            .setFooter('? Бывает ещё мелкий текст перед Title', 'https://i.imgur.com/wSTFkRM.png');
          msg.channel.send(embed);
          
          msg.react('\ud83d\udc41\u200d\ud83d\udde8'); // :eye_in_speech_bubble:
          console.log(`> ${msg.author.username}: отправил команду "${command}"`);
          break;
        }
        case 'ping': {
          // Ответ отправителю сообщения
          msg.reply('pong :wave:');
          // Сообщение на канал
          //msg.channel.send('Привет, я БОТ!' + msg.author.displayAvatarURL);
          // Личное сообщение, аналогично msg.member.send(``);
          //msg.author.send(`Привет, ${msg.member.displayName}!`);
          
          msg.react('\ud83d\udc41\u200d\ud83d\udde8'); // :eye_in_speech_bubble:
          console.log(`> ${msg.author.username}: отправил команду "${command}"`);
          break;
        }
        default: {
          msg.react('\ud83c\udfb2'); // :game_die:
          console.log(`> ${msg.author.username}: команда "${command}" не распознана`);
          break;
        }
      }
    } else {
      console.log(`> ${msg.author.username}: отправил "${msg}"`);
    }
  }
});

client.login(token).catch(error => {
  console.error(`${error}\n`);
});
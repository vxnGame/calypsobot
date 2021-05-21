const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const { pong } = require('../../../data/text/emojis.json');

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			usage: 'ping',
			description: 'Gets vxn\'s current latency and API latency.',
			type: client.types.INFO,
		});
	}
	async run(message) {
		const embed = new MessageEmbed()
			.setDescription('`Pinging...`')
			.setColor(message.guild.me.displayHexColor);
		const msg = await message.channel.send(embed);
		// Check if edited
		const timestamp = (message.editedTimestamp) ? message.editedTimestamp : message.createdTimestamp;
		const latency = `\`\`\`ini\n[ ${Math.floor(msg.createdTimestamp - timestamp)}ms ]\`\`\``;
		const apiLatency = `\`\`\`ini\n[ ${Math.round(message.client.ws.ping)}ms ]\`\`\``;
		embed.setTitle(`Pong!  ${pong}`)
			.setDescription('')
			.addField('Latency', latency, true)
			.addField('API Latency', apiLatency, true)
			.setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
		msg.edit(embed);
	}
};

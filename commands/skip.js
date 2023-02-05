const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("skip").setDescription("Skips the current song"),
	async execute (client, interaction)
    {
        await interaction.reply('Attempting skip!');
		const queue = client.player.getQueue(interaction.guildId)
		queue.skip()
		await interaction.editReply('Skipped Track');
        
	},
}
const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("skipto").setDescription("Skips the current song")
            .addNumberOption((option) => option.setName("track").setDescription("The track to which to skip").setMinValue(1)),
	async execute (client, interaction)
    {
        await interaction.reply('Skipping towards !');
        const track = (interaction.options.getNumber("track") || 1) - 1;
		const queue = client.player.getQueue(interaction.guildId);
		queue.skipTo(track)
        await interaction.editReply('Skipped tracks');
        
	},
}
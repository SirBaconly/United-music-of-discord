const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("song").setDescription("Displays the current song and afferent details"),
	async execute (client, interaction)
    {
        await interaction.reply('Getting details');
		const queue = client.player.getQueue(interaction.guildId);
        if(!queue) 
            return await interaction.editReply("No songs currently in queue");

		const currentSong = queue.current

        let progressBar = queue.createProgressBar
        ({
            queue: false,
            length: 19,
        })
        embedMessage = new EmbedBuilder()
            .setDescription(`Currently playing [${currentSong.title}](${currentSong.url})\n 0:00` + progressBar + currentSong.duration)
            .setThumbnail(currentSong.thumbnail)
        await interaction.editReply({ embeds: [embedMessage]});
	},
}
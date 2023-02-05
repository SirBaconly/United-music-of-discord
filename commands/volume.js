const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("volume").setDescription("Sets the volume of the player")
            .addNumberOption((option) => option.setName("volume").setDescription("The level at which to set player volume.").setMinValue(0)),
	async execute (client, interaction)
    {
        await interaction.reply('Setting volume');
        const volume = (interaction.options.getNumber("volume") || 0);
        if (volume < 0 || volume > 100)
        {
            await interaction.editReply('Volume outside of bounds, use values 0 -> 100')
        }
        else
        {
            const queue = client.player.getQueue(interaction.guildId);
            const newVolume = queue.setVolume(volume);
            await interaction.editReply(`Setting volume to: [${volume}]`);
        }
        
        
	},
}
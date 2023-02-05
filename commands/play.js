const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');
var queue;
var tracktype;
var embedMessage;
module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Query for a song and play it or add it to an already existing queue')
		.addStringOption(option => option.setName('searchkey').setDescription('What to Query for')),
	async execute(client, interaction) {
        await interaction.deferReply({ephemeral: false});
        interaction.editReply("Setting up!"); 
        const searchKey = interaction.options.getString('searchkey') == null ? 'https://www.youtube.com/watch?v=AzyMnkP8OcU' : interaction.options.getString('searchkey');
        if (!interaction.member.voice.channel)
        {
            await interaction.editReply('Join a VC!');
        }
        else
        {
            await interaction.editReply('Searching for ' + searchKey)
        }

        const result = await client.player.search(searchKey, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO
        })
        if (result.tracks.length === 0 )
        {
            await interaction.editReply('No results')
        }
        tracktype = result.playlist != null;
        try 
        {
        if (typeof queue == 'undefined' || queue.destroyed)
        {
            queue = await client.player.createQueue(interaction.guild)
            const setvolume = queue.setVolume(25)
            if (!queue.connection) await queue.connect(interaction.member.voice.channel)
            if (!tracktype)
            {
                await queue.addTrack(result.tracks[0])
            }
            else
            {
                await queue.addTracks(result.tracks)
            }
            await queue.play()
        }
        else
        {
            if (!tracktype)
            {
                await queue.addTrack(result.tracks[0])
            }
            else
            {
                await queue.addTracks(result.tracks)
            }
        }
        if (!tracktype)
        {
            embedMessage = new EmbedBuilder()
            .setDescription(`**[${result.tracks[0].title}](${result.tracks[0].url})** has been added to queue`)
            .setThumbnail(result.tracks[0].thumbnail)
        await interaction.editReply({ embeds: [embedMessage]})
        }
        else
        {
            embedMessage = new EmbedBuilder()
            .setDescription(`**[${result.playlist.title}](${result.playlist.url})** playlist has been added to queue`)
        await interaction.editReply({ embeds: [embedMessage]})
        }
   
        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
        }

	}
};
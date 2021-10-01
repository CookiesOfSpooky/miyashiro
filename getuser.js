const Discord = require("discord.js");
const osu = require("node-osu");
const osuApi = new osu.Api('4d629ab6eb734bedd013a3d80f38f1f5d8e96863');

module.exports.run = async(client, message, args) => {

    if(!args.join(" ")){
        message.channel.send("**Je suis désolé mais aucun nom n'a été précisé ou existe !**")
    }
    if(args.join(" ")){
    osuApi.osuApi.getUser({ u: args.join(" ") }).then(user => {
        var embed = new Discord.MessageEmbed()
        .setTitle(`**Informations OSU! de ${user[0].name}**`)
        .addField("*Nom:*", user[0].name)
        .addField("*Niveau:*", user[0].level)
        .addField("*Accuracy:*", user[0].accuracy)
        .addField(`**(RAW) Join Date**`,user[0].counts.ssh)
        .addField("*Pays:*", user[0].country)
        .setColor("#bbffbe")
        message.channel.send(embed);
}); 
    }

}
module.exports.help = {
    name: "getuser"
}
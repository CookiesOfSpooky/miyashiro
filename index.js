const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const Enmap = require("enmap");
const config = require("./config.json")

client.login(config.token);

client.commands = new Discord.Collection();


fs.readdir("./events/", (error, f) => {
    if(error) return console.log(error);
    console.log(`${f.length} events en chargement !`);

    f.forEach((f) => {
        const events = require(`./events/${f}`);
        const event = f.split(".")[0];

        client.on(event,events.bind(null, client))
    });
});

client.commands = new Enmap();

const command_Folders = fs.readdirSync('./cmd');

 for (const folder of command_Folders) {
 const command_Files = fs.readdirSync(`./cmd/${folder}`).filter(file => file.endsWith('.js'));
 for (const file of command_Files) {
 const command = require(`./cmd/${folder}/${file}`); 

client.commands.set(command.help.name, command);
 }
}
const { ClientUser } = require('discord.js');

async function loadEvents(client) {
    const { loadFiles } = require('../functions/fileLoader');
    const ascii = require('ascii-table');
    const table = new ascii().setHeading('Events', 'Status');

    await client.events.clear();

    const Files = await loadFiles('events');
    Files.forEach((file) => {
        const event = require(file);

        const execute = (...args) => event.execute(...args, client);
        client.events.set(event.name, execute);

        if (event.reset) {
            if (event.once) {
                client.rest.once(event.name, execute);
            }
            else {
                client.rest.on(event.name, execute);
            }
        }
        else {
            // eslint-disable-next-line no-lonely-if
            if (event.once) {
                client.once(event.name, execute);
            }
            else {
                client.on(event.name, execute);
            }
        }
        table.addRow(event.name, ' 🙂');
    });

    return console.log(table.toString(), '\nLoaded Events.');
}

module.exports = { loadEvents };
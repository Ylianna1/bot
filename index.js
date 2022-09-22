const Telegraf = require("telegraf").Telegraf,
    os = require('node:os'),
    BOT_TOKEN ="5518549129:AAEPgYjIB-O5ltYXH02ERTnVr51EFHjd42g";
const bot = new Telegraf(BOT_TOKEN);

bot.start(ctx => {
    ctx.reply("Привіт!👋 Цей бот було створено для виведення інформції о втратах ворога. Для того щоб побачити втрати введіть : personnel_units, tanks, armoured_fighting_vehicles, artillery_systems, aa_warfare_systems, або planes")
})

bot.hears(/[A-Z]+/i, (ctx) => {
   let message = ctx.message.text;
   console.log(message);
    fetch("https://russianwarship.rip/api/v1/statistics/latest",
        {
            method:"GET",
            headers:{"Content-Type": "application/json"},
        })

        .then((response)=>response.json())

        .then((data)=>{
            ctx.reply(message + ": " + data.data.stats[message]);
            //console.log(data);
        })
        .catch((er) => {
            console.log('Some error: ${er}');
        });
});

bot.launch();
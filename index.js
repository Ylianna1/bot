const Telegraf = require("telegraf").Telegraf,
    os = require('node:os'),
    BOT_TOKEN ="5518549129:AAEPgYjIB-O5ltYXH02ERTnVr51EFHjd42g";
const bot = new Telegraf(BOT_TOKEN);

let data_from_server={};
let date_of_data_from_server="";
let switch_srats="stats";

function getCarrentDate(){
    var today=new Date();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    //console.log(today);
    return today;
}

async function getDataServer(foreFeach=false){
    if(!foreFeach){
        return;
    }
    return fetch("https://russianwarship.rip/api/v1/statistics/latest",
    {
        method:"GET",
        headers:{"Content-Type": "application/json"},
    })
    .then((response)=>response.json())
    .then((data)=>{
        data_from_server = data;
        date_of_data_from_server= data_from_server.data.date;
        console.log("go");
    })
    .catch((er) => {
        console.log('Some error: ${er}');
    })
   
}

bot.start(ctx => {
    ctx.reply("Привіт!👋 Цей бот було створено для виведення інформції о втратах ворога. Для того щоб побачити втрати введіть : personnel_units, tanks, armoured_fighting_vehicles, artillery_systems, aa_warfare_systems, або planes",{
        reply_markup:{
            inline_keyboard:[
                [{text:"Resource", url:"https://russianwarship.rip/%22%7D%5D"}],
                [{text:"Get latest statistic", callback_data:"getAll"}, {text:"Get latest statistic by day", callback_data:"getAllByDay"}]
            ]
        }
    })
})

bot.action("getAll", ctx=>{
    ctx.reply("Get latest statistic");
    switch_srats="increase"
})
bot.action("getAllByDay", ctx=>{
    ctx.reply("Get latest statistic by day");
    switch_srats="stats"
})
//bot.command{}

bot.hears(/[A-Z]+/i, async ctx => {
   let message = ctx.message.text;
   console.log(message);  
   await getDataServer(date_of_data_from_server != getCarrentDate());
   ctx.reply(message + ": " + data_from_server.data[switch_srats][message]);
})

bot.launch();
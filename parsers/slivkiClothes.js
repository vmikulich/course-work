const fs = require('fs');
const osmosis = require('osmosis');
let savedData = [];
var res=[];
const siteLink='https://www.slivki.by/search?searchIn=0&text=%D0%BE%D0%B4%D0%B5%D0%B6%D0%B4%D0%B0&sortBy=default&distance=0';
const siteLinkRight='https://www.slivki.by';
osmosis
    .get(siteLink)
    .find('.stock-group-item')
    .set({
        'link':'a@href'
    })
    .data((data)=>{
        savedData.push(data);
    })
    .done(()=>{
        savedData = savedData.filter(el=>{
            return el.link.indexOf('tv')===-1 && el.link.indexOf('fotogid')===-1;
        });
        savedData.map(el => {
            el.link =  siteLinkRight + el.link;
        });
    });

let newData=[];
setTimeout(()=>{
    savedData.forEach((e)=> {
        osmosis
            .get(e.link)
            .set({
                'name': '.offer-details--title',
                'img': '.active img@src',
                'place' : '#offerConditionLogo > p',
                'description': [{
                    'days': '#days',
                    'hours': '#hours'
                }]
            })
            .data((data) => {
                newData.push(data);
            })
    })
},2000);

setTimeout(()=>{
    newData.map(el => {
        el.img = siteLinkRight + el.img;
        el.img.replace(/\s/g, '');
    });

    var uniq = new Set(newData.map(e => JSON.stringify(e)));
    var res = Array.from(uniq).map(e => JSON.parse(e));

    fs.writeFile('../data/clothes.json', JSON.stringify( res, null, 4), function(err) {
        if(err) console.error(err);
        else console.log('Data Saved to clothes.json file');
    })
},10000);


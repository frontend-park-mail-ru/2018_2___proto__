const about = require("./templates/rendered/about.js");

let members = {
    mentor: {
        link: "https://github.com/8coon",
        name: "@8coon"
    },
    developers: [
        {
            link: "https://github.com/armelior",
            name: "@armelior"
        },
        {
            link: "https://github.com/mouseartiom",
            name: "@mouseartiom"
        },
        {
            link: "https://github.com/0sektor0",
            name: "@0sektor0"
        },
        {
            link: "https://github.com/YB97",
            name: "@YB97"
        },
    ]
};

//пока не работает, чуть позже разберусь
let html = about.Render(members);
alert(html);
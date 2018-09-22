//временные проверочные данные
const members = {
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

const leaders = [
    {
        place: "1st",
        username: "KOPTEЗ",
        score: "OVER 9000"
    },
    {
        place: "2nd",
        username: "Vileven",
        score: "4500"
    },
    {
        place: "3rd",
        username: "avtyul",
        score: "4259"
    },
    {
        place: "4th",
        username: "8coon",
        score: "1234"
    },
    {
        place: "5th",
        username: "Armelior",
        score: "1"
    }
];

const user = {
    avatar: "../../img/avatar-blank.png",
    username: "#USERNAME",
    email: "example@mail.ru",
    wins: "1707",
    loses: "42"
};

function renderToRoot(templateName, data) {
    let root = document.getElementById("main-block")
    if (root == null)
        return

    root.innerHTML = Handlebars.templates[templateName](data);
}

function renderAbout() {
    renderToRoot("about.hbs", members);
}

function renderIndex() {
    renderToRoot("index.hbs", null);
}

function renderLeaders() {
    renderToRoot("leaders.hbs", leaders);
}

function renderProfile() {
    renderToRoot("profile.hbs", user);
}

function renderSignIn() {
    renderToRoot("signin.hbs", null);
}

function renderSignUp() {
    renderToRoot("signup.hbs", null);
}

window.onload = renderIndex();
const config = require("./config");

const data = require("./data")(config);
const app = require("./config/application")({ data });


require("./routers")(app, data);

// crate initial superhero!
data.getSuperheroByName("Batman").then((superhero) => {
    if (!superhero) {
        const imgURL = "https://upload.wikimedia.org/wikipedia/en/1/17/Batman-BenAffleck.jpg";
        data.createSuperhero("Batman", "Bruce Wayne", "Gotham", "good", "Bad experience with Clowns!", imgURL, ["Utility belt"], ["Justice League", "Bat family"]);

    }
});

app.listen(config.port, () => console.log(`Running at :${config.port}`));

//data.getSuperheroById("5836d6b185abc0357801f2b0").then(superhero => { console.log(superhero); });
// const ironMan = "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQScGn_3zcTd5IHD3CsWwSuhA7uLIqYWaby3ozPltjoGyBMyD7gWQ";
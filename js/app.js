// UI 
let countries = document.getElementById("countries");
let country = document.querySelector("#country");
let button = document.querySelector("button");
let min = document.querySelector("#min");
let max = document.querySelector("#max");


countries.addEventListener("change", function() {
    fetch(`https://app.sportdataapi.com/api/v1/soccer/countries?apikey=0043b0e0-2830-11ec-92d3-3dbe1ec0f638&continent=${this.value}`)
        .then(res => res.json())
        .then(data => {
            $(".country").remove();
            for (const key in data.data) {
                $("#country").append(`<option value="${data.data[key].country_id}" class="country">${data.data[key].name}</option>`);
            }
        })
        .catch(error => console.log(error))
});


button.addEventListener("click", function(e) {
    fetch(`https://app.sportdataapi.com/api/v1/soccer/players?apikey=0043b0e0-2830-11ec-92d3-3dbe1ec0f638&country_id=${country.value}&max_age=${max.value}&min_age=${min.value}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            let no = 1;
            $(".info").remove();
            for (const key in data.data) {
                let weight = data.data[key].weight;
                let height = data.data[key].height;
                if (weight == null) weight = "not given";
                if (height == null) height = "not given";
                $("table").append(`
                <tr class="info">
                    <td>${no}</td>
                    <td>${data.data[key].firstname} ${data.data[key].lastname}</td>
                    <td>${data.data[key].age}</td>
                    <td>${data.data[key].birthday}</td>
                    <td>${height}</td>
                    <td>${data.data[key].player_id}</td>
                    <td>${weight}</td>
                </tr>
                `);
                no++;
            }
        })
        .catch(error => console.log(error))
    e.preventDefault();
})
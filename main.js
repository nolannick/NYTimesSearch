const endpoint = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?'
const key = '&api-key=Y5E2I3DGsVHd9GjbHWGPkf6pG27CH4J0'

const sumbitForm = function (event) {
    event.preventDefault();


    const term = $('#term').val();
    const sYear = document.forms["search"]["sYear"].value;
    const eYear = document.forms["search"]["eYear"].value;
    const search = `fq=${term}&facet=true&begin_date=${sYear}0101&end_date=${eYear}1231`;
    const qURL = `${endpoint}${search}${key}`
    console.log(qURL)
    $.ajax({
        url: qURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        resultsArray(response);
    })

}
let numberIndex = 1;

const resultsArray = function (response) {
    let arrayResponse = response.response.docs;
    let resultArray = [];
    for (i = 0; i < arrayResponse.length; i++) {
        resultArray.push({
            Headline: arrayResponse[i].headline.main,
            Date: arrayResponse[i].pub_date,
            Snippet: arrayResponse[i].snippet,
            URL: arrayResponse[i].web_url
        })
    }
    // return resultArray;
    render(resultArray);
    console.log(resultArray);
}

const render = function (resultArray) {
    const eDate = document.forms["search"]["eYear"].value;
    if (eDate < document.forms["search"]["sYear"].value) {
        alert("Please select an end date that takes place AFTER start date.");
    } else {
        $("#resultsSection").empty();
        let recordCount = $("#number").val();
        if (recordCount > 9) {
            recordCount = 10;
        } else if (recordCount < 1) {
            recordCount = 1;
        }
        let element = '';
        for (let i = 0; i < recordCount; i++) {
            var date = new Date(resultArray[i].Date);
            $('#resultsSection').append(`
            <div class="card" style="width: 50%">
            <div class="card-body">
                <h5 class="card-title">${resultArray[i].Headline}</h5>
                <p class="card-text">${(date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()}</p>
                <p class="card-text">${resultArray[i].Snippet}</p>
                <a href="${resultArray[i].URL}" class="btn btn-primary">Go to Article</a>
            </div>
            </div>`);
        }
        const clearRender = function () {
            location.reload();
        }
    }
}


var min = 1970;
var max = 2019;

var sYear = document.getElementById('sYear');
var eYear = document.getElementById('eYear');

for (var i = min; i <= max; i++) {
    var opt = document.createElement('option');
    var opt2 = document.createElement('option');
    opt.value = i;
    opt2.value = i;
    opt.innerHTML = i;
    opt2.innerHTML = i;
    sYear.appendChild(opt);
    eYear.appendChild(opt2);

}

const validateEndDate = function () {
    const eDate = document.forms["search"]["eYear"].value;
    if (eDate < document.forms["search"]["sYear"].value) {
        alert("Please select an end date that takes place AFTER start date.");
    }
}

$('#submit').on('click', sumbitForm);
$('#clear').on('click', clearRender);

'use strict'

let infoArray = [];
let name = [];
let nameTwo = [];
let titles = [];
let horns = [];

function SonStuff(creature) {
    this.url = creature.image_url;
    this.title = creature.title;
    this.description = creature.description;
    this.keyword = creature.keyword;
    this.horns = creature.horns;
    infoArray.push(this);
};


//we want to render using the mustache method//

function renderCreatures(creature, sourceID, target) {
    let $target = $(target);
    let $templateMarkUp = $(sourceID).html();
    let newMarkup = Mustache.render($templateMarkUp, creature)
    $target.append(newMarkup);
}




$('select').on('change', displayImages);
$('#one').on('submit', displayTitleImages)

function displayTitleImages() {
    let submitted = $(this).val();
    titles.forEach((title, idx) => {
        $('#one').filter(title);
        if (submitted === null || submitted === 'submit') {
            $('section').show();
        } else {
            $('section').hide();
            $(`${submitted}`).show();
        }

    });
}
function displayImages() {
    let $picked = $(this).val();
    console.log($picked);
    if ($picked === 'default'){
        $('section').show();
    } else{
        $('section').hide();
        $(`#${$picked}`).show();
    
    } 
}

function forPageOne() {
    $('#creaturesClass2').hide();
    $('#creaturesClass').show();
}


function forPageTwo() {
    $('#creaturesClass').hide();
    $('#creaturesClass2').show();

}



$(document).ready(function () {
    $.ajax('/data/page-1.json')
        .then(data => {
            data.forEach((creature, idx) => {

                let all = new SonStuff(creature);
                renderCreatures(all, '#eastWood', '#creaturesClass');


                if (!name.includes(creature.keyword)) {
                    name.push(creature.keyword);
                }
                if (!titles.includes(creature.title)) {
                    titles.push(creature.title);
                }
                if (!horns.includes(creature.horns)) {
                    horns.push(creature.horns)
                }
            })
            $('#pageOne').on('click', pageOne);
            function pageOne() {
                $('#pageOne').html(forPageOne());

            }

            for (let i = 0; i < name.length; i++) {
                $('select').append(`<option value="${name[i]}">${name[i]}</option>`);
            }
            $("#form1A").on("keyup", function () {
                let value = $(this).val().toLowerCase();
                $("section").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                    name.sort();
                    titles.sort();
                });
            });
        });

    $.ajax('/data/page-2.json')
        .then(data => {
            data.forEach((creature, idx) => {
                let allTwo = new SonStuff(creature);
                renderCreatures(allTwo, '#poop', '#creaturesClass2')

                if (!nameTwo.includes(creature.keyword)) {
                    nameTwo.push(creature.keyword);
                }
            })
            for (let i = 0; i < nameTwo.length; i++) {
                $('select').append(`<option value="${nameTwo[i]}"> ${nameTwo[i]}</option>`);
            }
            nameTwo.sort();
        })
    $('#pageTwo').on('click', pageOne);
    function pageOne() {
        $('#pageTwo').html(forPageTwo());
    }
});


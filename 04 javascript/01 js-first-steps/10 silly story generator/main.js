"use strict";

const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

const storyText = "It was :temperature: outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. :name: saw the whole thing, but was not surprised — :insertx: weighs :weight:, and it was a hot day.";

const insertX = [
  "Willy the Goblin",
  "Big Daddy"       ,
  "Father Christmas"
];

const insertY = [
  "the soup kitchen",
  "Disneyland"      ,
  "the White House"
];

const insertZ = [
  "spontaneously combusted",
  "melted into a puddle on the sidewalk",
  "turned into a slug and crawled away"
];

randomize.addEventListener('click', result);


function temperature(fahrenheit, country) {
  const celcius = F => Math.round((F - 32) * 5 / 9);

  switch (country) {
    case "us":
      return `${fahrenheit} fahrenheit`;
    case "uk":
      return `${celcius(fahrenheit)} celcius`;
    default:
      throw new Error(`Country ${country} is not supported`);
  }
}

function weight(lbs, country) {
  const suffix = (weight) => {
    return weight % 10 === 1? "": "s";
  }
  
  const stones = lbs => Math.round(lbs * 0.0714286);
  const kilograms = lbs => Math.round(lbs * 0.453592);

  switch (country) {
    case "us": {
      const weight = lbs;
      return `${weight} pound${suffix(weight)}`;
    }
    case "uk": {
      const weight = stones(lbs);
      return `${weight} stone${suffix(weight)}`;
    }
    default:
      throw new Error(`Country ${country} is not supported`);
  }
}

function substitute(text, params) {
  for (const param in params) {
    text = text.replaceAll(`:${param}:`, params[param].toString());
  }
  return text;
}


function result() {
  const locale = document.getElementById("uk").checked? "uk" : "us";
  const params = {
    name: "Bob",
    temperature: temperature(94, locale),
    weight: weight(300, locale),
    insertx: randomValueFromArray(insertX),
    inserty: randomValueFromArray(insertY),
    insertz: randomValueFromArray(insertZ)
  };

  if(customName.value !== '') {
    params.name = customName.value;
  }

  story.textContent = substitute(storyText, params);
  story.style.visibility = 'visible';
}

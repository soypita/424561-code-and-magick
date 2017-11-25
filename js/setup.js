'use strict';

var NUMBER_OF_PERSONS = 4;

var PERSONS_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var PERSONS_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var PERSONS_EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var getRandomInRange = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

var getPersonName = function () {
  return PERSONS_NAMES[getRandomInRange(0, PERSONS_NAMES.length - 1)] + ' ' +
    PERSONS_SURNAMES[getRandomInRange(0, PERSONS_SURNAMES.length - 1)];
};

var getRandomCoatColor = function () {
  return COAT_COLORS[getRandomInRange(0, COAT_COLORS.length - 1)];
};

var getRandomEyesColor = function () {
  return PERSONS_EYES_COLORS[getRandomInRange(0, PERSONS_EYES_COLORS.length - 1)];
};

document.querySelector('.setup').classList.remove('hidden');

var persons = [];

for (var i = 0; i < NUMBER_OF_PERSONS; i++) {
  var personName = getPersonName();
  var personCoatColor = getRandomCoatColor();
  var personEyesColor = getRandomEyesColor();
  persons[i] = {
    name: personName,
    coatColor: personCoatColor,
    eyesColor: personEyesColor
  };
}

var wizardTemplate = document.getElementById('similar-wizard-template').content;

var renderWizard = function (person) {
  var wizard = wizardTemplate.cloneNode(true);
  wizard.querySelector('.setup-similar-label').textContent = person.name;
  wizard.querySelector('.wizard-coat').style.fill = person.coatColor;
  wizard.querySelector('.wizard-eyes').style.fill = person.eyesColor;
  return wizard;
};

var fillContainer = function (container) {
  for (var j = 0; j < NUMBER_OF_PERSONS; j++) {
    container.appendChild(renderWizard(persons[j]));
  }
};

var container = document.querySelector('.setup-similar-list');

var fragment = document.createDocumentFragment();

fillContainer(fragment);

container.appendChild(fragment);

document.querySelector('.setup-similar').classList.remove('hidden');


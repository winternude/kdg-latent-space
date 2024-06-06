let characters = null;

/*
*
DATA FETCHING
*
*/

fetch('../assets/data/questions.json')
  .then((response) => {
    console.log('Fetching questions:', response.url); // Log the URL being fetched
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    loadQuestions(data.questions);
  })
  .catch((error) => console.error('Error fetching questions:', error));

fetch('../assets/data/characters.json')
  .then((response) => {
    console.log('Fetching characters:', response.url); // Log the URL being fetched
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    characters = data.characters;
    loadCharacters(data.characters);
  })
  .catch((error) => console.error('Error fetching characters:', error));

/*
*
INITIALIZING QUESTIONNAIRE FROM DATA
*
*/

function loadQuestions(questions) {
  const form = document.getElementById('questionnaireForm');

  questions.forEach((questionObj, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const questionText = document.createElement('p');
    questionText.textContent = questionObj.question;
    questionDiv.appendChild(questionText);

    questionObj.answers.forEach((answer) => {
      const label = document.createElement('label');
      const input = document.createElement('input');

      input.type = 'radio';
      input.name = `question${index}`;
      input.value = answer.value;
      label.appendChild(input);

      const answerText = document.createTextNode(answer.text);
      label.appendChild(answerText);

      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement('br'));
    });

    form.appendChild(questionDiv);
  });
}

/*
*
HANDLING ANSWERS 
*
*/

function submitAnswers() {
  const form = document.getElementById('questionnaireForm');
  const formData = new FormData(form);
  const userAnswers = [];

  for (const [name, value] of formData.entries()) {
    userAnswers.push(value);
  }
  const characterMatches = calculateMatches(userAnswers, characters);
  displayResults(characterMatches);
}

/*
*
RENDER CARDS FROM DATA
*
*/

function loadCharacters(characters) {
  const container = document.querySelector('.content-result__characters');

  characters.forEach((character) => {
    console.log(character);
    const characterDiv = document.createElement('div');
    characterDiv.setAttribute('id', character.id);
    characterDiv.classList.add('content-result__character');

    const resultDiv = document.createElement('div');
    resultDiv.classList.add('content-result__character-result');

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('content-result__character-card');

    characterDiv.append(resultDiv);

    const img = document.createElement('img');
    img.src = character.image;
    img.alt = character.name;
    cardDiv.appendChild(img);

    const nameDiv = document.createElement('h2');
    nameDiv.textContent = character.name;
    cardDiv.appendChild(nameDiv);

    const attributes = document.createElement('p');
    attributes.innerHTML = `
                        Power: ${character.attributes.power} <br>
                        Technique: ${character.attributes.technique}
                    `;
    cardDiv.appendChild(attributes);

    characterDiv.append(cardDiv);

    container.appendChild(characterDiv);
  });
}

/*
*
CALCULATING WHICH CHARACTER MATCHES BEST
*
*/

function calculateMatches(userAnswers, characters) {
  let bestMatch = null;
  let highestScore = -1;

  const matches = characters.map((character) => {
    let score = 0;

    for (let i = 0; i < userAnswers.length; i++) {
      if (userAnswers[i] === character.answers[i]) {
        score++;
      }
    }

    const matchPercentage = (score / userAnswers.length) * 100;
    if (score > highestScore) {
      highestScore = score;
      bestMatch = {
        name: character.name,
        id: character.id,
        description: character.description,
        matchPercentage: matchPercentage.toFixed(2),
      };
    }

    return {
      name: character.name,
      id: character.id,
      description: character.description,
      matchPercentage: matchPercentage.toFixed(2), // Round to 2 decimal places
    };
  });

  return { matches, bestMatch };
}

/*
*
DISPLAY MATCH VALUE FOR ALL CHARACTERS
*
*/

function displayResults({ matches, bestMatch }) {
  matches.forEach((characterMatch) => {
    const resultItem = document.querySelector(
      `#${characterMatch.id}`
    ).firstChild;

    resultItem.textContent = `${characterMatch.matchPercentage}%`;
  });

  const bestDescriptionDiv = document.querySelector(
    '.content-result__best-description'
  );

  const bestMatchContainer = document.querySelector(
    '.content-result__best-match'
  );
  const bestMatchCard = document.querySelector(`#${bestMatch.id}`);
  bestMatchContainer.append(bestMatchCard);

  bestDescriptionDiv.innerHTML = `${bestMatch.description}`;
}

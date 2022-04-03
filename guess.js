const test = () => {
  console.log("hello");
};

const handleSubmit = async () => {
  const inputValue = document.getElementById("guess-input").value;
  if (!inputValue) return;
  clearInput();
  showSegmentNumbers(inputValue);
  checkGuessing(inputValue);
};

const checkGuessing = async (typedNumber) => {
  fetch("https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300")
    .then((response) => {
      // handle the response and stringify json response
      response.json().then((responseJSON) => {
        //check if reponse status is greater than 200
        if (response.status > 200) {
          document.getElementById("guess-input").disabled = true;
          //set innerHTML for error
          const html = `ERRO`;
          let container = document.querySelector("div #response-message");
          container.classList.add("error");
          container.innerHTML = html;
          console.log(response.status);
          const segmentsLoaded = showSegmentNumbers(String(response.status));
          segmentsLoaded && changeColor("red");
          blockFieldsAndShowNewGameButton();

          return;
        } else {
          //compare the typed number with the server number the set the innerHTML based
          //on the result
          const comparisonResult = compare(responseJSON.value, typedNumber);

          //if is success show newGame button
          if (comparisonResult.class === "success") {
            // showSegmentNumbers(typedNumber);
            changeColor("green");
            blockFieldsAndShowNewGameButton();
          }

          document
            .getElementById("response-message")
            .classList.add(comparisonResult.class);
          const html = `<p>${comparisonResult.result}</p>`;
          let container = document.querySelector("div #response-message");
          container.innerHTML = html;
          console.log("tambem estou chegando");
          changeColor("green");
          return;
        }
      });
    })
    .catch((error) => {
      // handle the error for request/connection

      const html = `<p>ERRO</p>`;
      let container = document.querySelector("div #response-message");
      container.classList.add("error");
      container.innerHTML = html;
      changeColor("red");
      blockFieldsAndShowNewGameButton();
    });
};

//function called when NOVA PARTIDA button is pressed
const newGame = () => {
  document.getElementById("response-message").classList.remove("answer");
  const guessInput = document.getElementById("guess-input");
  guessInput.classList.remove("disabled");
  guessInput.value = "";

  document.getElementById("guess-button").classList.remove("disabled");
  document.querySelector("button").disabled = false;
  document.querySelector("div #play-again").style.visibility = "hidden";
  document.querySelector("div #response-message").innerHTML = "";
  showSegmentNumbers("0");
};

//function to compare numberFroomTheServer and typedNumber
//returns an object with the result string and class
const compare = (numberFromTheServer, typedNumber) => {
  // const typedNumber = document.getElementById("guess-input").value;
  console.log("typed number:", typedNumber);
  if (typedNumber < numberFromTheServer)
    return { result: "É MENOR", class: "answer" };
  if (typedNumber > numberFromTheServer)
    return { result: "É MAIOR", class: "answer" };
  if (typedNumber < numberFromTheServer)
    return { result: "Você acertou!!!!", class: "success" };
};

const clearInput = () => {
  document.getElementById("guess-input").value = "";
};

const showSegmentNumbers = (typedNumber) => {
  const splitedTypedNumber = typedNumber.split("");
  const numberDiv = document.getElementById("number-wrapper");
  numberDiv.innerHTML = "";
  splitedTypedNumber.map((num) => {
    numberDiv.innerHTML += `<object type="image/svg+xml" id="number" data="./assets/${num}.svg" />`;
  });
  console.log("splited number:", splitedTypedNumber);
  return true;
};

const blockFieldsAndShowNewGameButton = () => {
  document.getElementById("guess-input").classList.add("disabled");
  document.getElementById("response-message").classList.toggle("answer");
  document.getElementById("guess-button").classList.add("disabled");
  const SendButton = document.querySelector("button");

  SendButton.disabled = true;

  const newGameButton = (document.querySelector(
    "div #play-again"
  ).style.visibility = "visible");
};

const changeColor = (color) => {
  this.document.querySelectorAll("object").forEach((obj) => {
    obj
      .getSVGDocument()
      .querySelectorAll("svg path.segment")
      .forEach((c) => {
        c.style.fill = color;
      });
  });
};

const changeSegment = () => {
  const sm = document.documentElement.querySelector("object");
  const som = document.querySelector("object").contentDocument.documentElement;
  const som1 = document.querySelector("img");
  console.log(som1);
};

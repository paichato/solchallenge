const colors = { error: "#CC3300", success: "#32BF00", green: "green" };

let serverData = { number: "0", status: "null" };

window.onpageshow = () => {
  getNumber();
};

const newHandleSubmit = () => {
  const inputValue = document.getElementById("guess-input").value;
  if (!inputValue) return;
  const localServerData = serverData;

  clearInput();

  if (Number(localServerData.number) < 0) {
    const html = `<p>ERRO</p>`;
    let container = document.querySelector("div #response-message");
    container.classList.add("error");
    container.innerHTML = html;
    showSegmentNumbers(inputValue, colors.error);
    blockFieldsAndShowNewGameButton();
    return;
  }

  const comparisonResult = compare(
    Number(localServerData.number),
    Number(inputValue)
  );

  //if is success show newGame button
  if (comparisonResult.class === "success") {
    showSegmentNumbers(inputValue, colors.success);
    document
      .getElementById("response-message")
      .classList.add(comparisonResult.class);
    const html = `<p>${comparisonResult.result}</p>`;
    let container = document.querySelector("div #response-message");
    container.innerHTML = html;
    blockFieldsAndShowNewGameButton();
    return;
  }
  getNumber();
  showSegmentNumbers(inputValue);
  document
    .getElementById("response-message")
    .classList.add(comparisonResult.class);
  const html = `<p>${comparisonResult.result}</p>`;
  let container = document.querySelector("div #response-message");
  container.innerHTML = html;

  document.getElementById("guess-input").focus();

  return;
};

const getNumber = async () => {
  fetch("https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300")
    .then((response) => {
      // handle the response and stringify json response
      response.json().then((responseJSON) => {
        //check if reponse status is greater than 200
        if (response.status > 200) {
          serverData.number = String(response.status);
          serverData.status = "error";
          console.log("error status code:", String(response.status));

          document.getElementById("guess-input").disabled = true;

          //handling error innerHtml
          const html = `ERRO`;
          let container = document.querySelector("div #response-message");
          container.classList.add("error");
          container.innerHTML = html;

          showSegmentNumbers(String(response.status), colors.error);

          blockFieldsAndShowNewGameButton();

          return;
        } else {
          //compare the typed number with the server number the set the innerHTML based
          //on the result
          serverData.number = responseJSON.value;
          serverData.status = "sucess";
          console.log("number from server:", serverData.number);

          //if is success show newGame button

          return;
        }
      });
    })
    .catch((error) => {
      // handle the error for request/connection
      serverData.number = "-1";
      serverData.status = "error";
    });
};

//function called when NOVA PARTIDA button is pressed
const newGame = () => {
  document.getElementById("response-message").classList.remove("answer");
  document.getElementById("response-message").classList.remove("success");
  const guessInput = document.getElementById("guess-input");
  guessInput.classList.remove("disabled");
  guessInput.value = "";
  guessInput.disabled = false;

  document.querySelector("button").disabled = false;
  document.getElementById("guess-button").classList.remove("disabled");
  document.querySelector("div #play-again").style.visibility = "hidden";
  document.querySelector("div #response-message").innerHTML = "";
  showSegmentNumbers("0");
  getNumber();
  handleFocus();
};

//function to compare numberFroomTheServer and typedNumber
//returns an object with the result string and class
const compare = (numberFromTheServer, typedNumber) => {
  // console.log("typed number:", typedNumber);
  if (typedNumber < numberFromTheServer)
    return { result: "É MENOR", class: "answer" };
  if (typedNumber > numberFromTheServer)
    return { result: "É MAIOR", class: "answer" };
  if (typedNumber === numberFromTheServer)
    return { result: "Você acertou!!!!", class: "success" };
};

//function to clear input
const clearInput = () => {
  document.getElementById("guess-input").value = "";
};
const handleFocus = () => {
  document.getElementById("guess-input").focus();
};

//function to show the numbers on submit
const showSegmentNumbers = (typedNumber, color) => {
  const splitedTypedNumber = typedNumber.split("");
  const numberDiv = document.getElementById("number-wrapper");
  numberDiv.innerHTML = "";
  setTimeout(() => {
    splitedTypedNumber.forEach((num) => {
      numberDiv.innerHTML += `<object type="image/svg+xml" id="number" data="./assets/${num}.svg" />`;
    });

    document.getElementById("number").addEventListener("load", (e) => {
      console.log("loaded objs");
      setTimeout(() => {
        color ? changeColor(color) : null;
      }, 50);
    });
  }, 50);
};

//function to handle new game
const blockFieldsAndShowNewGameButton = () => {
  document.getElementById("guess-input").classList.add("disabled");
  document.getElementById("response-message").classList.toggle("answer");
  document.getElementById("guess-button").classList.add("disabled");
  const SendButton = document.querySelector("button");
  document.getElementById("guess-input").disabled = true;
  SendButton.disabled = true;

  const newGameButton = (document.querySelector(
    "div #play-again"
  ).style.visibility = "visible");
};

//function to change the color based on paramater/type
const changeColor = (color) => {
  document.querySelectorAll("object").forEach((obj) => {
    obj
      .getSVGDocument()
      .querySelectorAll("svg path.segment")
      .forEach((c) => {
        c.style.fill = color;
        // c.classList.add("error");
      });
  });
};

//-------------------------------------- PLEASE IGNORE THIS SECTION ---------------------------------------------------
//old logic, please ignore
const checkGuessing = async (typedNumber) => {
  fetch("https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300")
    .then((response) => {
      // handle the response and stringify json response
      response.json().then((responseJSON) => {
        //check if reponse status is greater than 200
        if (response.status > 200) {
          document.getElementById("guess-input").disabled = true;

          //handling error innerHtml
          const html = `ERRO`;
          let container = document.querySelector("div #response-message");
          container.classList.add("error");
          container.innerHTML = html;
          console.log(response.status);
          showSegmentNumbers(String(response.status), colors.error);

          blockFieldsAndShowNewGameButton();

          return;
        } else {
          //compare the typed number with the server number the set the innerHTML based
          //on the result
          const comparisonResult = compare(responseJSON.value, typedNumber);

          //if is success show newGame button
          if (comparisonResult.class == "success") {
            showSegmentNumbers(typedNumber, colors.success);
            // changeColor("green");
            blockFieldsAndShowNewGameButton();
          }

          document
            .getElementById("response-message")
            .classList.add(comparisonResult.class);
          const html = `<p>${comparisonResult.result}</p>`;
          let container = document.querySelector("div #response-message");
          container.innerHTML = html;
          console.log("tambem estou chegando");
          showSegmentNumbers(typedNumber);
          document.getElementById("guess-input").focus();

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
      showSegmentNumbers(typedNumber, colors.error);
      blockFieldsAndShowNewGameButton();
    });
};

const handleSubmit = async (e) => {
  // e.preventDefault();
  const inputValue = document.getElementById("guess-input").value;
  if (!inputValue) return;
  clearInput();
  checkGuessing(inputValue);

  console.log("RUNNING HANDLE SUBMIT");
};

//-------------------------------------- PLEASE IGNORE THIS SECTION ---------------------------------------------------

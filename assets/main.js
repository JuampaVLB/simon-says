const startButton = document.querySelector("#start-button");
const panels = document.querySelectorAll(".panel");
const sound = document.querySelector("#sound");
const counterElement = document.querySelector(".counter");
const spanValue = counterElement.querySelector("#number");

var contador = 0;
var length = 5;
var answer = [];
var sequence = [];
var validate = false;

const redPanel = panels[0];
const bluePanel = panels[1];
const yellowPanel = panels[3];
const greenPanel = panels[2];

var speedPerPanel = 900;
var speedPerPaint = 700;

const NextRound = () => {
  if (parseInt(spanValue.textContent, 10) > 5) {
    length = 6;
    speedPerPanel = 800;
    speedPerPaint = 650;
  }

  if (parseInt(spanValue.textContent, 10) > 9) {
    length = 8;
    speedPerPanel = 700;
    speedPerPaint = 580;
  }

  validate = true;
  startButton.classList.add("disabled");
  startButton.innerHTML = "playing";
  answer = [];
  sequence = [];
  contador = 0;
  fetch(`../controllers/logic.php?number=${length}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(
        "this is the SEQUENCE please do not watch it it is cheating..."
      );
      console.log(data);
      sequence = data;
      const numericValue = parseInt(spanValue.textContent, 10) + 1;
      spanValue.textContent = numericValue.toString();
      ShowSequence(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const CheckColor = (color) => {
  switch (color) {
    case "red":
      redPanel.style.filter = "brightness(200%)";
      sound.play();
      setTimeout(() => {
        redPanel.style.filter = "brightness(100%)";
      }, speedPerPaint);
      break;

    case "blue":
      bluePanel.style.filter = "brightness(200%)";
      sound.play();
      setTimeout(() => {
        bluePanel.style.filter = "brightness(100%)";
      }, speedPerPaint);
      break;

    case "yellow":
      yellowPanel.style.filter = "brightness(200%)";
      sound.play();
      setTimeout(() => {
        yellowPanel.style.filter = "brightness(100%)";
      }, speedPerPaint);
      break;

    case "green":
      greenPanel.style.filter = "brightness(200%)";
      sound.play();
      setTimeout(() => {
        greenPanel.style.filter = "brightness(100%)";
      }, speedPerPaint);
      break;

    default:
      break;
  }
};

const ShowSequence = (colors) => {
  startButton.disabled = true;

  let index = 0;

  setInterval(() => {
    if (index >= length) {
      startButton.disabled = false;
      redPanel.style.removeProperty("filter");
      bluePanel.style.removeProperty("filter");
      yellowPanel.style.removeProperty("filter");
      greenPanel.style.removeProperty("filter");

      return;
    }
    CheckColor(colors[index]);

    index++;
  }, speedPerPanel);
};

const CheckAnswer = (jsonData) => {
  fetch("../controllers/logic.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  })
    .then((response) => response.json())
    .then((data) => {
      answer = [];

      contador = 0;

      if (data) {
        alert("You advanced to the next round!");
        NextRound();
      } else {
        Lost();
        validate = false;
        startButton.disabled = false;
        startButton.classList.remove("disabled");
        startButton.innerHTML = "playing";
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const SaveData = (nickname) => {
  let json = {
    nickname,
    round: spanValue.textContent,
  };

  fetch("../controllers/scoreboard.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  })
    .then((response) => location.reload())
    .catch((err) => {
      console.log(err);
      alert("Ocurred an error");
    });

  spanValue.innerHTML = "0";
};

const Lost = () => {
  if (sequence.length > 0) {
    sequence = [];
    alert("You Lost!");
    if (parseInt(spanValue.textContent, 10) > 1) {
      let saveYesOrNo = confirm("Do you want to save your score?");
      if (saveYesOrNo) {
        let nickname = prompt("Whats is your nickname?");
        if (nickname) return SaveData(nickname);
      }
      location.reload();
    } else {
      location.reload();
    }
  } else {
    Lost();
  }
};

// Start Game

startButton.addEventListener("click", () => {
  if (!validate) {
    return NextRound();
  }

  startButton.disabled = true;
  startButton.classList.add("disabled");
  startButton.innerHTML = "playing";
});

// Validate when a user clicks on a panel

panels.forEach((buttons) => {
  buttons.addEventListener("click", (e) => {
    sound.play();
    answer.push(e.target.getAttribute("color"));
    contador++;
    if (contador === length) {
      let dataToSend = {
        array1: sequence,
        array2: answer,
      };

      let jsonData = JSON.stringify(dataToSend);
      CheckAnswer(jsonData);
    }
  });
});

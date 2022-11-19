let contentData = "";
let resultData = "";
function renderKeyBroad() {
  const KEYS = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "C"];
  const numberKeyElement = document.getElementById("number-key");

  KEYS.forEach((item) => {
    const keyElement = document.createElement("p");
    keyElement.innerHTML = item;
    numberKeyElement.appendChild(keyElement);
    keyElement.addEventListener("click", onClickKeyBoard);
  });
}

function onClickKeyBoard(event) {
  const currentKeyElement = event.target;
  const keyContent = currentKeyElement.textContent;
  if (keyContent === "C") {
    contentData = "";
    resultData = "";
    renderCalculator();
    renderResult();
  } else {
    contentData += keyContent;
    renderCalculator();
  }
}

function handleCalculatorKey() {
  const calculatorKeyElement = document.getElementById("calculator-key");
  const childCalculatorKeyElement = calculatorKeyElement.childNodes;
  childCalculatorKeyElement.forEach((item) => {
    item.addEventListener("click", (event) => {
      const currentItemElement = event.target;
      const childKey = currentItemElement.dataset.key;
      contentData += childKey;
      renderCalculator();
    });
  });
}

function handleEqualKey() {
  const equalKeyElement = document.getElementById("equal-key");
  equalKeyElement.addEventListener("click", (event) => {
    try {
      const result = eval(contentData);
      resultData = result;
      renderResult();
    } catch (error) {
      renderResult(true);
    }
  });
}

function renderCalculator() {
  const calculatorElement = document.getElementById("calculator-content");
  calculatorElement.innerHTML = contentData;
}

function renderResult(isError) {
  const resultElement = document.getElementById("result-content");
  resultElement.innerHTML = isError ? "Error" : resultData;
}

function main() {
  renderKeyBroad();
  renderCalculator();
  renderResult();
  handleCalculatorKey();
  handleEqualKey();
}

main();

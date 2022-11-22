let contentData = "";
let contentResult = "";
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
  contentData += keyContent;
  renderCalculator();
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

function renderCalculator() {
  const calculatorElement = document.getElementById("calculator-content");
  calculatorElement.innerHTML = contentData;
}

function renderResult() {
  const resultElement = document.getElementById("result-content");
  resultElement.innerHTML = contentResult;
}

function main() {
  renderKeyBroad();
  renderCalculator();
  renderResult();
  handleCalculatorKey();
}

main();

let contentData = "0";
let resultData = "";
let previousData = "";

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
    resetData();
    renderCalculator();
    renderResult();
  } else {
    if (checkTheFirstSave() || contentData === "0") {
      contentData = "";
      resultData = "";
      previousData = "";
    }

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
      if (previousData) {
        contentData = "";
      }

      contentData += childKey;
      renderCalculator();
    });
  });
}

function handleEqualKey() {
  const equalKeyElement = document.getElementById("equal-key");
  equalKeyElement.addEventListener("click", (event) => {
    try {
      const result = eval(previousData + contentData);
      resultData = result;
      previousData = result;
      renderResult();
    } catch (error) {
      renderResult(true);
    }
  });
}

function renderCalculator() {
  const calculatorElement = document.getElementById("calculator-content");

  const formattedContentData = formatContentData(contentData);

  calculatorElement.innerHTML =
    `${previousData ? "Ans" : ""}` + formattedContentData;
}

function renderResult(isError) {
  const resultElement = document.getElementById("result-content");
  resultElement.innerHTML = isError ? "Error" : resultData;
}

function resetData() {
  resultData = "";
  contentData = "0";
  previousData = "";
}

function formatContentData(currentContentData) {
  let newContentData = `${currentContentData}`;

  for (let index = 0; index < newContentData.length; index++) {
    const currentChar = newContentData[index];
    switch (currentChar) {
      case "*":
        newContentData = replaceAt(newContentData, index, "x");
        break;
      case "/":
        newContentData = replaceAt(newContentData, index, ":");
        break;
      default:
        break;
    }
  }

  return newContentData;
}

function replaceAt(value, index, replacement) {
  return (
    value.substring(0, index) +
    replacement +
    value.substring(index + replacement.length)
  );
}

function checkTheFirstSave() {
  const calculatorElement = document.getElementById("calculator-content");
  const calculatorContent = calculatorElement.textContent;
  if (!calculatorContent.includes("Ans") && previousData) {
    return true;
  }
  return false;
}

function main() {
  renderKeyBroad();
  renderCalculator();
  renderResult();
  handleCalculatorKey();
  handleEqualKey();
}

main();

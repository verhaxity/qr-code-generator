// DOM elements
const container = document.querySelector(".container");
const userInput = document.getElementById("placement");
const submitBtn = document.getElementById("generate");
const downloadBtn = document.getElementById("download-btn");
const sizeOptions = document.querySelector(".size");
const BGColor = document.getElementById("Color1");
const FGColor = document.getElementById("color2");

// Variables
let QR_Code;
let sizeChoice = 100;
let BGColorChoice = "#000000";
let FGColorChoice = "#ffffff";

// Event listeners
sizeOptions.addEventListener("change", () => {
  sizeChoice = sizeOptions.value;
});

BGColor.addEventListener("input", () => {
  BGColorChoice = BGColor.value;
});

FGColor.addEventListener("input", () => {
  FGColorChoice = FGColor.value;
});

userInput.addEventListener("input", () => {
  if (userInput.value.trim().length < 1) {
    submitBtn.disabled = true;
    downloadBtn.href = "";
    downloadBtn.classList.add("hide");
  } else {
    submitBtn.disabled = false;
  }
});

// Functions
const inputFormatter = (value) => {
  value = value.replace(/[^a-z0-9A-Z]+/g, "");
  return value;
};

const generateQRCode = async () => {
  // Clear container
  container.innerHTML = "";

  // Generate QR code
  QR_Code = await new QRCode(container, {
    text: userInput.value,
    width: sizeChoice,
    height: sizeChoice,
    colorDark: FGColorChoice,
    colorLight: BGColorChoice,
  });

  // Set url for download
  const src = container.firstChild.toDataURL("image/pmg");
  downloadBtn.href = src;

  // Set download button properties
  let userValue = userInput.value;
  try {
    userValue = new URL(userValue).hostname;
  } catch (_) {
    userValue = inputFormatter(userValue);
  }
  downloadBtn.download = `${userValue}QR`;
  downloadBtn.classList.remove("hide");
};

// Initialize page
window.onload = () => {
  container.innerHTML = "";
  sizeOptions.value = sizeChoice;
  userInput.value = "";
  BGColor.value = BGColorChoice;
  FGColor.value = FGColorChoice;
  downloadBtn.classList.add("hide");
  submitBtn.disabled = true;
};

// Event listener for submit button
submitBtn.addEventListener("click", generateQRCode);

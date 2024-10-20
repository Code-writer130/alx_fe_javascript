// Step 1: Create an array of quote objects (each with text and category)
const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    category: "inspirational",
  },
  {
    text: "Life is what happens when you’re busy making other plans.",
    category: "life",
  },
  {
    text: "Why don’t scientists trust atoms? Because they make up everything!",
    category: "funny",
  },
];

// Function to display a random quote using createElement and appendChild
function showRandomQuote() {
  // Get a random quote from the array
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Find the quote display area in the DOM and clear any previous content
  const quoteDisplay = document.getElementById("quote-display");
  quoteDisplay.innerHTML = ""; // Clear previous quote

  // Create a new paragraph element for the quote
  const quoteParagraph = document.createElement("p");
  quoteParagraph.textContent = `"${randomQuote.text}" - (${randomQuote.category})`;

  // Append the new paragraph to the quote display area
  quoteDisplay.appendChild(quoteParagraph);
}

// Function to dynamically create and display the quote addition form
function createAddQuoteForm() {
  // Get the parent container where the form will be added
  const formContainer = document.getElementById("form-container");

  // Create a form element
  const form = document.createElement("form");
  form.id = "quote-form";

  // Create input for new quote text
  const newQuoteTextInput = document.createElement("input");
  newQuoteTextInput.id = "newQuoteText";
  newQuoteTextInput.type = "text";
  newQuoteTextInput.placeholder = "Enter a new quote";
  form.appendChild(newQuoteTextInput);

  // Create input for new quote category
  const newQuoteCategoryInput = document.createElement("input");
  newQuoteCategoryInput.id = "newQuoteCategory";
  newQuoteCategoryInput.type = "text";
  newQuoteCategoryInput.placeholder = "Enter quote category";
  form.appendChild(newQuoteCategoryInput);

  // Create a button to submit the form
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Add Quote";
  form.appendChild(submitButton);

  // Append the form to the form container in the DOM
  formContainer.appendChild(form);

  // Add an event listener to handle the form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get the values from the input fields
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;

    // Ensure that both fields are filled
    if (newQuoteText === "" || newQuoteCategory === "") {
      alert("Please fill out both the quote and the category");
      return;
    }

    // Create a new quote object
    const newQuote = { text: newQuoteText, category: newQuoteCategory };

    // Add the new quote to the array
    quotes.push(newQuote);

    // Optionally, display the new quote immediately
    const quoteDisplay = document.getElementById("quote-display");
    quoteDisplay.innerHTML = ""; // Clear previous quote

    // Create a new paragraph element for the newly added quote
    const newQuoteParagraph = document.createElement("p");
    newQuoteParagraph.textContent = `"${newQuoteText}" - (${newQuoteCategory})`;

    // Append the new quote paragraph to the quote display area
    quoteDisplay.appendChild(newQuoteParagraph);

    // Clear the input fields after submission
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    // Provide confirmation
    alert("New quote added!");
  });
}

// Event listener for showing a random quote when the button is clicked
document
  .getElementById("random-quote-btn")
  .addEventListener("click", showRandomQuote);

// Call the function to create and handle the form logic when the DOM is ready
createAddQuoteForm();
// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes)); // Save the quotes array as a JSON string
}

// Function to load quotes from local storage on initialization
// Function to save quotes to local storage
function saveQuotes() {
  // Stringify the quotes array and store it in localStorage under the key 'quotes'
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Load quotes from local storage when the page loads
// Function to load quotes from local storage
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes"); // Retrieve the string from local storage
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes); // Convert the JSON string back to an array of quotes
  }
}

function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes);
  const dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  const exportFileDefaultName = "quotes.json";

  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result); // Parse the uploaded JSON
      quotes.push(...importedQuotes); // Add imported quotes to the array
      saveQuotes(); // Save updated quotes to local storage
      alert("Quotes imported successfully!");
    } catch (error) {
      alert("Invalid JSON file");
    }
  };

  fileReader.readAsText(event.target.files[0]); // Read the uploaded file
}

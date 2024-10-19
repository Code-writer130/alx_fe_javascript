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

// Function to add a new quote dynamically using createElement and appendChild
function addQuote() {
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
}

// Event listener for showing a random quote when the button is clicked
document
  .getElementById("random-quote-btn")
  .addEventListener("click", showRandomQuote);

// Array to store quotes
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

// Function to display a random quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  const quoteDisplay = document.getElementById("quote-display");
  quoteDisplay.textContent = `"${randomQuote.text}" - (${randomQuote.category})`;
}

// Add event listener to the "Show Random Quote" button
document
  .getElementById("random-quote-btn")
  .addEventListener("click", showRandomQuote);

// Function to add a new quote
function addQuote() {
  // Get the values from the input fields
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  // Ensure both fields are filled
  if (newQuoteText === "" || newQuoteCategory === "") {
    alert("Please fill out both fields");
    return;
  }

  // Create a new quote object
  const newQuote = { text: newQuoteText, category: newQuoteCategory };

  // Add the new quote to the array
  quotes.push(newQuote);

  // Optionally, display the newly added quote immediately
  document.getElementById(
    "quote-display"
  ).textContent = `"${newQuoteText}" - (${newQuoteCategory})`;

  // Clear the input fields after submission
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("Quote added successfully!");
}

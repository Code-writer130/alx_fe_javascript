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

// Function to display a random quote using innerHTML
function showRandomQuote() {
  // Get a random quote from the array
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Find the quote display area in the DOM
  const quoteDisplay = document.getElementById("quote-display");

  // Update the DOM using innerHTML to allow for any HTML formatting
  quoteDisplay.innerHTML = `<p>"${randomQuote.text}" - <strong>(${randomQuote.category})</strong></p>`;
}

// Function to handle adding a new quote via the form
function createAddQuoteForm() {
  // Get the form elements (or wrap this logic if using a form submit button)
  const form = document.getElementById("quote-form");

  // Add event listener to handle the form submission
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

    // Optionally, display the new quote immediately using innerHTML
    const quoteDisplay = document.getElementById("quote-display");
    quoteDisplay.innerHTML = `<p>"${newQuoteText}" - <strong>(${newQuoteCategory})</strong></p>`;

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

// Call the function to handle the form logic when the DOM is ready
createAddQuoteForm();

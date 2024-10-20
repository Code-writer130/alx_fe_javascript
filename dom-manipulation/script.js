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
  // Step 1: Stringify the quotes array to turn it into JSON format
  const dataStr = JSON.stringify(quotes, null, 2); // Pretty print JSON with 2-space indentation

  // Step 2: Create a Blob from the JSON string
  const blob = new Blob([dataStr], { type: "application/json" });

  // Step 3: Create an object URL from the Blob
  const url = URL.createObjectURL(blob);

  // Step 4: Create an anchor element and trigger a download
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "quotes.json"; // Set the downloaded file name
  downloadLink.click(); // Simulate a click to trigger the download

  // Step 5: Clean up the object URL
  URL.revokeObjectURL(url); // Free up memory when the download is complete
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

// Function to populate categories in the dropdown
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const categories = new Set();

  // Add a default "all" category
  categories.add("All Categories");

  // Extract unique categories from the quotes array
  quotes.forEach((quote) => categories.add(quote.category));

  // Populate the dropdown menu
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.toLowerCase();
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Function to filter quotes based on the selected category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const quoteContainer = document.getElementById("quoteContainer");

  // Save the last selected category in local storage
  localStorage.setItem("selectedCategory", selectedCategory);

  // Clear the current displayed quotes
  quoteContainer.innerHTML = "";

  // Filter and display quotes
  const filteredQuotes =
    selectedCategory === "all"
      ? quotes
      : quotes.filter(
          (quote) => quote.category.toLowerCase() === selectedCategory
        );

  filteredQuotes.forEach((quote) => {
    const quoteElement = document.createElement("p");
    quoteElement.textContent = quote.text;
    quoteContainer.appendChild(quoteElement);
  });
}

// Function to remember the last selected filter
function loadLastSelectedFilter() {
  const lastSelectedCategory =
    localStorage.getItem("selectedCategory") || "all";
  document.getElementById("categoryFilter").value = lastSelectedCategory;
  filterQuotes();
}

// Function to add new quotes and update categories
function addQuote(text, category) {
  // Add the new quote to the quotes array
  quotes.push({ text, category });

  // Check if the new category is not already in the dropdown
  const categoryFilter = document.getElementById("categoryFilter");
  const categories = Array.from(categoryFilter.options).map(
    (option) => option.value
  );

  if (!categories.includes(category.toLowerCase())) {
    const option = document.createElement("option");
    option.value = category.toLowerCase();
    option.textContent = category;
    categoryFilter.appendChild(option);
  }

  // Refresh the quotes display to include the new quote if the category matches
  filterQuotes();
}

// Call the functions to set up the application
window.onload = function () {
  populateCategories();
  loadLastSelectedFilter();
};
// Mock function to simulate fetching data from the server
async function fetchQuotesFromServer() {
  // Simulating a fetch from a mock server using JSONPlaceholder or a similar service
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const serverQuotes = await response.json();

  // For simplicity, let's assume each serverQuote has 'text' and 'category'
  return serverQuotes.map((item) => ({
    text: item.title,
    category: "Motivation", // Example category, adjust as needed
  }));
}

// Function to sync local data with server
// Function to send new quotes to the server
async function postQuoteToServer(quote) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: quote.text, // Adjust the structure as per your server requirements
        category: quote.category,
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Quote successfully sent to the server:", responseData);
      notifyUser("New quote added and synced with the server.");
    } else {
      console.error("Failed to send the quote to the server.");
    }
  } catch (error) {
    console.error("Error sending quote to server:", error);
  }
}

// Function to add a new quote and send it to the server
function addNewQuote(text, category) {
  const newQuote = { text, category };

  // Add to local quotes
  const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
  localQuotes.push(newQuote);
  localStorage.setItem("quotes", JSON.stringify(localQuotes));

  // Send the new quote to the server
  postQuoteToServer(newQuote);
}

// Function to sync data periodically and handle conflicts
async function syncWithServer() {
  const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
  const serverQuotes = await fetchQuotesFromServer();

  // Merge and handle conflicts (server data takes precedence)
  const mergedQuotes = mergeQuotes(localQuotes, serverQuotes);

  // Update local storage with the merged data
  localStorage.setItem("quotes", JSON.stringify(mergedQuotes));

  // Notify the user about updates or conflicts
  notifyUser("Data has been synced with the server.");
}

// Function to merge local and server quotes, handling conflicts
function mergeQuotes(localQuotes, serverQuotes) {
  const merged = [...serverQuotes];
  const existingTexts = new Set(serverQuotes.map((quote) => quote.text));

  // Add local quotes that are not present on the server
  localQuotes.forEach((localQuote) => {
    if (!existingTexts.has(localQuote.text)) {
      merged.push(localQuote);
    }
  });

  return merged;
}

// Function to notify user of updates or conflicts
function notifyUser(message) {
  alert(message); // This could be enhanced to use better UI notifications
}

// Initialize the application and set up periodic sync
window.onload = function () {
  startPeriodicSync();
};

// Function to start periodic syncing
function startPeriodicSync(interval = 30000) {
  setInterval(syncWithServer, interval);
}
// Function to send local quotes to the server that haven't been synced yet
async function syncLocalQuotesToServer() {
  const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
  const unsyncedQuotes = localQuotes.filter((quote) => !quote.synced);

  for (const quote of unsyncedQuotes) {
    await postQuoteToServer(quote);
    // Mark the quote as synced after successful POST
    quote.synced = true;
  }

  // Update local storage to reflect the synced status
  localStorage.setItem("quotes", JSON.stringify(localQuotes));
}

// Function to fetch new quotes from the server and merge with local quotes
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

  // Merge server quotes with local quotes
  const mergedQuotes = mergeQuotes(localQuotes, serverQuotes);
  localStorage.setItem("quotes", JSON.stringify(mergedQuotes));

  // Notify user
  notifyUser("Quotes have been synced with the server.");
}

// Function to merge local and server quotes, handling conflicts
function mergeQuotes(localQuotes, serverQuotes) {
  const merged = [...serverQuotes];
  const existingTexts = new Set(serverQuotes.map((quote) => quote.text));

  // Add local quotes that are not present on the server
  localQuotes.forEach((localQuote) => {
    if (!existingTexts.has(localQuote.text)) {
      merged.push(localQuote);
    }
  });

  return merged;
}

// Function to send new quotes to the server
async function postQuoteToServer(quote) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: quote.text,
        category: quote.category,
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Quote successfully sent to the server:", responseData);
    } else {
      console.error("Failed to send the quote to the server.");
    }
  } catch (error) {
    console.error("Error sending quote to server:", error);
  }
}

// Function to notify user of updates or conflicts
function notifyUser(message) {
  alert(message); // Simple alert, could be enhanced for better UI
}

// Initialize the app and sync on load
window.onload = function () {
  syncQuotes();
  setInterval(syncQuotes, 30000); // Sync every 30 seconds
};

// Add new quote function to add locally and sync to server
function addNewQuote(text, category) {
  const newQuote = { text, category, synced: false };

  // Add to local storage
  const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
  localQuotes.push(newQuote);
  localStorage.setItem("quotes", JSON.stringify(localQuotes));

  // Sync local quotes to server
  syncLocalQuotesToServer();
}
// Function to send local quotes to the server that haven't been synced yet
async function syncLocalQuotesToServer() {
  const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
  const unsyncedQuotes = localQuotes.filter((quote) => !quote.synced);

  for (const quote of unsyncedQuotes) {
    await postQuoteToServer(quote);
    // Mark the quote as synced after successful POST
    quote.synced = true;
  }

  // Update local storage to reflect the synced status
  localStorage.setItem("quotes", JSON.stringify(localQuotes));
}

// Function to fetch new quotes from the server and merge with local quotes
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

  // Merge server quotes with local quotes
  const mergedQuotes = mergeQuotes(localQuotes, serverQuotes);
  localStorage.setItem("quotes", JSON.stringify(mergedQuotes));

  // Notify user
  notifyUser("Quotes synced with server!");
}

// Function to merge local and server quotes, handling conflicts
function mergeQuotes(localQuotes, serverQuotes) {
  const merged = [...serverQuotes];
  const existingTexts = new Set(serverQuotes.map((quote) => quote.text));

  // Add local quotes that are not present on the server
  localQuotes.forEach((localQuote) => {
    if (!existingTexts.has(localQuote.text)) {
      merged.push(localQuote);
    }
  });

  return merged;
}

// Function to send new quotes to the server
async function postQuoteToServer(quote) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: quote.text,
        category: quote.category,
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Quote successfully sent to the server:", responseData);
    } else {
      console.error("Failed to send the quote to the server.");
    }
  } catch (error) {
    console.error("Error sending quote to server:", error);
  }
}

// Function to notify user of updates or conflicts
function notifyUser(message) {
  alert(message); // Simple alert, could be enhanced for better UI
}

// Initialize the app and sync on load
window.onload = function () {
  syncQuotes();
  setInterval(syncQuotes, 30000); // Sync every 30 seconds
};

// Add new quote function to add locally and sync to server
function addNewQuote(text, category) {
  const newQuote = { text, category, synced: false };

  // Add to local storage
  const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
  localQuotes.push(newQuote);
  localStorage.setItem("quotes", JSON.stringify(localQuotes));

  // Sync local quotes to server
  syncLocalQuotesToServer();
}

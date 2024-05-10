const BookApi = {
  getAllBooks: async () => {
    const res = await fetch("/v1/book", { method: "GET" })
    return res.json()
  },
  getBookByIsbn: async (bookIsbn) => {
    const res = await fetch(`/v1/book/${bookIsbn}`, { method: "GET" })
    return res.json()
  },
  addBook: async (data) => {
    // console.log(data)
    const res = await fetch("/v1/book", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
    return res.json()
  },
  patchBookByIsbn: async (bookIsbn, data) => {
    const res = await fetch(`/v1/book/${bookIsbn}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
    return res.json()
  },
  deleteBook: async (bookIsbn) => {
    const res = await fetch(`/v1/book/${bookIsbn}`, { method: "DELETE" })
    return res.json()
  },
  addCategory: async (categories) => {
    // Validate category name (optional)
    if (!categories || categories.trim() === '') {
      throw new Error('Category name cannot be empty or whitespace.');
    }
  
    // Perform any additional validation or checks as needed
  
    // Send HTTP POST request to backend API endpoint to create the category
    const response = await fetch('/v1/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: categories })
    });
  
    // Check if the response was successful before parsing the JSON
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to add category: ${errorData.message} `);
    }
  
    // Parse the JSON and return the created category
    const createdCategory = await response.json();
    return createdCategory;
  }
  // addCategory: async (categories) => {
  //   // Validate category name (optional)
  //   if (!categories || categories.trim() === '') {
  //     throw new Error('Category name cannot be empty or whitespace.');
  //   }
  
  //   // Perform any additional validation or checks as needed
  
  //   // Send HTTP POST request to backend API endpoint to create the category
  //   const response = await fetch('/v1/book', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ name: categories })
  //   });
  
  //   // Handle response and return result
  //   if (!response.ok) {
  //     const errorData = await response.json();
  //     throw new Error(`Failed to add category: ${errorData.message || 'Unknown error'}`);
  //   }
  
  //   const createdCategory = await response.json();
  //   return createdCategory;
  // }
  
}

module.exports = { BookApi }
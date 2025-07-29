function trackProduct(productId) {
  console.log("Product clicke:", productId);

  try {
    let viewed = JSON.parse(localStorage.getItem('viewedProducts')) || [];

    // Debug current list
    console.log("Before update:", viewed);

    // Remove duplicate
    viewed = viewed.filter(id => id !== productId);

    // Add new item to front
    viewed.unshift(productId);

    // Limit to last 10
    if (viewed.length > 10) viewed.pop();

    // Save updated list
    localStorage.setItem('viewedProducts', JSON.stringify(viewed));

    // Confirm
    console.log("Updated viewedProducts:", JSON.parse(localStorage.getItem('viewedProducts')));
  } catch (e) {
    console.error("Error updating localStorage:", e);
  }
}

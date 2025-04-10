// File: src/services/chatService.js

export const sendMessageToGemini = async (userInput) => {
  try {
    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Gemini response.");
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("❌ Error talking to backend:", error);
    return "🌾 Sorry, I couldn't process that. Please try again later.";
  }
};

function countWords(inputString) {

    // Split the string into an array of words using whitespace as the delimiter
    const words = inputString.split(/\s+/);

    // Return the number of words
    return words.length;
}

// Calculate readingTime
function readingTime(description) {
    const wordsPerMinute = 200; // Adjust this value based on average reading speed
    const wordCount = description.split(/\s+/).length;
    const readingTimeInMinutes = Math.round(wordCount / wordsPerMinute);
    return readingTimeInMinutes;
}

export { countWords, readingTime }
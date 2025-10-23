export const isEmpty = (text) => {
  // Check if text is null, undefined, or not a string
  if (text == null || text == undefined) {
    return true;
  }

  // Trim spaces and check if empty
  if (typeof text == "string") {
    if (text.trim() === "") {
      return true;
    }
  }

  return false;
};

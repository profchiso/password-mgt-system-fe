export function generateStrongPassword(length = 12) {
  // Define characters to be included in the password
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numericChars = "0123456789";
  const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  // Combine all characters
  const allChars =
    uppercaseChars + lowercaseChars + numericChars + specialChars;

  // Ensure the password includes at least one character from each category
  const passwordArray = [
    uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)],
    lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)],
    numericChars[Math.floor(Math.random() * numericChars.length)],
    specialChars[Math.floor(Math.random() * specialChars.length)],
  ];

  // Fill the rest of the password length with random characters from allChars
  for (let i = 4; i < length; i++) {
    passwordArray.push(allChars[Math.floor(Math.random() * allChars.length)]);
  }

  // Shuffle the array to ensure randomness and then join it into a string
  const password = passwordArray.sort(() => Math.random() - 0.5).join("");

  return password;
}

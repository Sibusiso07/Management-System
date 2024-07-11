const cleanErrorMessage = (error) => {
  // Define a regular expression to match the specific error message after "Error: ".
  const regex = /Error:\s*(.+)$/

  // Use the regular expression to match the error message.
  const match = error.message.match(regex)

  // If a match is found, return the captured group (the specific error message), otherwise return a default error message.
  return match ? match[1] : 'An unknown error occurred'
}

export { cleanErrorMessage }

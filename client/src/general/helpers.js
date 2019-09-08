export function hasGyroscope() {}

export function copyToClipboard(string) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(string).then(
      function() {
        console.log('Async: Copying to clipboard was successful!');
      },
      function(err) {
        console.error('Async: Could not copy text: ', err);
      }
    );
  } else {
    console.log('No clipboard support');
  }
}

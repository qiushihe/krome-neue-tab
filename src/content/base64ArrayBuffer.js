export default (buffer) => window.btoa(
  [].slice.call(new Uint8Array(buffer))
    .map((b) => String.fromCharCode(b))
    .join("")
);

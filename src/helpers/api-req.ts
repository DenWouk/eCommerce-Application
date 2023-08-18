export default async function apiRequest(path: string, method: string, data: string) {
  const endpoint = `/api/${path}`;
  // Form the request for sending data to the server.
  const options = {
    // The method is POST because we are sending data.
    method: `${method}`,
    // Tell the server we're sending JSON.
    headers: {
      'Content-Type': 'application/json',
    },
    // Body of the request is the JSON data we created above.
    body: data,
  };
  // Send the form data to our forms API on Vercel and get a response.
  const response = await fetch(endpoint, options);

  // Get the response data from server as JSON.
  // If server returns the name submitted, that means the form works.
  const result = await response.json();
  return result;
}

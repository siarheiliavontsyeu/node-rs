const getDataFromRequest = req => {
  const { url, method, body, query } = req;

  const request = JSON.stringify(body);
  const params = JSON.stringify(query);

  const logToConsole = `request:
  {
    url: ${url},
    method: ${method},
    query-params: ${params}
    body: ${request},
  }`;

  const logToFile = `{ url: ${url} | method: ${method} | query-params: ${params} | body: ${request}}`;

  return { logToConsole, logToFile };
};

module.exports = getDataFromRequest;

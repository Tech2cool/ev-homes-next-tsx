const fetchAdapter = async (url, options = {}) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
    "x-platform": "web",
  };

  const updatedOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: "include", // includes cookies
  };

  try {
    const response = await fetch(url, updatedOptions);
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || "Request failed");
      error.response = data;
      throw error;
    }

    return data; // this will be { data, accessToken, refreshToken }
  } catch (error) {
    console.error("FetchAdapter Error:", error);
    throw error;
  }
};

export default fetchAdapter;

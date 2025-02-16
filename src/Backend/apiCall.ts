import axios, { AxiosRequestConfig } from 'axios';
import { ApiError, RequestOptions } from '../Datatypes/interface';
import { ApiEndpoint } from '../Datatypes/enums';

const Request = async ({ endpointId, slug, data, headers, params, isStream = false }: RequestOptions) => {
  const storedAccessToken = await getAccessToken();

  const endpoint = ApiEndpoint[endpointId];
  console.log(headers);

  if (endpoint.withAuth && !storedAccessToken) {
    throw { statusCode: 700, error: "Not Authorized" } as ApiError;
  }
  if (!endpoint) {
    throw { statusCode: 700, error: `Invalid API endpoint: ${endpointId}` } as ApiError;
  }

  let fullUrl = endpoint.url;
  if (slug) {
    fullUrl += `${slug}`;
  }

  if (isStream) {
    // Use fetch for streaming
    const response = await fetch(fullUrl, {
      method: endpoint.method,
      headers: {
        ...endpoint.headers,
        Authorization: endpoint.withAuth ? `Bearer ${storedAccessToken}` : undefined,
        "Accept": "text/event-stream, audio/mpeg", // Accept both text and audio streams
      },
      body: endpoint.method !== 'GET' ? JSON.stringify(data) : undefined,
    });

    if (!response.body) throw { statusCode: 700, error: `No response body` } as ApiError;

    const contentType = response.headers.get("Content-Type");

    if (contentType === "audio/mpeg") {
      // Handle audio streaming
      const reader = response.body.getReader();
      return {
        async *stream() {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            yield value; // Yield raw audio chunks (Uint8Array)
          }
        },
        contentType: "audio/mpeg", // Indicate that this is an audio stream
      };
    } else {
      // Handle text streaming
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      return {
        async *stream() {
          let buffer = "";
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            // Process complete JSON objects in buffer
            const lines = buffer.split("\n");
            buffer = ""; // Reset buffer after processing

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;

              const data = line.replace("data: ", "").trim();
              if (data === "[DONE]") return;

              try {
                const parsed = JSON.parse(data);
                if (parsed.message) {
                  yield parsed.message;
                } else if (parsed.image) {
                  yield { image: parsed.image }; // Yield image data
                }
              } catch (error) {
                console.error("Error parsing stream:", error);
              }
            }
          }
        },
        contentType: "text/event-stream", // Indicate that this is a text stream
      };
    }
  }

  // Use Axios for non-streaming requests
  const axiosConfig: AxiosRequestConfig = {
    method: endpoint.method,
    url: fullUrl,
    headers: {
      ...endpoint.headers,
      Authorization: endpoint.withAuth ? `Bearer ${storedAccessToken}` : undefined,
      "Accept": "application/json",
    },
    params: params,
  };

  if (endpoint.method !== 'GET') {
    axiosConfig.data = data;
  }

  try {
    const response = await axios(axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Request error:", error);
    throw error;
  }
};


import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();

// Function to get the access token
export const getAccessToken = async (): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Get the Firebase ID token
          const token = await user.getIdToken();
          resolve(token); // Return the token if user is authenticated
        } catch (error) {
          reject({ statusCode: 500, error: "Error getting token" } as ApiError);
        }
      } else {
        reject({ statusCode: 401, error: "User is not authenticated" } as ApiError);
      }
    });
  });
};


export default Request;


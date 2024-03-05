
export const rootUri = import.meta.env.REACT_APP_API_ROOT_URI || 'http://localhost:3030';
const apiVersion = import.meta.env.REACT_APP_API_VERSION || 'v1';
const apiUri = `${rootUri}/api/${apiVersion}`;


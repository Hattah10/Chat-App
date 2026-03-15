import "dotenv/config";

import { createServer } from "./server.js";

const PORT = 3000;

const server = createServer();

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

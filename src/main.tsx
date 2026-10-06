import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// The pre-rendered HTML (for crawlers / first paint) is replaced by the live app.
createRoot(document.getElementById("root")!).render(<App />);

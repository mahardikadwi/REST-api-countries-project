import "./index.css";
import Home from "./component/Home";
import Navbar from "./component/Navbar";
import { CountryProvider } from "./context/CountryContext";

function App() {
  return (
    <div>
      <Navbar />
      <CountryProvider>
        <Home />
      </CountryProvider>
    </div>
  );
}

export default App;

import "antd/dist/antd.css";
import "draft-js/dist/Draft.css";
import { useRoutes } from "react-router-dom";
import { routePathDefinition } from "routes";
import "./App.css";
import format from "dayjs";
function App() {
  const AppRoutes = useRoutes(routePathDefinition);

  return AppRoutes;
}

export default App;

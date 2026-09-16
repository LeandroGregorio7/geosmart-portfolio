import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import { Route, Switch } from "wouter";

export default function App() {
  return <Switch>
    <Route path="/projetos/:slug" component={ProjectDetail} />
    <Route path="/" component={Home} />
  </Switch>;
}

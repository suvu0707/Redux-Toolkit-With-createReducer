import { Button } from "reactofy-component-library";
import Items from "./items";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Items />
      <Button color="red" text={"SUVENDU"}/>
    </div>
  );
}

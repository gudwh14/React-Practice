import logo from './logo.svg';
import './App.css';
import CounterContainer from "./Redux/components/CounterContainer";
import TodosContainer from "./Redux/components/TodosContainer";

function App() {
  return (
    <div>
      <CounterContainer/>
      <br/>
      <TodosContainer/>
    </div>
  );
}

export default App;

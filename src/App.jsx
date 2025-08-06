import { Provider } from "react-redux";
import TodoApp from "./components/TodoApp";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}

export default App;

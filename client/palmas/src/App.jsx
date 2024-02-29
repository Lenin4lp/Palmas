import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className=" flex justify-center items-center">
      <h1 className="text-3xl font-bold underline">Hola</h1>
    </div>
  );
}

export default App;

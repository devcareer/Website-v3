import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import { Scroll } from './components';
function App() {
  return (
    <div>
      <RouterProvider router={router}>
        <Scroll />
      </RouterProvider>
    </div>
  );
}

export default App;

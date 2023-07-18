import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div>
      <ToastContainer/>
      <RouterProvider router={router}>
      </RouterProvider>
    </div>
  );
}

export default App;

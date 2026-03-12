import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

/**
 * The top-level application component now simply wires up routing.
 * Actual route definitions and layout logic live in `AppRoutes`.
 */

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

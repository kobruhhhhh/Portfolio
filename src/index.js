import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './hooks/themeHook/themeContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const Root = () => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<Root />);

reportWebVitals();

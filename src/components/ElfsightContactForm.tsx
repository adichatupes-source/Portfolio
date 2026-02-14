import { useEffect } from 'react';

export function ElfsightContactForm() {
  useEffect(() => {
    // Load the Elfsight script only once
    const scriptId = 'elfsight-platform-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      className="elfsight-app-d90cedef-8fa7-4388-9a93-b22dc6141640"
      data-elfsight-app-lazy
      style={{ minHeight: 400 }}
    />
  );
}

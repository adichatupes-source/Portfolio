import { useEffect } from 'react';

export function ElfsightWhatsappChat() {
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
      className="elfsight-app-7ef81fa3-e6a1-4279-88ab-4aeab37cf2f7"
      data-elfsight-app-lazy
      style={{ minHeight: 100 }}
    />
  );
}

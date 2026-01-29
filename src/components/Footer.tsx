export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 bg-primary text-primary-foreground/60">
      <div className="container-wide mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-serif text-lg text-primary-foreground">
            Aditya Chatterjee
          </div>
          <div className="text-sm">
            © {currentYear} All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * PlaceholderPage.jsx
 * ---------------------------------------------------------------
 * Temporary stand-in so Navbar links resolve to something instead
 * of a blank/404 route. Swap each usage in App.jsx for the real
 * page component as it's built.
 * ---------------------------------------------------------------
 */
export default function PlaceholderPage({ title }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ivory px-6 text-center">
      <span className="font-sans text-xs uppercase tracking-[0.28em] text-stone-gray">
        Coming soon
      </span>
      <h1 className="mt-4 font-serif text-4xl text-charcoal md:text-5xl">{title}</h1>
    </div>
  );
}

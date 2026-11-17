/**
 * Applies the saved colour theme (dark by default) before first paint to avoid a
 * flash of the wrong theme. The script is a static string defined here — it
 * never contains user input, so dangerouslySetInnerHTML is safe.
 * Pattern from the Next.js guide "Preventing flash before hydration".
 */
const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":true;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}

// Base API URL for the app. Vite injects `VITE_API_URL` at build time.
export const API = import.meta.env.VITE_API_URL;

if (!API) {
	// Helpful runtime message in the browser console for production builds
	// when the env var was not set during the Vite build (common cause
	// of 404s where the app requests `/users/register` on the frontend
	// origin). Set `VITE_API_URL` in Vercel and redeploy.
	console.error(
		'VITE_API_URL is not defined. Set VITE_API_URL in Vercel (Settings → Environment Variables) and redeploy the app.'
	);
}

import {
  json,
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { LoaderFunctionArgs, SerializeFrom } from "@remix-run/node";

import { ThemeProvider } from "@/utils/theme-provider";
import { getThemeSession } from "@/utils/theme.server";

import ToggleTheme from "@/components/toggle-theme";

import "./tailwind.css";

export type LoaderData = SerializeFrom<typeof loader>;

export async function loader({ request }: LoaderFunctionArgs) {
  const themeSession = await getThemeSession(request);

  const data = {
    requestInfo: {
      session: {
        theme: themeSession.getTheme(),
      },
    },
  };
  const headers: HeadersInit = new Headers();
  return json(data, { headers });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  let requestInfo = data?.requestInfo;
  let theme = requestInfo?.session.theme;
  return [
    { title: "Ommi Putera" },
    { name: "description", content: "Welcome to ommiputera site" },
    { "theme-color": theme === "dark" ? "#000" : "#FFF" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  let { requestInfo } = useLoaderData<LoaderData>();
  let theme = requestInfo?.session?.theme;
  return (
    <html lang="en" data-color-scheme={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1.0,viewport-fit=cover"
        />
        <Meta />
        <Links />
      </head>
      <body className={`${theme}`}>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  let { requestInfo } = useLoaderData<LoaderData>();
  return (
    <ThemeProvider specifiedTheme={requestInfo?.session.theme}>
      <main>
        <Outlet />
        <div className="fixed bottom-8">
          <ToggleTheme />
        </div>
      </main>
    </ThemeProvider>
  );
}

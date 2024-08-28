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

import { ThemeProvider, useTheme } from "@/utils/theme-provider";
import { getThemeSession } from "@/utils/theme.server";

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
  const requestInfo = data?.requestInfo;

  return [
    { title: "Ommi Putera" },
    { name: "description", content: "Welcome to ommiputera site" },
    {
      viewport:
        "width=device-width,initial-scale=1,maximum-scale=1.0,viewport-fit=cover",
    },
    {
      "theme-color": requestInfo?.session.theme === "dark" ? "#1F2028" : "#FFF",
    },
  ];
};

function App() {
  const [theme] = useTheme();

  return (
    <html lang="en" className={`${theme}`} data-color-scheme={theme}>
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body>
        {theme}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Layout() {
  const { requestInfo } = useLoaderData<LoaderData>();
  return (
    <ThemeProvider specifiedTheme={requestInfo?.session.theme}>
      <App />
    </ThemeProvider>
  );
}

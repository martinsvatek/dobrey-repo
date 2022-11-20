import { Footer, Main, Nav } from 'components';
import { FC } from 'react';
import './global.scss';
import { AppLayoutProps } from './layout.types';

const AppLayout: FC<AppLayoutProps> = ({ children }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="theme-color" content="#cccccc" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/svg+xml" href="/dobrey_logo.svg" />
    </head>
    <body>
      <Nav />
      <Main>{children}</Main>
      <Footer />
    </body>
  </html>
);

export default AppLayout;

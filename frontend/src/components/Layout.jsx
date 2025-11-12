import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function Layout({ children }) {
  return (
    <div className="site-content">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
}

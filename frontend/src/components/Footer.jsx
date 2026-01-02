export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <form className="subscribe-form">
              <input type="text" placeholder="Imgresa tu e-mail para suscribirte..." />
              <input type="submit" value="Enviar" />
            </form>
          </div>
          <div className="col-md-3 col-md-offset-1">
            <div className="social-links">
              <a href="#"><i className="fa fa-facebook"></i></a>
              <a href="#"><i className="fa fa-twitter"></i></a>
              <a href="#"><i className="fa fa-google-plus"></i></a>
              <a href="#"><i className="fa fa-pinterest"></i></a>
            </div>
          </div>
        </div>
        <p className="colophon">
          Copyright 2025 MajosWeather
        </p>
      </div>
    </footer>
  );
}

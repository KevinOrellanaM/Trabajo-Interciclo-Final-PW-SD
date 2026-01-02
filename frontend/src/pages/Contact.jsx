import Map from "../components/Map.jsx";

export default function Contact() {
  return (
    <div className="fullwidth-block">
      <div className="container">
        <div className="col-md-5">
          <div className="contact-details">
            <Map mode = "current"/>
            <div className="contact-info">
              <address>
                <img src="/images/icon-marker.png" alt="" />
                <p>
                  Company Name INC. <br />
                  2803 Avenue Street, Los Angeles
                </p>
              </address>
              <a href="#"><img src="/images/icon-phone.png" alt="" /> +1 800 314 235</a>
              <a href="#"><img src="/images/icon-envelope.png" alt="" /> contact@companyname.com</a>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-md-offset-1">
          <h2 className="section-title">Contáctanos</h2>
          <form className="contact-form">
            <div className="row">
              <div className="col-md-6">
                <input type="text" placeholder="Tú Nombre..." />
              </div>
              <div className="col-md-6">
                <input type="text" placeholder="Correo Electrónico..." />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <input type="text" placeholder="Nombre de la Empresa (Opcional)" />
              </div>
              <div className="col-md-6">
                <input type="text" placeholder="URL (opcional)" />
              </div>
            </div>
            <textarea placeholder="Déjanos un mensaje"></textarea>
            <div className="text-right">
              <input type="submit" value="Enviar Comentarios" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

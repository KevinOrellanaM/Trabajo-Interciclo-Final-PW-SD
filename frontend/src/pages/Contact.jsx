import Map from "../components/Map.jsx";

export default function Contact() {
  return (
    <div className="fullwidth-block">
      <div className="container">
        <div className="col-md-5">
          <div className="contact-details">
            <Map />
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
          <h2 className="section-title">Contact us</h2>
          <form className="contact-form">
            <div className="row">
              <div className="col-md-6">
                <input type="text" placeholder="Your name..." />
              </div>
              <div className="col-md-6">
                <input type="text" placeholder="Email Address..." />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <input type="text" placeholder="Company name..." />
              </div>
              <div className="col-md-6">
                <input type="text" placeholder="Website..." />
              </div>
            </div>
            <textarea placeholder="Message..."></textarea>
            <div className="text-right">
              <input type="submit" value="Send message" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

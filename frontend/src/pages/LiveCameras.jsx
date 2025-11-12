import React from "react";

export default function LiveCameras() {
  const cameras = [
    { id: 1, image: "/images/live-camera-1.jpg", location: "New York", date: "8 oct, 8:00AM" },
    { id: 2, image: "/images/live-camera-2.jpg", location: "Los Angeles", date: "8 oct, 8:00AM" },
    { id: 3, image: "/images/live-camera-3.jpg", location: "Chicago", date: "8 oct, 8:00AM" },
    { id: 4, image: "/images/live-camera-4.jpg", location: "London", date: "8 oct, 8:00AM" },
    { id: 5, image: "/images/live-camera-5.jpg", location: "New York", date: "8 oct, 8:00AM" },
    { id: 6, image: "/images/live-camera-6.jpg", location: "Los Angeles", date: "8 oct, 8:00AM" },
    { id: 7, image: "/images/live-camera-7.jpg", location: "Chicago", date: "8 oct, 8:00AM" },
    { id: 8, image: "/images/live-camera-8.jpg", location: "London", date: "8 oct, 8:00AM" },
  ];

  return (
    <div className="site-content">

      <main className="main-content">
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Home</a>
            <span>Live cameras</span>
          </div>
        </div>

        <div className="fullwidth-block">
          <div className="container">
            {/* Filtros superiores */}
            <div className="filter">
              <div className="country filter-control">
                <label>Country</label>
                <span className="select control">
                  <select>
                    <option value="">All Countries</option>
                  </select>
                </span>
              </div>

              <div className="count filter-control">
                <label>Show per page</label>
                <span className="select control">
                  <select>
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </span>
              </div>

              <div className="quality filter-control">
                <label>Only high quality</label>
                <span className="select control">
                  <select>
                    <option value="">Yes</option>
                    <option value="">No</option>
                  </select>
                </span>
              </div>
            </div>

            {/* Cámaras */}
            <div className="row">
              {cameras.map((cam) => (
                <div className="col-md-3 col-sm-6" key={cam.id}>
                  <div className="live-camera">
                    <figure className="live-camera-cover">
                      <img src={cam.image} alt={cam.location} />
                    </figure>
                    <h3 className="location">{cam.location}</h3>
                    <small className="date">{cam.date}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}

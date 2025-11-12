import React from "react";

export default function Photos() {
  const photosLeft = [
    "photo-1.jpg",
    "photo-2.jpg",
    "photo-3.jpg",
    "photo-4.jpg",
    "photo-5.jpg",
  ];

  const photosRight = [
    "photo-6.jpg",
    "photo-7.jpg",
    "photo-8.jpg",
    "photo-9.jpg",
    "photo-10.jpg",
  ];

  const renderPhoto = (image) => (
    <div className="photo" key={image}>
      <div
        className="photo-preview photo-detail"
        style={{
          backgroundImage: `url(/images/${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="photo-details">
        <h3 className="photo-title">
          <a href="#">Neque porro quisquam</a>
        </h3>
        <p>
          Atatem accusantium aperiam eaque quae quasi architecto beatae vitae
          dicta sunt explicabo nemo enim.
        </p>
        <div className="star-rating" title="Rated 1 out of 5">
          <span style={{ width: "60%" }}>
            <strong className="rating">1</strong> out of 5
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="site-content">

      <main className="main-content">
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Home</a>
            <span>Photos</span>
          </div>
        </div>

        <div className="fullwidth-block">
          <div className="container">
            <div className="row">
              <div className="col-md-6">{photosLeft.map(renderPhoto)}</div>
              <div className="col-md-6">{photosRight.map(renderPhoto)}</div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}

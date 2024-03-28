import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../contexts/ApiContext";
import Nav from "../nav";

const Home = () => {
  const { apiCall, token, paints, setPaints } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiCall.getPaints();
        setPaints(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [token, navigate, setPaints]);

  if (!token) {
    return navigate("/login");
  } else {
    return (
      <>
        <div className="w-100 bg-dark py-2">
          <h3 className="text-center text-white mb-0">Home</h3>
        </div>
        <div className="row bg-light mr-lg-1 vh-100 mx-xs-1 mx-sm-1 pt-3">
          {paints && (
            <>
              <PaintGroup
                title="Available"
                paints={paints.categorizedPaints.a}
              />
              <PaintGroup
                title="Running Low"
                paints={paints.categorizedPaints.b}
              />
              <PaintGroup
                title="Out of Stock"
                paints={paints.categorizedPaints.c}
              />
            </>
          )}
          <div className="col-md-3 px-1">
            <p className="text-center">In Order</p>
            <div className="card mb-1">
              <div className="card-header" style={{ background: "#D3D3D3" }}>
                <h5
                  className="card-title mb-0"
                >
                  Purple@@
                </h5>
              </div>
              <div className="card-body" style={{ background: "#E5E4E2" }}>
                <p className="card-text">5@@ available</p>
              </div>
              <div className="card-header" style={{ background: "#D3D3D3" }}>
                <h5
                  className="card-title mb-0"
                >
                  Purple@@
                </h5>
              </div>
              <div className="card-body" style={{ background: "#E5E4E2" }}>
                <p className="card-text">5@@ available</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

const PaintGroup = ({ title, paints }) => (
  <div className="col-md-3 border-right px-1">
    <p className="text-center">{title}</p>
    {paints &&
      paints.map((paint) => (
        <div key={paint.id} className="card mb-1">
          <div className="card-header" style={{ background: "#D3D3D3" }}>
            <h5
              className="card-title mb-0"
              style={{ color: paint.paint_colour }}
            >
              {paint.paint_colour}
            </h5>
          </div>
          <div className="card-body" style={{ background: "#E5E4E2" }}>
            <p className="card-text">{`${paint.paint_quantity} remains`}</p>
          </div>
        </div>
      ))}
  </div>
);

export default Home;

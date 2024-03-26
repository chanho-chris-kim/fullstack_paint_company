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
        <div className="w-100 bg-dark">
          <h2 className="text-center text-white">Home</h2>
        </div>
        <div className="row bg-light pl-2 pr-2 ml-lg-1 mr-lg-1">
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
          <div className="col-md-3 pl-lg-0">
            <p className="text-center">In Order</p>
            <div className="card mb-1 bg-secondary">
              <div className="card-body text-white">
                <h5 className="card-title">Purple@@</h5>
                <p className="card-text">5@@ available</p>
              </div>
            </div>
            <div className="card mb-1 bg-secondary">
              <div className="card-body text-white">
                <h5 className="card-title">Purple@@</h5>
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
  <div className="col-md-3 pl-lg-0">
    <p className="text-center">{title}</p>
    {paints &&
      paints.map((paint) => (
        <div key={paint.id} className="card mb-1 bg-secondary">
          <div className="card-body text-white">
            <h5 className="card-title">{paint.paint_colour}</h5>
            <p className="card-text">{`${paint.paint_quantity} remains`}</p>
          </div>
        </div>
      ))}
  </div>
);

export default Home;

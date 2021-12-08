import React, { useContext, useState } from "react";
import { Alert } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { AuctionCard } from "./AuctionCard";
import { ProgressBar } from "./ProgressBar";
import { useFirestore } from "../../hooks/useFirestore";

export const AuctionBody = () => {
  const [auction, setAuction] = useState(null);
  const { currentUser, globalMsg } = useContext(AuthContext);
  const { docs } = useFirestore("orders");

  const [bool, setBool] = useState(false);

  let entregas = docs
    .filter((el) => el.deliver === 'quiroga@gmail.com')
    .filter((el) => el.noDeliver === true)
    .filter((el) => el.sucursal === "quiroga");
    
  let pedidos = docs
    .filter((el) => !el.entregado)
    .filter((el) => el.noDeliver === true)
    .filter((el) => el.sucursal === "quiroga");

  return (
    <div className="border-transparent">
      {auction && <ProgressBar auction={auction} setAuction={setAuction} />}

      <div
        style={{ zIndex: "9999999" }}
        className="text-center w-50 position-fixed top-10 start-50 translate-middle"
      >
        {globalMsg && <Alert variant="danger">{globalMsg}</Alert>}
      </div>

      <div className="text-center mt-3 container">
        <button
          className={
            bool
              ? "w-25 mx-3 btn btn-lg btn-success"
              : "w-25 mx-3 btn btn-lg btn-light"
          }
          onClick={(e) => setBool(true)}
        >
          Entregas
        </button>

        <button
          className={
            bool
              ? "w-25 mx-3 btn-lg btn btn-light"
              : "w-25 mx-3 btn btn-lg btn-success"
          }
          onClick={(e) => setBool(false)}
        >
          Compras
        </button>
      </div>

      {bool ? (
        <div className="container">
          <div className="row mt-4">
            {entregas.map((doc, i) => {
              return <AuctionCard orden={doc} key={i} />;
            })}
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="row mt-4">
            {pedidos.map((doc, i) => {
              return <AuctionCard orden={doc} key={i} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

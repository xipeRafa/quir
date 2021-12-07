import React, { useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useFirestore } from "../../hooks/useFirestore";
import { useItems } from "../../hooks/useItems";

export const AuctionCard = ({ orden }) => {

   const { currentUser, bidAuction} = useContext(AuthContext); 

  const { docs } = useFirestore("orders");
  const { items } = useItems("items");
  console.log('docs:', docs)
   console.log('items:', items) 

   let entregado = orden.entregado ? 'Entregado' : 'Marcar como Entregado'

  let img
  /* const hora = orden.date.toDate().toLocaleTimeString() */ /* hora, min, sec */

  const fullDate = orden.date.toDate().toLocaleDateString("es-CL", {
      weekday: "long", // narrow, short
      year: "numeric", // 2-digit
      month: "short", // numeric, 2-digit, narrow, long
      day: "numeric" // 2-digit
 });

    return (
            
<>
         
          {currentUser && (
               <div className="pl-5 col-sm-4 border-end border-info my-3 p-4 bg-white">
                    <button onClick={() => bidAuction(orden.id, currentUser.email)}
                         className={orden.entregado ? 'mb-3 btn btn-info w-100' : 'mb-3 btn btn-info w-100'}>
                                  {entregado}
                    </button>

                    <h6>Id-Orden: <span className="text-muted">{orden.id}</span>  </h6>

                    <p> <span className='text-muted'>comprador:</span> {orden.buyer.name} </p>
                    <p><span className='text-muted'>correo:</span>  {orden.buyer.email} </p>
                    {/* <p><span className='text-muted'>telefono:</span> {orden.buyer.phone} </p> */}
                    <p><span className='text-muted'>fecha:</span>  {fullDate}</p>
                   {/*  <p><span className='text-muted'>direccion:</span>  {orden.buyer.adress}</p> */}
                    <br/>

                    {orden.items.map((el, i) => (
                        <div key={i}>
                    <h6>Id-producto: <span className="text-muted">{el.id}</span> </h6>
                         <p><span className='text-muted'>producto:</span>  {el.item}</p>
                         <p><span className='text-muted'>precio:</span>  {el.price}</p>
                         <p><span className='text-muted'>cantidad:</span>  {el.qty}</p>
                        {
                            items.map(item => (
                                 console.log(item.id === el.id ? img = item.pictureUrl[0] : null)
                            ))
                       }  
                        <img className="col-3 mb-1 i-img" src={img} alt="" /> 
                         </div>
                    ))}
                     <br/>
                    <p className="border text-center">
                      Precio: $ 
                      <span className="text-white bg-dark fs-4 py-1 px-2 ">{orden.total}</span>
                    </p>

                    </div>
          )}
       </>  
    );
  };


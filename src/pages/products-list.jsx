import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getAllProductsAPI, removeProductAPI } from "services/api";
import { RemoveModal } from "../components/productlist/RemoveModal";

// const ProductsList = () => {
//   // const [isOpen, setIsOpen] = useState(false);
//   const [whatShouldDelete, setWhatShouldDelete] = useState(undefined);
//   const [products, setProducts] = useState([]);

//   const onShowModal = (product) => {
//     setWhatShouldDelete(product);
//   };

//   const getProducts = () => {
//     axios
//       .get("http://localhost:8000/products")
//       .then((response) => {
//         console.log(response.data);
//         setProducts(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   useEffect(() => {
//     getProducts();
//   }, []);

//   const onConfirm = (test) => {
//     console.log(test);
//     const id = whatShouldDelete.id;
//     axios
//       .delete(`http://localhost:8000/products/${id}/`)
//       .then((response) => {
//         setWhatShouldDelete(undefined);
//         getProducts();
//       })
//       .catch((error) => {});
//   };

//   return (
//     <>
//       <div className="container">
//         <div className="card">
//           <div className="card-body">
//             {/* YOUR CODE HERE */}
//             {products.length === 0 && <p>"محصولی یافت نشد!"</p>}
//             {products.length > 0 && (
//               <table className="table table-sm table-striped align-middle">
//                 <thead>
//                   <tr>
//                     <th scope="col">نام محصول</th>
//                     <th scope="col">قیمت</th>
//                     <th scope="col">دسته‌بندی</th>
//                     <th scope="col">موجودی</th>
//                     <th scope="col" />
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {products.map((product) => (
//                     <tr key={product.name}>
//                       <td>{product.name}</td>
//                       <td>{product.price}</td>
//                       <td>{product.category}</td>
//                       <td>{product.availability}</td>
//                       <td>
//                         <div className="btn-group" role="group">
//                           <button
//                             id={product.id}
//                             type="button"
//                             className="btn btn-sm btn-outline-danger"
//                             onClick={() => {
//                               onShowModal(product);
//                             }}
//                           >
//                             حذف
//                           </button>
//                           {Boolean(whatShouldDelete) ? (
//                             <RemoveModal
//                               // isOpen={Boolean(whatShouldDelete)}
//                               product={whatShouldDelete}
//                               onClose={() => setWhatShouldDelete(undefined)}
//                               onConfirm={onConfirm}
//                             />
//                           ) : null}

//                           <button
//                             type="button"
//                             className="btn btn-sm btn-outline-info"
//                           >
//                             <Link to={`/products/edit/${product.id}`}>
//                               ویرایش
//                             </Link>
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductsList;

const ProductsList = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const onModalConfirm = (product) => {
    removeProductAPI(product.id).then(() => {
      setSelectedProduct(null);
      getAllProductsAPI().then((res) => setProducts(res.data));
    });
  };

  useEffect(() => {
    getAllProductsAPI().then((res) => setProducts(res.data));
  }, []);

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-body">
            {products.length === 0 && <p>محصولی یافت نشد!</p>}
            {products.length > 0 && (
              <table className="table table-sm table-striped align-middle">
                <thead>
                  <tr>
                    <th scope="col">نام محصول</th>
                    <th scope="col">قیمت</th>
                    <th scope="col">دسته‌بندی</th>
                    <th scope="col">موجودی</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.name}>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.availability}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => setSelectedProduct(product)}
                          >
                            حذف
                          </button>
                          <Link
                            to={`/products/edit/${product.id}`}
                            type="button"
                            className="btn btn-sm btn-outline-info"
                          >
                            ویرایش
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      {selectedProduct && (
        <RemoveModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onConfirm={() => onModalConfirm(selectedProduct)}
        />
      )}
    </>
  );
};

export default ProductsList;

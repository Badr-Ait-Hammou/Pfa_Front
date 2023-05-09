
import axios from "axios";
import React,{useState,useEffect} from "react";
import Modal from "react-modal";
import 'bootstrap/dist/css/bootstrap.css';
import ReactPaginate from 'react-paginate';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {IconButton} from "@mui/material";
import moment from "moment";


export default function ProduitTable() {
    const [produits, setproduits] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [produitnom, setProduitNom] = useState('');
    const [produitdescription, setProduitDescription] = useState('');
    const [produitphoto, setProduitPhoto] = useState('');
    const [produitstock, setProduitStock] = useState('');
    const [produitpromotion, setProduitPromotion] = useState('');
    const [produitPrix, setProduitPrix] = useState('');
    const [produitRestaurant, setProduitRestaurant] = useState('');
    const [selectedProduit, setSelectedProduit] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 4;
    const offset = pageNumber * itemsPerPage;
    const currentPageItems = produits.slice(offset, offset + itemsPerPage);

useEffect(() => {
        axios.get("http://localhost:8080/api/produits/").then((response) => {
            setproduits(response.data);
        });
    }, []);

    useEffect(() => {
        const fetchproduits = async () => {
            const result = await axios(`http://localhost:8080/api/produits/`);
            setproduits(result.data);
        };
        fetchproduits();
    }, []);

const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this Produit?")) {
            axios.delete(`http://localhost:8080/api/produits/${id}`).then(() => {
                setproduits(produits.filter((produit) => produit.id !== id));
            });
        }
    };



const handleOpenModal = (produit) => {
        setSelectedProduit(produit);
        setProduitNom(produit.nom);
        setProduitDescription(produit.description);
        setProduitPhoto(produit.photo);
        setProduitStock(produit.stock);
        setProduitPromotion(produit.promotion);
        setProduitPrix(produit.prix);
        setProduitRestaurant(produit.restaurant.id);
        setModalIsOpen(true);
         
    };
const handleCloseModal = () => {
        setModalIsOpen(false)
    };


 const handleEditProduit = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/produits/${id}`, {
                nom:produitnom,
                description:produitdescription,
                photo:produitphoto,
                stock:produitstock,
                promotion:produitpromotion,
                prix:produitPrix,
                restaurant: {
                    id: produitRestaurant
                }

            })
const updatedProduit = produits.map((produit) => {
                if (produit.id === id) {
                    return response.data;
                }else{
                    return produit;
                }
            });
            setproduits(updatedProduit);
            setModalIsOpen(false);
            loadProduits();
        } catch (error) {
            console.error(error);
        }
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setProduitPhoto(e.target.result);
        };
        reader.readAsDataURL(file);
    };
    const loadProduits=async ()=>{
        const res=await axios.get(`http://localhost:8080/api/produits/`);
        setproduits(res.data);
    }
return (
        <div >
            <div className="table-responsive  ">
                <table className="table mt-5 text-center">
                    <thead className="bg-dark text-white">
                    <tr>
                        <th>ID</th>
                        <th>Photos</th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Stock</th>
                        <th>Promotion</th>
                        <th>Prix</th>
                        <th>Restaurant</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentPageItems.map((produit) => (
                        <tr key={produit.id}>
                            <td style={{ padding:"10px" }}>{produit.id}</td>
                            <td style={{ maxWidth: "80px" }}>
                                <img src={produit.photo} alt="Produit" style={{ maxWidth: "70%" ,borderRadius:"10px"}} />
                            </td>
                             
                            <td style={{ padding:"10px" }}>{produit.nom}</td>
                            <td style={{ padding:"10px" }}>{produit.description}</td>
                            <td style={{ padding:"10px" }}>{produit.stock}</td>
                            <td style={{ padding: "10px", maxWidth: "100px", overflowX: "scroll",  whiteSpace: "nowrap" }}>
                                {produit.promotion}
                            </td>
                            <td style={{ padding:"10px" }}>{produit.prix}</td>
                            <td style={{ padding:"10px" }}>{produit.restaurant && produit.restaurant.nom}</td>
                            <td>
                                <IconButton
                                    style={{color:"red"}}
                                    aria-label="delete"
                                    onClick={() => handleDelete(produit.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton
                                    style={{color:"teal"}}
                                    aria-label="edit"

                                    onClick={() => handleOpenModal(produit)}
                                >
                                    <EditIcon />
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="pagination-container">
                    <ReactPaginate
                        previousLabel={<button className="pagination-button">&lt;</button>}
                        nextLabel={<button className="pagination-button">&gt;</button>}
                        pageCount={Math.ceil(restaurants.length / itemsPerPage)}
                        onPageChange={({ selected }) => setPageNumber(selected)}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"}
                    />
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 999
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#fff',
                        borderRadius: '10px',
                        boxShadow: '20px 30px 25px rgba(0, 0, 0, 0.2)',
                        padding: '20px',
                        width: '100%',
                        maxWidth: '700px',
                        height: 'auto',
                        maxHeight: '90%',
                        overflow: 'auto'
                    }
                }}
            >
            <div>
                <div className="card-body" >
                        <h5 className="card-title" id="modal-modal-title">Update Produit</h5>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="produit-nom" className="form-label">Nom:</label>
                                <input type="text" className="form-control" id="user-nom" value={produitnom} onChange={(e) => setProduitNom(e.target.value)} required/>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="produit-description" className="form-label">Description:</label>
                                    <input type="text" className="form-control" id="user-prenom" value={produitdescription} onChange={(e) => setProduitDescription(e.target.value)} required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="restaurant-adresse" className="form-label">Photo:</label>
                                    <input type="file" className="form-control" id="user-password"  onChange={handlePhotoChange} />
                                </div>
                                
                                

                             <div className="mb-3">
                                <label htmlFor="produit-stock" className="form-label">Stock:</label>
                                <input type="text" className="form-control" id="user-password" value={produitstock} onChange={(e) => setProduitStock(e.target.value)} />
                            </div>
           
                            <div className="mb-3">
                                <label htmlFor="produit-promotion" className="form-label">Promotion:</label>
                                <input type="text" className="form-control" id="user-password" value={produitpromotion} onChange={(e) => setProduitPromotion(e.target.value)} />
                            </div>

                           
                            
                            <div className="mb-3">
                                <label htmlFor="produit-prix" className="form-label">Prix:</label>
                                <input type="text" className="form-control" id="user-password" value={produitPrix} onChange={(e) => setProduitPrix(e.target.value)} />
                            </div> 
                             
                                 
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="produit-restaurant" className="form-label">Restaurant:</label>
                                    <select
                                        value={produitRestaurant}
                                        onChange={(e) => setProduitRestaurant(e.target.value)}
                                        style={{
                                            backgroundColor: "#f2f2f2",
                                            border: "none",
                                            borderRadius: "4px",
                                            color: "#555",
                                            fontSize: "16px",
                                            padding: "8px 12px",
                                            width: "100%",
                                            marginBottom: "12px"
                                        }}
                                    >  <option value="">Select a restaurant </option>

                                        {restaurants.map((restaurant) => (
                                            <option key={restaurant.id} value={restaurant.id}>
                                                {restaurant.nom}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                </div>
                                </div>
                        </form>
                                <div className="d-flex justify-content-center mt-3">
                                    <button type="button" className="btn btn-secondary me-2" onClick={handleCloseModal}>Annuler</button>
                                    <button type="button" className="btn btn-primary" onClick={() => handleEditProduit(selectedProduit.id)}>Sauvegarder</button>
                                </div>
                    </div>
                </div>
            </Modal>
                </div>
                
    );

}
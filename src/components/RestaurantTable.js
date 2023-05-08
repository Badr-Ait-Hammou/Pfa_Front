
import axios from "axios";
import React,{useState,useEffect} from "react";
import Modal from "react-modal";
import 'bootstrap/dist/css/bootstrap.css';
import ReactPaginate from 'react-paginate';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {IconButton} from "@mui/material";
import moment from "moment";







export default function RestaurantTable() {
    const [restaurants, setrestaurants] = useState([]);
    const [users, setUsers] = useState([]);
    const [zones, setZones] = useState([]);
    const [series, setSeries] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [restaurantnom, setRestaurantNom] = useState('');
    const [restaurantlatitude, setRestaurantLatitude] = useState('');
    const [restaurantlongitude, setRestaurantLongitude] = useState('');
    const [restaurantdateopen, setRestaurantDateopen] = useState('');
    const [restaurantdateclose, setRestaurantDateclose] = useState('');
    const [restaurantAdresse, setRestaurantAdresse] = useState('');
    const [restaurantPhoto, setRestaurantPhoto] = useState('');
    const [restaurantUser, setRestaurantUser] = useState('');
    const [restaurantSerie, setRestaurantSerie] = useState('');
    const [restaurantZone, setRestaurantZone] = useState('');
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 4;
    const offset = pageNumber * itemsPerPage;
    const currentPageItems = restaurants.slice(offset, offset + itemsPerPage);





    useEffect(() => {
        axios.get("http://localhost:8080/api/restaurants/").then((response) => {
            setrestaurants(response.data);
        });
    }, []);

    useEffect(() => {
        const fetchusers = async () => {
            const result = await axios(`http://localhost:8080/api/users/`);
            setUsers(result.data);
        };
        fetchusers();
    }, []);

    useEffect(() => {
        const fetchzones = async () => {
            const result = await axios(`http://localhost:8080/api/zones/`);
            setZones(result.data);
        };
        fetchzones();
    }, []);
    
    useEffect(() => {
        const fetchseries = async () => {
            const result = await axios(`http://localhost:8080/api/series/`);
            setSeries(result.data);
        };
        fetchseries();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this User?")) {
            axios.delete(`http://localhost:8080/api/restaurants/${id}`).then(() => {
                setrestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
            });
        }
    };

    const handleOpenModal = (restaurant) => {
        setSelectedRestaurant(restaurant);
        setRestaurantNom(restaurant.nom);
        setRestaurantLatitude(restaurant.latitude);
        setRestaurantLongitude(restaurant.longitude);
        setRestaurantDateopen(restaurant.dateOuverture);
        setRestaurantDateclose(restaurant.dateFermeture);
        setRestaurantAdresse(restaurant.adresse);
        setRestaurantPhoto(restaurant.photo);
        setRestaurantUser(restaurant.user.id);
        setRestaurantSerie(restaurant.serie.id);
        setRestaurantZone(restaurant.zone.id);
        setModalIsOpen(true);
        //setSelectedRestaurant(restaurant);
        // setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false)
    };

    const handleEditRestaurant = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/restaurants/${id}`, {
                nom:restaurantnom,
                longitude:restaurantlongitude,
                latitude:restaurantlatitude,
                adresse:restaurantAdresse,
                dateOuverture:restaurantdateopen,
                dateFermeture:restaurantdateclose,
                photo:restaurantPhoto,
                user: {
                    id: restaurantUser
                },
                zone: {
                    id: restaurantZone
                },
                serie: {
                    id: restaurantSerie
                }

            })
            const updatedRestaurant = restaurants.map((restaurant) => {
                if (restaurant.id === id) {
                    return response.data;
                }else{
                    return restaurant;
                }
            });
            setrestaurants(updatedRestaurant);
            setModalIsOpen(false);
            loadRestaurants();
        } catch (error) {
            console.error(error);
        }
    };


    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setRestaurantPhoto(e.target.result);
        };
        reader.readAsDataURL(file);
    };
    const loadRestaurants=async ()=>{
        const res=await axios.get(`http://localhost:8080/api/restaurants/`);
        setrestaurants(res.data);
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
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Adresse</th>
                        <th>dateouverture</th>
                        <th>datefermeture</th>
                        <th>serie</th>
                        <th>Zone</th>
                        <th>User</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentPageItems.map((restaurant) => (
                        <tr key={restaurant.id}>
                            <td style={{ padding:"10px" }}>{restaurant.id}</td>
                            <td style={{ maxWidth: "80px" }}>
                                <img src={restaurant.photo} alt="Restaurant" style={{ maxWidth: "70%" ,borderRadius:"10px"}} />
                            </td>
                            <td style={{ padding:"10px" }}>{restaurant.nom}</td>
                            <td style={{ padding:"10px" }}>{restaurant.latitude}</td>
                            <td style={{ padding:"10px" }}>{restaurant.longitude}</td>
                            <td style={{ padding: "10px", maxWidth: "100px", overflowX: "scroll",  whiteSpace: "nowrap" }}>
                                {restaurant.adresse}
                            </td>
                            <td style={{ padding:"10px" }}>
                                {moment(restaurant.dateOuverture).format("YYYY-MM-DD HH:mm")}
                            </td>
                            <td style={{ padding:"10px" }}>
                                {moment(restaurant.dateFermeture).format("YYYY-MM-DD HH:mm")}
                            </td>
                            <td style={{ padding:"10px" }}>{restaurant.serie && restaurant.serie.nom}</td>
                            <td style={{ padding:"10px" }}>{restaurant.zone && restaurant.zone.nom}</td>
                            <td style={{ padding:"10px" }}>{restaurant.user && restaurant.user.nom}</td>
                            <td>
                                <IconButton
                                    style={{color:"red"}}
                                    aria-label="delete"
                                    onClick={() => handleDelete(restaurant.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton
                                    style={{color:"teal"}}
                                    aria-label="edit"

                                    onClick={() => handleOpenModal(restaurant)}
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
                <div className="card" >
                    <div className="card-body" >
                        <h5 className="card-title" id="modal-modal-title">Update Restaurant</h5>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="restaurant-nom" className="form-label">Nom:</label>
                                <input type="text" className="form-control" id="user-nom" value={restaurantnom} onChange={(e) => setRestaurantNom(e.target.value)} required/>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="restaurant-latitude" className="form-label">Latitude:</label>
                                    <input type="text" className="form-control" id="user-prenom" value={restaurantlatitude} onChange={(e) => setRestaurantLatitude(e.target.value)} required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="restaurant-longitude" className="form-label">Longitude:</label>
                                    <input type="text" className="form-control" id="user-email" value={restaurantlongitude} onChange={(e) => setRestaurantLongitude(e.target.value)} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="restaurant-adresse" className="form-label">Adresse:</label>
                                <input type="text" className="form-control" id="user-password" value={restaurantAdresse} onChange={(e) => setRestaurantAdresse(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="restaurant-dateopen" className="form-label">date open:</label>
                                <input type="datetime-local" className="form-control" id="user-password" value={restaurantdateopen} onChange={(e) => setRestaurantDateopen(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="restaurant-dateclose" className="form-label">date close:</label>
                                <input type="datetime-local" className="form-control" id="user-password" value={restaurantdateclose} onChange={(e) => setRestaurantDateclose(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="restaurant-adresse" className="form-label">Photo:</label>
                                <input type="file" className="form-control" id="user-password"  onChange={handlePhotoChange} />
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="restaurant-adresse" className="form-label">Zone:</label>
                                    <select
                                        value={restaurantZone}
                                        onChange={(e) => setRestaurantZone(e.target.value)}
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
                                    >  <option value="">Select a zone </option>

                                        {zones.map((zone) => (
                                            <option key={zone.id} value={zone.id}>
                                                {zone.nom}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="restaurant-serie" className="form-label">serie:</label>
                                    <select
                                        value={restaurantSerie}
                                        onChange={(e) => setRestaurantSerie(e.target.value)}
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
                                    >  <option value="">Select a serie </option>

                                        {series.map((serie) => (
                                            <option key={serie.id} value={serie.id}>
                                                {serie.nom}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="restaurant-adresse" className="form-label">Adresse:</label>
                                    <select
                                        value={restaurantUser}
                                        onChange={(e) => setRestaurantUser(e.target.value)}
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
                                    >
                                        <option value="">Select a user </option>

                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.nom}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </form>
                        <div className="d-flex justify-content-center mt-3">
                            <button type="button" className="btn btn-secondary me-2" onClick={handleCloseModal}>Annuler</button>
                            <button type="button" className="btn btn-primary" onClick={() => handleEditRestaurant(selectedRestaurant.id)}>Sauvegarder</button>
                        </div>
                    </div>
                </div>
            </Modal>

        </div>


    );

}



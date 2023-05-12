import React,{useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@mui/material/Button';
import axios from '../service/callerService';
import Modal from "react-modal";




export default function SerieTable(){
    const [series, setSeries] = useState([]);
    const [serieNom, setSerieNom] = useState('');
    const [selectedSerie, setSelectedSerie] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);




    useEffect(() => {
        const getserie = async () => {
            const res = await axios.get('/api/controller/series/');
            const getdata = res.data;
            setSeries(getdata);
            loadSeries();
        }
        getserie();
    }, []);



    const loadSeries=async ()=>{
        const res=await axios.get("/api/controller/series/");
        setSeries(res.data);
    }

    const handleDelete = (serieid) => {
        if (window.confirm("Are you sure you want to delete this Item?")) {
            axios.delete(`/api/controller/series/${serieid}`).then(() => {
                setSeries(series.filter((serie) => serie.id !== serieid));
            });
        }
    };


    const handleOpenModal = (serie) => {
        setSelectedSerie(serie);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false)
    };



    const handleEditVille = async (id) => {
        try {
            const response = await axios.put(`/api/controller/series/${id}`, {
                nom: serieNom,

            })
            const updatedSeries = series.map((serie) => {
                if (serie.id === id) {
                    return response.data;
                }else{
                    return serie;
                }
            });
            setSeries(updatedSeries);
            setModalIsOpen(false);
            loadSeries();
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div>
            <div className="table-responsive">
                <table className="table mt-5 text-center">
                    <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">serie</th>
                        <th scope="col">Actions</th>

                    </tr>
                    </thead>
                    <tbody>
                    {series.map((serie,index)=>(
                        <tr key={index}>
                            <th scope="row">{serie.id}</th>
                            <td>{serie.nom}</td>
                            <td>

                                <Button variant="contained" color="info" onClick={() => handleOpenModal(serie)} >edit</Button>

                                <Button variant="contained" color="warning" sx={{ ml:2 }}onClick={() => handleDelete(serie.id)}>delete</Button>

                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1000
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
                        width:'350px',
                        height:'300px'
                    }
                }}
            >
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title" id="modal-modal-title">Update Serie</h5>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="user-nom" className="form-label">Serie:</label>
                                <input type="text" className="form-control" id="user-nom" value={serieNom} onChange={(e) => setSerieNom(e.target.value)} />
                            </div>

                        </form>
                        <div className="d-flex justify-content-center mt-3">
                            <Button variant="contained" color="error" onClick={handleCloseModal}>
                                Annuler
                            </Button>
                            <Button variant="contained" color="success" sx={{ ml:1 }} onClick={() => handleEditVille(selectedSerie.id)}>
                                Sauvegarder
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );


}

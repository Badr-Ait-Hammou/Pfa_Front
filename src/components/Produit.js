
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from "axios";
import React,{useState,useEffect,useReducer} from "react";
import ProduitTable from "../components/ProduitTable";
import { Card, CardContent } from '@mui/material';



export default function Produit() {
    const [Restaurants, setRestaurants] = useState([]);
    const [restaurantid, setRestaurantid] = useState("");
    const [nom, setNom] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhotos] = useState("");
    const [stock, setStock] = useState("");
    const [promotion, setpromotion] = useState("");
    const [prix, setprix] = useState("");
    const [upTB, forceUpdate] = useReducer((x) => x + 1, 0);
    const [tableKey, setTableKey] = useState(Date.now());




    useEffect(() => {
        axios.get("http://localhost:8080/api/Restaurants/").then((response) => {
            setRestaurants(response.data);
        });
    }, [upTB]);


    const handleSubmit = (event) => {
        console.log("jsjkjksjkjkqsdjks",photo);

        event.preventDefault();
        axios.post("http://localhost:8080/api/produits/save", {
            nom,
            description,
            photo,
            stock,
            promotion,
            prix,
            restaurant: {
                id: restaurantid
            },
        }).then((response) => {
            setNom("");
            setDescription("");
            setPhotos("");
            setStock("");
            setpromotion("");
            setprix("");
            setRestaurantid("");
            forceUpdate();
            setTableKey(Date.now());

        });
    };


    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setPhotos(e.target.result);
        };
        reader.readAsDataURL(file);
    };


    return (

        <Container component="main" maxWidth="lg">
            <Card sx={{ marginTop: 3 }} >
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Box
                            sx={{
                                marginTop: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >

                            <Typography component="h1" variant="h5">
                                Produit
                            </Typography>
                            <Box   sx={{ mt: 3 }}>
                                <Grid container spacing={2}>

                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            required
                                            fullWidth

                                            label="produit"

                                            autoComplete="produit"
                                            id="nom"
                                            value={nom}
                                            onChange={(event) => setNom(event.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            required
                                            fullWidth

                                            label="description"

                                            autoComplete="description"
                                            id="description"
                                            value={description}
                                            onChange={(event) => setDescription(event.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="file" accept="image/*" onChange={handlePhotoChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            required
                                            fullWidth

                                            label="stock"

                                            autoComplete="stock"
                                            id="stock"
                                            value={stock}
                                            onChange={(event) => setStock(event.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            required
                                            fullWidth

                                            label="promotion"

                                            autoComplete="promotion"
                                            id="promotion"
                                            value={promotion}
                                            onChange={(event) => setpromotion(event.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            required
                                            fullWidth

                                            label="prix"

                                            autoComplete="prix"
                                            id="prix"
                                            value={prix}
                                            onChange={(event) => setprix(event.target.value)}
                                        />
                                    </Grid>
                                     

                                    
                                   

                                    <Grid item xs={12} sm={4} >


                                    <select
                                            className="form-control"
                                            id="cityId"
                                            value={restaurantid}
                                            onChange={(event) => setRestaurantid(event.target.value)}
                                        >
                                            <option value="">Select a restaurant </option>
                                            {Restaurants && Restaurants.map((restaurant) => (
                                                <option key={restaurant.id} value={restaurant.id}>
                                                    {restaurant.nom}
                                                </option>
                                            ))}
                                        </select>
                                    </Grid>

                                     
 

                                </Grid>
                                <Button
                                    type="submit"

                                    sx={{ mt: 3, mb: 2 }}
                                    variant="contained"
                                >
                                    add
                                </Button>


                            </Box>
                        </Box>
                    </form>
                </CardContent>
            </Card>
            <Card sx={{ marginTop: 5 }}>
                <CardContent>
                    <ProduitTable key={tableKey} />
                </CardContent>
            </Card>
        </Container>


    );
}
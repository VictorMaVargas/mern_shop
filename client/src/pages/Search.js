import {useState, useEffect} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import './Search.css';


const Search = () => {
    const [data, setData] = useState([]); //Datos de artículos del backend
    const [inputText, setInputText] = useState ('') //Input text del text field
    const [performSearch, setPerformSearch] = useState(false) // Click en el botón Buscar
    const [orderLogic, setOrderLogic] = useState(false) // Click en alguno de los botones de ordenación
    const [openModal, setOpenModal] = useState(false); // Para abrir o cerrar el modal
    const [modalData, setModalData] = useState({}); // Para pasarle info sobre que elemento hemos hecho click
    const [providerData, setProviderData] = useState({});
    const history = useHistory(); // History para hacer push de las rutas y obtener el query params

    const getModalStyle = () => {
        const top = 50; 
        const left = 50;
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
      }
    const [modalStyle] = useState(getModalStyle);
      
      const useStyles = makeStyles((theme) => ({
        paper: {
          position: 'absolute',
          width: 400,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }));
      const classes = useStyles();
    
    useEffect(() => {
        const apiRequestArticles = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const myParam = urlParams.get('name');
            const result = await axios(
            `http://localhost:5000/search?name=${myParam}`,
            );
            console.log('datooos',result.data)
            setData(result.data);
        }
        const apiRequestProviders = async () => {
            const result = await axios(
            `http://localhost:5000/searchProvider?id=${modalData.id_fabricante}`,
            );
            console.log('datooos Fabricante',result.data)
            setProviderData(result.data[0]);
        }
        apiRequestArticles();
        apiRequestProviders();
    }, [performSearch, modalData]);
    const SearchBar = () => {
        return (
            <Grid container spacing={5}>
                <Grid item xs={12}>
                  <h1>THE MERN SHOP</h1>
                  <form noValidate autoComplete="off">
                    <TextField
                        value={inputText}
                        onChange={(e)=> setInputText(e.target.value)}
                        id="outlined-basic" label="Buscar" variant="outlined">
                    </TextField>
                  </form>
                      <Button onClick={() => {
                          setPerformSearch(!performSearch)
                          history.push(`/search?name=${inputText}`)
                          }} variant="contained">Buscar</Button>
                </Grid>
            </Grid>
        )
    }
    const OrderButtons = () => {
        const orderByPrice = () => {
            setOrderLogic(!orderLogic)
            const newData = [...data];
            newData.sort((a,b) => {
                if(a.Precio < b.Precio){
                    return orderLogic ? 1 : -1
                }
                if(a.Precio > b.Precio){
                    return orderLogic ? -1 : 1
                }
                return 0;
            })
            setData(newData)
        }
        const orderByRating = () => {
            setOrderLogic(!orderLogic)
            const newData = [...data];
            newData.sort((a,b) => {
                if(a.Relevancia < b.Relevancia){
                    return orderLogic ? 1 : -1
                }
                if(a.Relevancia > b.Relevancia){
                    return orderLogic ? -1 : 1
                }
                return 0;
            })
            setData(newData)
        }
        const orderByName = () => {
            setOrderLogic(!orderLogic)
            const newData = [...data];
            newData.sort((a,b) => {
                if(a.Nombre < b.Nombre){
                    return orderLogic ? 1 : -1
                }
                if(a.Nombre > b.Nombre){
                    return orderLogic ? -1 : 1
                }
                return 0;
            })
            setData(newData)
        }
        return (
            <Grid item xs={12}>
            <ButtonGroup aria-label="outlined primary button group">
                <Button onClick={() => orderByName()}>Nombre</Button>
                <Button onClick={() => orderByRating()}>Relevancia</Button>
                <Button onClick={() => orderByPrice()}>Precio</Button>
            </ButtonGroup>
            </Grid>
        )
    }
    const onClickName = (elem) => {
        setModalData({...elem})
        setOpenModal(true)
    }

    const ProductList = () => {
        return (
            <Grid item xs={12}>
                {
                data.length > 0 ? data.map(elem => {
                    return (
                        <div onClick={() => onClickName(elem)} key={elem._id}>
                            <p className="test">{elem.Nombre}</p> 
                            <p>{elem.Precio}</p> 
                            <p>{elem.Relevancia}</p> 
                        </div>
                    )
                })
                : <p>No existe el artículo</p>
                }
            </Grid>
        )
    }
    const Footer = () => {
        return (
            <Grid item xs={12}>
            <ButtonGroup aria-label="outlined primary button group">
                <Button><ArrowBackIcon/>Anterior</Button>
                <Button>Siguiente<ArrowForwardIcon/></Button>
            </ButtonGroup>
            </Grid>
        )
    }
    

    return (
        <div>
        <Grid container spacing={5}>
            <SearchBar/>
            <OrderButtons/>
            <Modal 
                open={openModal} 
                onClose={() => setOpenModal(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                <div style={modalStyle} className={classes.paper}>
                    <p>{modalData.Nombre}</p> 
                    <p>{modalData.Precio}</p> 
                    <p>{modalData.Relevancia}</p> 
                    <p>{providerData.Nombre}</p> 
                    <p>{providerData.CIF}</p> 
                    <p>{providerData.Dirección}</p> 
                </div>
            </Modal>
            <ProductList/>
            <Footer/>
        </Grid>
        </div>
    )
}

export default Search
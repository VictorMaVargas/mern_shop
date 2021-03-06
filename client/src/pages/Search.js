import {useState, useEffect} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import PaginationList from 'react-pagination-list';
import './Search.css';



const Search = () => {
    const [data, setData] = useState([]); //Datos de artículos del backend
    const [dataProviders, setDataProviders] = useState([]); //Datos de artículos del backend
    const [performSearchArticles, setPerformSearchArticles] = useState(false) // Click en el botón Buscar de artículos
    const [performSearchProviders, setPerformSearchProviders] = useState(false) // Click en el botón Buscar de proovedores
    const [orderLogic, setOrderLogic] = useState(false) // Click en alguno de los botones de ordenación
    const [openModal, setOpenModal] = useState(false); // Para abrir o cerrar el modal
    const [modalData, setModalData] = useState({}); // Para pasarle info sobre qué elemento hemos hecho click
    const [providerData, setProviderData] = useState({});// Toma los datos de los proveedores
    const [searchArticle, setSearchArticle] = useState(true);// Busca los artículos
    

    
    
      //Axios para tomar de la BBDD los artículos (por nombre) y los proveedores (nombre e ID)

    useEffect(() => {
        const apiRequestArticles = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const myParam = urlParams.get('name');
            const result = await axios(
            `http://localhost:5000/articles?name=${myParam}`,
            );
            console.log(result.data)
            setData(result.data);
        }
        const apiRequestProviders = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const myParam = urlParams.get('name');
            const result = await axios(
            `http://localhost:5000/providers?name=${myParam}`,
            );
            console.log(result.data)
            setDataProviders(result.data);
        }
        const apiRequestProvidersById = async () => {
            const result = await axios(
            `http://localhost:5000/searchProvider?id=${modalData.id_fabricante}`,
            );
            console.log(result.data)
            setProviderData(result.data[0]);
        }
        if(performSearchArticles){
            apiRequestArticles();
            setPerformSearchArticles(false);
        }
        if(performSearchProviders){
            apiRequestProviders();
            setPerformSearchProviders(false);
        }
        if(modalData.id_fabricante !== undefined ){
            apiRequestProvidersById();
        }
    }, [performSearchArticles, performSearchProviders, modalData]);

    //Barra de búsqueda que toma lo escrito para buscar tanto artículos como proveedores con botones

    const SearchBar = () => {
            const history = useHistory();
            const [inputText, setInputText] = useState ('')
            
        return (
        <Grid container spacing={5}>
            <Grid item xs={12}>
                <h1>THE MERN SHOP<ShoppingCartTwoToneIcon/></h1>
                <form noValidate autoComplete="off">
                <TextField
                    value={inputText}
                    onChange={(e)=> setInputText(e.target.value)}
                    id="outlined-basic" label="Buscar" variant="outlined">
                </TextField>
                </form>
                    <Button className="btn1" onClick={() => {
                        setPerformSearchArticles(true)
                        setSearchArticle(true)
                        history.push(`/search?name=${inputText}`)
                        }} variant="contained">Buscar Artículo</Button>
                        
                    <Button className="btn2" onClick={() => {
                        setPerformSearchProviders(true)
                        setSearchArticle(false)
                        history.push(`/providers?name=${inputText}`)
                        }} variant="contained">Buscar Proveedor</Button>
            </Grid>
        </Grid>
        )
    }

    //Funciones que ordenan en orden ascendente y descendente por precio, relevancia y nombre pulsando los botones

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
    
    //Pinta la Lista de artículos que va "envuelta" en el paquete npm paginationList que sirve para mostrar la paginación de 10 en 10 productos
    
    const ProductList = () => {
        return (
            <Grid className="cards" item xs={12}>
            {data.length > 0 ?
                <PaginationList
                data={data}
                pageSize={10}
                renderItem={(elem) => (
                        <div className="test" onClick={() => onClickName(elem)} >
                            <h3>Artículo</h3>
                            <img src={elem.Img} alt="imagen"/>
                            <p><b>Nombre:</b> {elem.Nombre}</p> 
                            <p><b>Precio:</b> {elem.Precio}</p> 
                            <p><b>Relevancia:</b> {elem.Relevancia}</p>
                        </div>
                )}
                ></PaginationList>
            : <p>No existe el artículo</p>
            }
            </Grid>
        )
        
    }
    //Lista de proveedores

    const ProvidersList = () => {
        return (
            <Grid className="cards" item xs={12}>
                {
                dataProviders.length > 0 ? dataProviders.map(elem => {
                    return (
                        <div className="test" key={elem._id}>
                            <h3>Proveedor</h3>
                            <img src={elem.Img} alt="imagen"/>
                            <p><b>Nombre:</b> {elem.Nombre}</p> 
                            <p><b>CIF:</b> {elem.CIF}</p> 
                            <p><b>Dirección:</b> {elem.Dirección}</p>
                        </div>
                    )
                })
                : <p>No existe el proveedor</p>
                }
            </Grid>
        )
    }

    //Abre la tarjeta modal a modo de pop-up

    const onClickName = (elem) => {
        setModalData({...elem})
        setOpenModal(true)
    }
    //Estilos de la tarjeta modal (por defecto) sacada de Material UI
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
          width: 300,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(1, 3, 2),
        },
      }));
      const classes = useStyles();

    //Tarjeta modal que muestra datos de artículo y proveedor
    
    return (
        <div>
        <Grid container spacing={5}>
            <SearchBar/>
            <Modal 
                open={openModal} 
                onClose={() => setOpenModal(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                <div style={modalStyle} className={classes.paper}>
                    <h3>Artículo</h3>
                    <p><b>Nombre:</b> {modalData.Nombre}</p> 
                    <p><b>Precio:</b> {modalData.Precio}</p> 
                    <p><b>Relevancia:</b> {modalData.Relevancia}</p>
                    <br />
                    <h3>Fabricante</h3>
                    <p><b>Nombre:</b> {providerData.Nombre}</p> 
                    <p><b>CIF:</b> {providerData.CIF}</p> 
                    <p><b>Dirección:</b> {providerData.Dirección}</p> 
                </div>
            </Modal>
            {searchArticle ? 
            <Grid container>
                <OrderButtons/>
                <ProductList/>
            </Grid>
            :
            <ProvidersList/>
            }
        </Grid>
        </div>
    )
}

export default Search
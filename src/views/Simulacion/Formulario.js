import React, { useState, useEffect } from 'react';
import {
  Button,
  Chip,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Grafica from './Grafica';
import fifo from '../../algorithms/FIFO';
import look from '../../algorithms/LOOK';
import TableComponent from './Table';
import { calculos } from './Calculos';
const option = [
  { label: 'FIFO', id: 1 },
  { label: 'SSTF', id: 2 },
  { label: 'SCAN', id: 3 },
  { label: 'C-LOOK', id: 4 },
  { label: 'C-SCAN', id: 5 },
];

function Formulario() {
  const [dataGrafica, setDataGrafica] = useState([]);
  const [dataTable, setDataTable] = useState({});
  const [cantidadPosiciones, setCantidadPosiciones] = useState(0);
  const [showGraf, setshowGraf] = useState(false);
  //Valores de los inputs del formulario
  const [value, setValue] = useState({
    cantidadPlatos: '',
    cantidadCilindro: '',
    cantidadSectores: '',
    tipoAlgoritmo: '',
    peticiones: [],
    posicionInicial: '',
    cantidadCabezas: '',
  });

  useEffect(() => {
    const cantidadCabezas = value.cantidadPlatos * 2;
    setCantidadPosiciones(
      value.cantidadPlatos * value.cantidadCilindro * value.cantidadCabezas
    );
    setValue({ ...value, cantidadCabezas, cantidadPosiciones });
  }, [value.cantidadSectores]);
  const handlePeticiones = (event) => {
    const array = event.target.value.split(',');
    setValue({ ...value, peticiones: array });
  };
  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const submit = () => {
    setshowGraf(true);
    //Data para mostrar en la gráfica
    setDataGrafica(fifo(look(value.peticiones,value.posicionInicial, "right"), value.posicionInicial));
    setDataTable(calculos(look(value.peticiones,value.posicionInicial, "right"), value.posicionInicial));
  };
  return (
    <Container>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, md: 12 }}>
        <Grid item xs={4} md={12} sx={{ textAlign: 'center' }}>
          <Typography variant='h3'>
            Simulación de algoritmos de planificación
          </Typography>
          <Divider sx={{ mr: 5, ml: 5, mt: 3 }}>
            <Chip label='Información del disco duro'></Chip>
          </Divider>
        </Grid>
        <Grid item xs={4} md={6}>
          <TextField
            id='cantidadPlatos'
            name='cantidadPlatos'
            margin='normal'
            fullWidth
            label='Cantidad de platos'
            value={value.cantidadPlatos}
            onChange={handleChange}
          />
          <TextField
            id='cantidadCilindro'
            name='cantidadCilindro'
            margin='normal'
            fullWidth
            label='Cantidad de cilindros'
            value={value.cantidadCilindro}
            onChange={handleChange}
          />
          <TextField
            id='cantidadSectores'
            name='cantidadSectores'
            margin='normal'
            fullWidth
            label='Cantidad de sectores'
            value={value.cantidadSectores}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4} md={6}>
          <FormControl fullWidth margin='normal'>
            <InputLabel id='algoritmo'>Tipo de algoritmo</InputLabel>
            <Select
              id='tipoAlgoritmo'
              name='tipoAlgoritmo'
              labelId='algoritmo'
              label='Tipo de algoritmo'
              value={value.tipoAlgoritmo}
              onChange={handleChange}
            >
              {option.map((algo) => (
                <MenuItem value={algo.label} key={algo.id}>
                  {algo.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id='posicionInicial'
            name='posicionInicial'
            margin='normal'
            fullWidth
            label='Posición inicial'
            value={value.posicionInicial}
            onChange={handleChange}
          />
          <TextField
            id='peticiones'
            name='peticiones'
            margin='normal'
            fullWidth
            label='Peticiones'
            helperText='Escribir las peticiones separadas por comas'
            placeholder='Ejemplo: 00,00,00,00,000,000,0000'
            value={value.peticiones}
            onChange={handlePeticiones}
          />
        </Grid>

        <Grid item xs={4} md={12} sx={{ alignItems: 'center' }}>
          <Button variant='contained' type='button' onClick={submit}>
            Enviar
          </Button>
        </Grid>
        {showGraf ? (
          <>
            <Grid
              item
              xs={4}
              md={6}
              sx={{
                width: 500,
                height: 500,
              }}
            >
              <Grafica data={dataGrafica} posiciones={cantidadPosiciones} />
            </Grid>
            <Grid item xs={4} md={6}>
              <TableComponent dataRow={dataTable} />
            </Grid>
          </>
        ) : null}
      </Grid>
    </Container>
  );
}

export default Formulario;

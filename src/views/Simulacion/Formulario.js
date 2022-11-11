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
  Tooltip,
  Typography,
} from '@mui/material';
import Grafica from './Grafica';
import fifo from '../../algorithms/FIFO';
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
  const [dataGrafica, setDataGrafica] = useState(null);
  const [dataTable, setDataTable] = useState(null);
  const [cantidadPosiciones, setCantidadPosiciones] = useState(0);
  const [showGraf, setshowGraf] = useState(false);
  const [error, setError] = useState({});
  //Valores de los inputs del formulario
  const [value, setValue] = useState({
    cantidadCabezas: '',
    cantidadCilindro: '',
    cantidadSectores: '',
    tipoAlgoritmo: '',
    peticiones: [],
    posicionInicial: '',
  });

  useEffect(() => {
    setCantidadPosiciones(
      value.cantidadCabezas * value.cantidadCilindro * value.cantidadCabezas
    );
    setValue({ ...value, cantidadPosiciones });
  }, [value.cantidadSectores]);

  const handlePeticiones = (event) => {
    const array = event.target.value.split(',');
    setValue({ ...value, peticiones: array });
  };
  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };
  const validate = (value, nameInput) => {
    if (!value) setError({ ...error, [`${nameInput}`]: 'Campo requerido' });
    else setError({ ...error, [`${nameInput}`]: '' });
  };
  const handleBlur = (event) => {
    validate(event.target.value, event.target.name);
  };
  function seleccionarTipoMetodo() {
    const option = value.tipoAlgoritmo;
    switch (option) {
      case 'FIFO':
        setDataGrafica(fifo(value.peticiones, value.posicionInicial));
        setshowGraf(true);
        break;
      case 'SSTF':
        setshowGraf(false);
        alert('Función en desarrollo');

        break;
      case 'SCAN':
        setshowGraf(false);
        alert('Función en desarrollo');

        break;
      case 'C-LOOK':
        setshowGraf(false);
        alert('Función en desarrollo');
        break;
      case 'C-SCAN':
        setshowGraf(false);
        alert('Función en desarrollo');
        break;
      default:
        break;
    }
  }
  const submit = (event) => {
    event.preventDefault();
    //Data para mostrar en la gráfica
    setDataTable(calculos(value.peticiones, value.posicionInicial));
    seleccionarTipoMetodo();
  };
  return (
    <Container>
      <form>
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
            <Tooltip
              title={error.cantidadCabezas}
              followCursor
              disableInteractive={error.cantidadCabezas ? true : false}
              arrow
            >
              <TextField
                id='cantidadCabezas'
                name='cantidadCabezas'
                margin='normal'
                fullWidth
                label='Cantidad de cabezas'
                value={value.cantidadCabezas}
                onChange={handleChange}
                onBlur={handleBlur}
                error={error.cantidadCabezas ? true : false}
              />
            </Tooltip>
            <Tooltip
              title={error.cantidadCilindro}
              followCursor
              disableInteractive={error.cantidadCilindro ? true : false}
              arrow
            >
              <TextField
                id='cantidadCilindro'
                name='cantidadCilindro'
                margin='normal'
                fullWidth
                label='Cantidad de cilindros'
                value={value.cantidadCilindro}
                onChange={handleChange}
                onBlur={handleBlur}
                error={error.cantidadCilindro ? true : false}
              />
            </Tooltip>
            <Tooltip
              title={error.cantidadSectores}
              followCursor
              disableInteractive={error.cantidadSectores ? true : false}
              arrow
            >
              <TextField
                id='cantidadSectores'
                name='cantidadSectores'
                margin='normal'
                fullWidth
                label='Cantidad de sectores'
                value={value.cantidadSectores}
                onChange={handleChange}
                onBlur={handleBlur}
                error={error.cantidadSectores ? true : false}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={4} md={6}>
            <FormControl fullWidth margin='normal'>
              <InputLabel id='algoritmo'>Tipo de algoritmo</InputLabel>
              <Tooltip
                title={error.tipoAlgoritmo}
                followCursor
                disableInteractive={error.tipoAlgoritmo ? true : false}
                arrow
              >
                <Select
                  id='tipoAlgoritmo'
                  name='tipoAlgoritmo'
                  labelId='algoritmo'
                  label='Tipo de algoritmo'
                  value={value.tipoAlgoritmo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={error.tipoAlgoritmo ? true : false}
                  required
                >
                  {option.map((algo) => (
                    <MenuItem value={algo.label} key={algo.id}>
                      {algo.label}
                    </MenuItem>
                  ))}
                </Select>
              </Tooltip>
            </FormControl>
            <Tooltip
              title={error.posicionInicial}
              followCursor
              disableInteractive={error.posicionInicial ? true : false}
            >
              <TextField
                id='posicionInicial'
                name='posicionInicial'
                margin='normal'
                fullWidth
                label='Posición inicial'
                value={value.posicionInicial}
                onChange={handleChange}
                onBlur={handleBlur}
                error={error.posicionInicial ? true : false}
              />
            </Tooltip>
            <Tooltip
              title={error.peticiones}
              followCursor
              disableInteractive={error.peticiones ? true : false}
              arrow
            >
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
                onBlur={handleBlur}
                error={error.peticiones ? true : false}
              />
            </Tooltip>
          </Grid>

          <Grid item xs={4} md={12} sx={{ alignItems: 'center' }}>
            <Button variant='contained' type='submit' onClick={submit}>
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, md: 12 }}>
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

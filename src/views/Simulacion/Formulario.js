import React, { useState, useEffect } from 'react';
import {
  Alert,
  Button,
  Chip,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import Grafica from './Grafica';
import fifo from '../../algorithms/FIFO';
import look from '../../algorithms/LOOK';
import clook from '../../algorithms/CLOOK';
import sstf from '../../algorithms/SSTF';
import scan from '../../algorithms/SCAN';
import cscan from '../../algorithms/CSCAN';
import TableComponent from './Table';
import {
  calculos,
  convertirStringAIntegerArray,
  calculosScan,
} from './Calculos';
const option = [
  { label: 'FIFO', id: 1 },
  { label: 'SSTF', id: 2 },
  { label: 'SCAN', id: 3 },
  { label: 'LOOK', id: 4 },
  { label: 'C-LOOK', id: 5 },
  { label: 'C-SCAN', id: 6 },
];

const direc = [
  { label: 'Ascendente', value: 'right', id: 1 },
  { label: 'Descendente', value: 'left', id: 2 },
];

function Formulario() {
  const [dataGrafica, setDataGrafica] = useState(null);
  const [dataTable, setDataTable] = useState(null);
  const [cantidadPosiciones, setCantidadPosiciones] = useState(0);
  const [showGraf, setshowGraf] = useState(false);
  const [error, setError] = useState({});
  const [open, setOpen] = useState(false);
  //Valores de los inputs del formulario
  const [value, setValue] = useState({
    cantidadCabezas: '',
    cantidadCilindro: '',
    cantidadSectores: '',
    tipoAlgoritmo: '',
    peticiones: [],
    posicionInicial: '',
    direccion: 'right',
    cantidadPosiciones: '',
  });

  useEffect(() => {
    setCantidadPosiciones(
      value.cantidadCabezas * value.cantidadCilindro * value.cantidadSectores
    );
    setValue({ ...value, cantidadPosiciones: cantidadPosiciones });
  }, [value.cantidadSectores, value.cantidadCabezas, value.cantidadCilindro]);

  const handlePeticiones = (event) => {
    const array = event.target.value.split(',');
    setValue({ ...value, peticiones: array });
  };
  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const validate = (value, nameInput) => {
    validateNoNeg(value, nameInput);
    if (!value) setError({ ...error, [`${nameInput}`]: 'Campo requerido' });
    else if (
      nameInput === 'cantidadCabezas' ||
      nameInput === 'cantidadCilindro' ||
      nameInput === 'cantidadSectores' ||
      nameInput === 'posicionInicial'
    )
      validateNoNeg(value, nameInput);
    else setError({ ...error, [`${nameInput}`]: '' });
  };
  const validateNoNeg = (value, nameInput) => {
    if (value <= 0)
      setError({ ...error, [`${nameInput}`]: 'Solamente numeros positivos' });
    else setError({ ...error, [`${nameInput}`]: '' });
  };

  const handleBlur = (event) => {
    validate(event.target.value, event.target.name);
  };
  function seleccionarTipoMetodo() {
    const option = value.tipoAlgoritmo;
    let posicionesInteger = convertirStringAIntegerArray(value.peticiones);
    switch (option) {
      case 'FIFO':
        setDataGrafica(fifo(value.peticiones, value.posicionInicial));
        setDataTable(calculos(value.peticiones, value.posicionInicial));
        setshowGraf(true);
        break;
      case 'SSTF':
        let sstfArray = sstf(posicionesInteger, value.posicionInicial);
        setDataGrafica(fifo(sstfArray, value.posicionInicial));
        setDataTable(calculos(sstfArray, value.posicionInicial));
        setshowGraf(true);
        break;
      case 'SCAN':
        let scanArray = scan(
          posicionesInteger,
          value.posicionInicial,
          value.cantidadPosiciones,
          value.direccion
        );
        setDataGrafica(fifo(scanArray, value.posicionInicial));
        setDataTable(calculos(scanArray, value.posicionInicial));
        setshowGraf(true);
        break;
      case 'LOOK':
        let lookArray = look(
          posicionesInteger,
          value.posicionInicial,
          value.direccion
        );
        setDataGrafica(fifo(lookArray, value.posicionInicial));
        setDataTable(calculos(lookArray, value.posicionInicial));
        setshowGraf(true);
        break;
      case 'C-LOOK':
        let clookArray = clook(
          posicionesInteger,
          value.posicionInicial,
          value.direccion
        );
        setDataGrafica(fifo(clookArray, value.posicionInicial));
        setDataTable(calculos(clookArray, value.posicionInicial));
        setshowGraf(true);
        break;
      case 'C-SCAN':
        let cscanArray = cscan(
          posicionesInteger,
          value.posicionInicial,
          cantidadPosiciones,
          value.direccion
        );
        setDataGrafica(fifo(cscanArray, value.posicionInicial));
        setDataTable(
          calculosScan(cscanArray, value.posicionInicial, cantidadPosiciones)
        );
        setshowGraf(true);
        break;
      default:
        break;
    }
  }
  const submit = (event) => {
    event.preventDefault();
    if (
      !value.cantidadCabezas ||
      !value.cantidadCilindro ||
      !value.cantidadSectores ||
      !value.tipoAlgoritmo ||
      !value.posicionInicial ||
      !value.peticiones
    ) {
      error.message = 'Debe rellenar todos los campos';
      setOpen(true);
      return;
    } else if (
      value.cantidadCabezas <= 0 ||
      value.cantidadCilindro <= 0 ||
      value.cantidadSectores <= 0 ||
      value.posicionInicial <= 0
    ) {
      error.message = 'Solo valores positivos';
      setOpen(true);
      return;
    } else {
      setOpen(false);
      error.message = '';
    }

    //Data para mostrar en la gráfica
    setValue({ ...value, cantidadPosiciones: cantidadPosiciones });
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
                required
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
                required
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
                required
                error={error.cantidadSectores ? true : false}
              />
            </Tooltip>
            {value.tipoAlgoritmo === 'C-SCAN' ||
            value.tipoAlgoritmo === 'C-LOOK' ||
            value.tipoAlgoritmo === 'LOOK' ||
            value.tipoAlgoritmo === 'SCAN' ? (
              <FormControl fullWidth margin='normal'>
                <InputLabel id='direccion'>Dirección del algoritmo</InputLabel>
                <Tooltip
                  title={error.direccion}
                  followCursor
                  disableInteractive={error.direccion ? true : false}
                  arrow
                >
                  <Select
                    id='direccion'
                    name='direccion'
                    labelId='direccion'
                    label='Dirección del algoritmo'
                    value={value.direccion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={error.direccion ? true : false}
                    required
                  >
                    {direc.map((algo) => (
                      <MenuItem value={algo.value} key={algo.id}>
                        {algo.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Tooltip>
              </FormControl>
            ) : null}
          </Grid>
          <Grid item xs={4} md={6} sx={{ textAlign: 'right' }}>
            <FormControl fullWidth margin='normal' sx={{ textAlign: 'left' }}>
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
                required
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
                required
                error={error.peticiones ? true : false}
              />
            </Tooltip>
            <Button variant='contained' type='submit' onClick={submit}>
              Enviar
            </Button>
          </Grid>
          {error.message && (
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity='error'
                sx={{ width: '100%' }}
              >
                {error.message}
              </Alert>
            </Snackbar>
          )}
        </Grid>
      </form>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, md: 12 }}>
        {showGraf ? (
          <>
            <Grid item xs={4} md={12} sx={{ textAlign: 'center' }}>
              <Divider sx={{ mr: 5, ml: 5, mt: 5, mb: 3 }}>
                <Chip label='Gráfica y tabla de cálculos'></Chip>
              </Divider>
            </Grid>
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

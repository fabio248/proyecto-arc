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
import DeleteIcon from '@mui/icons-material/Delete';
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
  { label: 'Ascendente', id: 1 },
  { label: 'Descendente', id: 2 },
];

function Formulario() {
  const [dataGraficaUno, setDataGraficaUno] = useState(null);
  const [dataTableUno, setDataTableUno] = useState(null);
  const [dataGraficaDos, setDataGraficaDos] = useState([]);
  const [dataTableDos, setDataTableDos] = useState([]);
  const [cantidadPosiciones, setCantidadPosiciones] = useState(0);
  const [tituloGraficaUno, setTituloGraficaUno] = useState('');
  const [tituloGraficaDos, setTituloGraficaDos] = useState('');
  const [graficaUno, setGraficaUno] = useState(false);
  const [error, setError] = useState({});
  const [open, setOpen] = useState(false);
  const [graficaDos, setGraficaDos] = useState(false);
  const [eleccionAlgoritmo, setEleccionAlgoritmo] = useState('');
  const [eleccionDireccion, setEleccionDireccion] = useState('');
  const [eleccionAlgoritmoDos, setEleccionAlgoritmoDos] = useState('');
  const [eleccionDireccionDos, setEleccionDireccionDos] = useState('');
  //Valores de los inputs del formulario
  const [value, setValue] = useState({
    cantidadCabezas: '',
    cantidadCilindro: '',
    cantidadSectores: '',
    tipoAlgoritmo: '',
    peticiones: '',
    posicionInicial: '',
    direccion: 'Ascendente',
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
  /**
   * Valida los inputs del formulario e invoca la validacion de numeros
   * no negativos invocando el metodo validateNoNeg para inputs que reciben
   * datos numericos
   * @param value Valor del input
   * @param nameInput Nombre del input a validar
   * @return {[void]} Ingresa al array de errores un error en caso que exista
   * * */
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
  function seleccionarMetodoGraficaUno() {
    const option = value.tipoAlgoritmo;
    let posicionesInteger = convertirStringAIntegerArray(value.peticiones);
    switch (option) {
      case 'FIFO':
        setDataGraficaUno(fifo(value.peticiones, value.posicionInicial));
        setDataTableUno(calculos(value.peticiones, value.posicionInicial));
        setGraficaUno(true);
        break;
      case 'SSTF':
        let sstfArray = sstf(posicionesInteger, value.posicionInicial);
        setDataGraficaUno(fifo(sstfArray, value.posicionInicial));
        setDataTableUno(calculos(sstfArray, value.posicionInicial));
        setGraficaUno(true);
        break;
      case 'SCAN':
        let scanArray = scan(
          posicionesInteger,
          value.posicionInicial,
          value.cantidadPosiciones,
          value.direccion
        );
        setDataGraficaUno(fifo(scanArray, value.posicionInicial));
        setDataTableUno(calculos(scanArray, value.posicionInicial));
        setGraficaUno(true);
        break;
      case 'LOOK':
        let lookArray = look(
          posicionesInteger,
          value.posicionInicial,
          value.direccion
        );
        setDataGraficaUno(fifo(lookArray, value.posicionInicial));
        setDataTableUno(calculos(lookArray, value.posicionInicial));
        setGraficaUno(true);
        break;
      case 'C-LOOK':
        let clookArray = clook(
          posicionesInteger,
          value.posicionInicial,
          value.direccion
        );
        setDataGraficaUno(fifo(clookArray, value.posicionInicial));
        setDataTableUno(calculos(clookArray, value.posicionInicial));
        setGraficaUno(true);
        break;
      case 'C-SCAN':
        let cscanArray = cscan(
          posicionesInteger,
          value.posicionInicial,
          cantidadPosiciones,
          value.direccion
        );
        setDataGraficaUno(fifo(cscanArray, value.posicionInicial));
        setDataTableUno(
          calculosScan(cscanArray, value.posicionInicial, cantidadPosiciones)
        );
        setGraficaUno(true);
        break;
      default:
        break;
    }
  }
  function seleccionarMetodoGraficaDos() {
    const option = value.tipoAlgoritmo;
    let posicionesInteger = convertirStringAIntegerArray(value.peticiones);
    switch (option) {
      case 'FIFO':
        setDataGraficaDos(fifo(value.peticiones, value.posicionInicial));
        setDataTableDos(calculos(value.peticiones, value.posicionInicial));
        setGraficaDos(true);
        break;
      case 'SSTF':
        let sstfArray = sstf(posicionesInteger, value.posicionInicial);
        setDataGraficaDos(fifo(sstfArray, value.posicionInicial));
        setDataTableDos(calculos(sstfArray, value.posicionInicial));
        setGraficaDos(true);
        break;
      case 'SCAN':
        let scanArray = scan(
          posicionesInteger,
          value.posicionInicial,
          value.cantidadPosiciones,
          value.direccion
        );
        setDataGraficaDos(fifo(scanArray, value.posicionInicial));
        setDataTableDos(calculos(scanArray, value.posicionInicial));
        setGraficaDos(true);
        break;
      case 'LOOK':
        let lookArray = look(
          posicionesInteger,
          value.posicionInicial,
          value.direccion
        );
        setDataGraficaDos(fifo(lookArray, value.posicionInicial));
        setDataTableDos(calculos(lookArray, value.posicionInicial));
        setGraficaDos(true);
        break;
      case 'C-LOOK':
        let clookArray = clook(
          posicionesInteger,
          value.posicionInicial,
          value.direccion
        );
        setDataGraficaDos(fifo(clookArray, value.posicionInicial));
        setDataTableDos(calculos(clookArray, value.posicionInicial));
        setGraficaDos(true);
        break;
      case 'C-SCAN':
        let cscanArray = cscan(
          posicionesInteger,
          value.posicionInicial,
          cantidadPosiciones,
          value.direccion
        );
        setDataGraficaDos(fifo(cscanArray, value.posicionInicial));
        setDataTableDos(
          calculosScan(cscanArray, value.posicionInicial, cantidadPosiciones)
        );
        setGraficaDos(true);
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
    } else if (eleccionAlgoritmoDos === value.tipoAlgoritmo) {
      if (value.tipoAlgoritmo === 'FIFO' || value.tipoAlgoritmo === 'SSTF') {
        error.message =
          'Debes elegir un tipo de algoritmo diferente para comparar para el gráfico 1';
        setOpen(true);
        setGraficaUno(false);
        setError({ ...error, [`tipoAlgoritmo`]: 'Elige otro algoritmo' });
        return;
      } else if (eleccionDireccionDos === value.direccion) {
        error.message =
          'Debes elegir un tipo de algoritmo diferente para comparar para el gráfico 1';
        setOpen(true);
        setGraficaUno(false);
        setError({ ...error, [`tipoAlgoritmo`]: 'Elige otro algoritmo' });
        return;
      }
    } else if (parseInt(value.posicionInicial) >= cantidadPosiciones) {
      error.message = `Las posición inicial no pueden superar el valor ${
        cantidadPosiciones - 1
      }`;
      setError({
        ...error,
        [`posicionInicial`]: `Valores menores a ${cantidadPosiciones}`,
      });
      setOpen(true);
      setGraficaUno(false);
      return;
    } else {
      for (let i = 0; i < value.peticiones.length; i++) {
        if (parseInt(value.peticiones[i]) >= cantidadPosiciones) {
          error.message = `Las peticiones no pueden superar el valor ${
            cantidadPosiciones - 1
          }`;
          setOpen(true);
          setError({
            ...error,
            [`peticiones`]: `Peticiones menores a ${cantidadPosiciones}`,
          });
          setGraficaUno(false);
          return;
        }
      }
      setOpen(false);
      error.message = '';
    }
    setError({ ...error, [`tipoAlgoritmo`]: '' });
    setError({ ...error, peticiones: '' });
    setError({ ...error, posicionInicial: '' });
    //Data para mostrar en la gráfica
    if (value.tipoAlgoritmo === 'FIFO' || value.tipoAlgoritmo === 'SSTF')
      setTituloGraficaUno(value.tipoAlgoritmo);
    else setTituloGraficaUno(`${value.tipoAlgoritmo} ${value.direccion}`);
    setValue({ ...value, cantidadPosiciones: cantidadPosiciones });
    seleccionarMetodoGraficaUno();
    setEleccionAlgoritmo(value.tipoAlgoritmo);
    setEleccionDireccion(value.direccion);
  };

  const submitComparar = (event) => {
    event.preventDefault();
    if (eleccionAlgoritmo === value.tipoAlgoritmo) {
      if (value.tipoAlgoritmo === 'FIFO' || value.tipoAlgoritmo === 'SSTF') {
        error.message =
          'Debes elegir un tipo de algoritmo diferente para comparar para el gráfico 2';
        setOpen(true);
        setGraficaDos(false);
        setError({ ...error, [`tipoAlgoritmo`]: 'Elige otro algoritmo' });
        return;
      } else if (eleccionDireccion === value.direccion) {
        error.message =
          'Debes elegir un tipo de algoritmo diferente para comparar para el gráfico 2';
        setOpen(true);
        setError({ ...error, [`tipoAlgoritmo`]: 'Elige otro algoritmo' });
        setGraficaDos(false);
        return;
      }
    } else if (parseInt(value.posicionInicial) >= cantidadPosiciones) {
      error.message = `Las peticiones no pueden superar el valor ${
        cantidadPosiciones - 1
      }`;
      setError({
        ...error,
        [`posicionInicial`]: `Valores menores a ${cantidadPosiciones}`,
      });
      setOpen(true);
      setGraficaDos(false);
      return;
    } else {
      for (let i = 0; i < value.peticiones.length; i++) {
        if (parseInt(value.peticiones[i]) >= cantidadPosiciones) {
          error.message = `Las peticiones no pueden superar el valor ${
            cantidadPosiciones - 1
          }`;
          setError({
            ...error,
            peticiones: `Peticiones menores a ${cantidadPosiciones}`,
          });
          setOpen(true);
          setGraficaDos(false);
          return;
        }
      }
    }
    setError({ ...error, [`tipoAlgoritmo`]: '' });
    setError({ ...error, peticiones: '' });
    setError({ ...error, posicionInicial: '' });
    if (value.tipoAlgoritmo === 'FIFO' || value.tipoAlgoritmo === 'SSTF')
      setTituloGraficaDos(value.tipoAlgoritmo);
    else setTituloGraficaDos(`${value.tipoAlgoritmo} ${value.direccion}`);
    seleccionarMetodoGraficaDos();
    setEleccionAlgoritmoDos(value.tipoAlgoritmo);
    setEleccionDireccionDos(value.direccion);
  };
  const eliminarComparacion = (event) => {
    event.preventDefault();
    setEleccionAlgoritmo('');
    setEleccionAlgoritmoDos('');
    setEleccionDireccion('');
    setEleccionDireccionDos('');
    setGraficaDos(false);
    setGraficaUno(false);
  };
  const limpiarFormulario = (event) => {
    event.preventDefault();
    setValue({
      cantidadCabezas: '',
      cantidadCilindro: '',
      cantidadSectores: '',
      tipoAlgoritmo: '',
      peticiones: [],
      posicionInicial: '',
      direccion: 'Ascendente',
      cantidadPosiciones: '',
    });
    setEleccionAlgoritmo('');
    setEleccionAlgoritmoDos('');
    setEleccionDireccion('');
    setEleccionDireccionDos('');
    setGraficaDos(false);
    setGraficaUno(false);
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
                type='number'
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
                type='number'
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
                type='number'
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
                      <MenuItem value={algo.label} key={algo.id}>
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
                type='number'
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
            {(graficaUno || graficaDos) && (
              <Button
                variant='contained'
                type='submit'
                color='error'
                startIcon={<DeleteIcon />}
                onClick={limpiarFormulario}
                sx={{ mr: 2 }}
              >
                Limpiar
              </Button>
            )}
            <Button variant='contained' type='submit' onClick={submit}>
              {tituloGraficaUno && graficaDos ? `Gráfica 1` : 'Enviar'}
            </Button>
            {graficaUno ? (
              <Button
                variant='contained'
                color='success'
                type='submit'
                onClick={submitComparar}
                sx={{ ml: 2 }}
              >
                {tituloGraficaDos && graficaUno ? 'Gráfica 2' : 'Comparar'}
              </Button>
            ) : null}
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
        {graficaUno || graficaDos ? (
          <Grid item xs={4} md={12} sx={{ textAlign: 'center' }}>
            <Divider sx={{ mr: 5, ml: 5, mt: 5 }}>
              <Chip label='Gráfica y tabla de cálculos'></Chip>
            </Divider>
          </Grid>
        ) : null}
        {graficaUno ? (
          <Grid
            item
            xs={4}
            md={6}
            sx={{
              width: 500,
              height: 500,
              mb: 3,
            }}
          >
            <Divider sx={{ mr: 5, ml: 5, mt: 4 }}>
              <Chip label='Gráfica 1'></Chip>
            </Divider>
            <Grafica
              data={dataGraficaUno}
              posiciones={cantidadPosiciones}
              nameLegend={tituloGraficaUno}
              color='#8884d8'
            />
          </Grid>
        ) : null}
        {graficaDos ? (
          <Grid
            item
            xs={4}
            md={6}
            sx={{
              width: 500,
              height: 500,
            }}
          >
            <Divider sx={{ mr: 5, ml: 5, mt: 4 }}>
              <Chip label='Gráfica 2'></Chip>
            </Divider>
            <Grafica
              data={dataGraficaDos}
              posiciones={cantidadPosiciones}
              nameLegend={tituloGraficaDos}
              color='#2d7d32'
            />
          </Grid>
        ) : null}
        {graficaUno ? (
          <Grid item xs={4} md={6} sx={{ mt: 7 }}>
            <TableComponent dataRow={dataTableUno} name={tituloGraficaUno} />
          </Grid>
        ) : null}

        {graficaDos ? (
          <Grid item xs={4} md={6} sx={{ mt: 7, textAlign: 'right' }}>
            <TableComponent dataRow={dataTableDos} name={tituloGraficaDos} />
            <Button
              variant='contained'
              color='secondary'
              sx={{ mt: 5 }}
              startIcon={<DeleteIcon />}
              onClick={eliminarComparacion}
            >
              Eliminar comparación
            </Button>
          </Grid>
        ) : null}
      </Grid>
    </Container>
  );
}

export default Formulario;

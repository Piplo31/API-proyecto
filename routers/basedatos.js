const { Pool } = require('pg');
const Router = require('express-promise-router');
const keys = require('../config/keys');


const pool = new Pool({
  connectionString: keys.posgresqlURI,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect();

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;
//agregar algun tipo de identificacion
router.post('/insertar_tipo_id', async (req, res) => {
  const { nombre } = req.body;
  console.log(req.body)
  await pool.query(
    `INSERT INTO tipo_identificacion(nombre) VALUES('${nombre}')`
  );
  res.json({ 'RES': 'INSERTADO' });
});
//agregar direccion persona
router.post('/insertar_persona_dir', async (req, res) => {
  const {id_persona,direccion,barrio } = req.body;
  console.log(req.body)
  await pool.query(
    `INSERT INTO persona_direccion(id_persona, direccion, barrio) VALUES('${id_persona}','${direccion}','${barrio}')`
  );
  res.json({ 'RES': 'INSERTADO' });
});
//agregar telefonos persona
router.post('/insertar_persona_tel', async (req, res) => {
  const { id_persona,id_tipo_telefono,telefono } = req.body;
  console.log(req.body)
  await pool.query(
    `INSERT INTO persona_telefonos(id_persona, id_tipo_telefono, telefono) VALUES('${id_persona}','${id_tipo_telefono}','${telefono}')`
  );
  res.json({ 'RES': 'INSERTADO' });
});
//agregar tipo de telefono
router.post('/insertar_tipo_tel', async (req, res) => {
  const { nombre} = req.body;
  console.log(req.body)
  await pool.query(
    `INSERT INTO tipo_telefono(nombre) VALUES('${nombre}')`
  );
  res.json({ 'RES': 'INSERTADO' });
});
//agregar pais
router.post('/insertar_pais', async (req, res) => {
  const { nombre} = req.body;
  console.log(req.body)
  await pool.query(
    `INSERT INTO pais(nombre) VALUES('${nombre}')`
  );
  res.json({ 'RES': 'INSERTADO' });
});
//agregar departamento
router.post('/insertar_dept', async (req, res) => {
  const { nombre,id_pais} = req.body;
  console.log(req.body)
  await pool.query(
    `INSERT INTO departamento(nombre,id_pais) VALUES('${nombre}','${id_pais}')`
  );
  res.json({ 'RES': 'INSERTADO' });
});

//agregar ciudad
router.post('/insertar_ciudad', async (req, res) => {
  const { nombre,id_dept} = req.body;
  console.log(req.body)
  await pool.query(
    `INSERT INTO ciudad(nombre,id_departamento) VALUES('${nombre}','${id_departamento}')`
  );
  res.json({ 'RES': 'INSERTADO' });
});
//Registro Paciente
router.post('/insertar_paciente', async (req, res) => {
  const {nombre, id_tipo_identificacion, numero_identificacion,id_doctor,latitud,longitud,num_integrantes_hogar,id_ciudad,estado_enfermedad} = req.body;
  console.log(req.body)
  await pool.query(
    `INSERT INTO persona(nombre, id_tipo_identificacion, numero_identificacion) VALUES('${nombre}','${id_tipo_identificacion}','${numero_identificacion}')`
  );
  
  const { rows }  = await pool.query(`SELECT id FROM persona WHERE numero_identificacion= '${numero_identificacion}'`);
  
  await pool.query(
    `INSERT INTO paciente(id_persona,id_doctor_encargado,latitud,longitud,numero_integrantes_hogar,id_ciudad_contagio,estado_enfermedad)
     VALUES('${rows[0]["id"]}','${id_doctor}','${latitud}','${longitud}','${num_integrantes_hogar}',${id_ciudad},'${estado_enfermedad}')`
  );
  res.json({ 'RES': 'INSERTADO' });
});


//agregar universidad
router.post('/insertar_universidad', async (req, res) => {
  const {nombre} = req.body;
  console.log(req.body)
  await pool.query(
    `INSERT INTO universidad(nombre)
     VALUES('${nombre}')`

  );
  res.json({ 'RES': 'INSERTADO' });
});
//agregar promotora de salud
router.post('/insertar_eps', async (req, res) => {
  const {nombre} = req.body;
  console.log(req.body)
  await pool.query(
    `INSERT INTO entidad_promotora_salud(nombre)
     VALUES('${nombre}')`

  );
  res.json({ 'RES': 'INSERTADO' });
});
//Registro profesional de salud
router.post('/insertar_profesional_salud', async (req, res) => {
  const {nombre, id_tipo_identificacion, numero_identificacion,id_eps,id_universidad,clave,usuario} = req.body;
  console.log(req.body)
  await pool.query(
    `INSERT INTO persona(nombre, id_tipo_identificacion, numero_identificacion) VALUES('${nombre}','${id_tipo_identificacion}','${numero_identificacion}')`
  );
 
  const { rows }  = await pool.query(`SELECT id FROM persona WHERE numero_identificacion= '${numero_identificacion}'`);
 
  await pool.query(
    `INSERT INTO profesional_salud(id_persona,id_universidad,id_eps)
     VALUES('${rows[0]["id"]}',${id_universidad},${id_eps})`

  );

  await pool.query(
    `INSERT INTO usuario(id_persona,password,login)
     VALUES('${rows[0]["id"]}','${clave}','${usuario}')`

  );
  res.json({ 'RES': 'INSERTADO' });
});

//Registro funcionario

router.post('/insertar_funcionario', async (req, res) => {
  const {nombre, id_tipo_identificacion, numero_identificacion,clave,usuario} = req.body;
  console.log(req.body)
  await pool.query(
    `INSERT INTO persona(nombre, id_tipo_identificacion, numero_identificacion) VALUES('${nombre}','${id_tipo_identificacion}','${numero_identificacion}')`
  );
 
  const { rows }  = await pool.query(`SELECT id FROM persona WHERE numero_identificacion= '${numero_identificacion}'`);
 
  await pool.query(
    `INSERT INTO funcionario(id_persona)
     VALUES('${rows[0]["id"]}')`

  );
  await pool.query(
    `INSERT INTO usuario(id_persona,password,login)
     VALUES('${rows[0]["id"]}','${clave}','${usuario}')`

  );
  res.json({ 'RES': 'INSERTADO' });
});


//////////////////

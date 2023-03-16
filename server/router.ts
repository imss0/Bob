"use strict";
const routes = require("express").Router();
const employeeCont = require("./controllers/employee.controller");
const shiftTypeCont = require("./controllers/shiftType.controller");
const shiftCont = require("./controllers/shift.controller");
const rotaCont = require("./controllers/rota.controller");
const userCont = require('./controllers/user.controller');

//employee methods
routes.get("/employees/:user_id", employeeCont.getAllEmployees);
routes.post("/employee/:user_id", employeeCont.addEmployee);
routes.delete("/employees/:id/:user_id", employeeCont.deleteEmployee);
routes.put("/employee/:id/:user_id", employeeCont.updateEmployee);

//shift type methods
routes.get("/shift-types/:user_id", shiftTypeCont.getAllShiftTypes);
routes.post("/shift-type/:user_id", shiftTypeCont.addShiftType);
routes.delete("/shift-type/:id/:user_id", shiftTypeCont.deleteShiftType);
routes.put("/shift-type/:id/:user_id", shiftTypeCont.updateShiftType);

//shift methods
routes.get("/shifts/:user_id", shiftCont.getAllShifts);
routes.post("/shift/:user_id", shiftCont.addShift);
routes.delete("/shift/:id/:user_id", shiftCont.deleteShift);
routes.put("/shift/:id/:user_id", shiftCont.updateShift);

//rota methods
routes.get("/rota/:user_id", rotaCont.getRota);

//user check
routes.get('/getuser/:id', userCont.getUser);

module.exports = routes;

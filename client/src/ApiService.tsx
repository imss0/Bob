import { ShiftTypes } from "./types";
const URL: string = "http://localhost:4000/";

// API for Redirect
export const getShifts = async (user_id: string) => {
  // this one is used in Redirect as well
  const response = await fetch(`${URL}shifts/${user_id}`).then((response) =>
    response.json()
  );
  return response;
};

export const getShiftTypes = async (user_id: string) => {
  // this one is used in ShiftTypes as well
  const response = await fetch(`${URL}shift-types/${user_id}`).then((response) =>
    response.json()
  );
  return response;
};

// API for ShiftTypes
export const deleteShiftType = async (id: number, user_id: string) => {
  fetch(`${URL}shift-type/${id}/${user_id}`, { method: "DELETE" });
};

export const addShift = async (
  day_number_array: number[],
  shift_type_id: number,
  user_id: string
) => {
  const shift = await fetch(`${URL}shift/${user_id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      day_number_array: day_number_array,
      shift_type_id: shift_type_id,
    }),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
  return shift;
};

export const handleAddShiftType = async (newShiftType: ShiftTypes, user_id: string) => {
  const newShiftTypeId = await fetch(`${URL}shift-type/${user_id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newShiftType),
  }).then((response) => response.json());

  return newShiftTypeId;
};

export const changeShiftType = async (
  id: number,
  field: string,
  value: string,
  user_id: string
) => {
  fetch(`${URL}shift-type/${id}/${user_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ [field]: value }),
  })
    .then((response) => response)
    .catch((error) => console.error(error));
};

// API for employeesTable
export const getEmployees = async (user_id: string) => {
  const response = await fetch(`${URL}employees/${user_id}`).then((response) =>
    response.json()
  );

  return response;
};

export const deleteEmployee = async (id: number, user_id: string) => {
  fetch(`${URL}employees/${id}/${user_id}`, { method: "DELETE" });
};

export const addEmployee = async (newEmployee: any, user_id: string) => {
  const response = fetch(`${URL}employee/${user_id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEmployee),
  }).then((response) => response.json());

  return response;
};

export const changeEmployee = async (
  id: number,
  field: string,
  value: string,
  user_id: string
) => {
  const response = fetch(`${URL}employee/${id}/${user_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ [field]: value }),
  });

  return response;
};

// API for Rota
export const getRota = async (user_id: string) => {
  const response = await fetch(`${URL}rota/${user_id}`)
    .then((res) => {
      if (res.status >= 400) {
        return Promise.reject("Failed to fetch!");
      }
      return res;
    })
    .then((response) => response.json());
  return response;
};

// API for Cell (in shifts)
export const changeShift = async (id: number, updatedArray: number[], user_id: string) => {
  const response = fetch(`${URL}shift/${id}/${user_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ day_number_array: JSON.stringify(updatedArray) }),
  });

  return response;
};

// API for userDB check
export const getUser = async (user_id: string) => {
  return fetch(`${URL}getuser/${user_id}`)
    .then(res => res.json());
  
}

export {};

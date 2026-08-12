// // import axios from "axios";

// // const api = axios.create({
// //   baseURL:"http://localhost:5000/api",
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// // });

// // export default api;

// const API_URL = "https://army-project-backend-3.onrender.com/api";

// const getToken = () => {
//     return localStorage.getItem("token");
// };

// const request = async (endpoint, options = {}) => {
//     const token = getToken();

//     const response = await fetch(
//         `${API_URL}${endpoint}`,
//         {
//             ...options,

//             headers: {
//                 "Content-Type": "application/json",

//                 ...(token
//                     ? {
//                         Authorization:
//                             `Bearer ${token}`
//                     }
//                     : {}),

//                 ...(options.headers || {})
//             }
//         }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//         throw new Error(
//             data.message ||
//             "Something went wrong"
//         );
//     }

//     return data;
// };


// // ===============================
// // AUTH
// // ===============================

// export const loginUser = async (
//     username,
//     password
// ) => {
//     const data = await request(
//         "/auth/login",
//         {
//             method: "POST",

//             body: JSON.stringify({
//                 username,
//                 password
//             })
//         }
//     );

//     localStorage.setItem(
//         "token",
//         data.token
//     );

//     localStorage.setItem(
//         "user",
//         JSON.stringify(data.user)
//     );

//     return data;
// };


// export const logoutUser = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
// };


// // ===============================
// // DASHBOARD
// // ===============================

// export const getDashboard = () => {
//     return request("/dashboard");
// };


// // ===============================
// // PURCHASES
// // ===============================

// export const getPurchases = () => {
//     return request("/purchases");
// };

// export const createPurchase = (purchase) => {
//     return request(
//         "/purchases",
//         {
//             method: "POST",
//             body: JSON.stringify(purchase)
//         }
//     );
// };


// // ===============================
// // TRANSFERS
// // ===============================

// export const getTransfers = () => {
//     return request("/transfers");
// };

// export const createTransfer = (transfer) => {
//     return request(
//         "/transfers",
//         {
//             method: "POST",
//             body: JSON.stringify(transfer)
//         }
//     );
// };


// // ===============================
// // ASSIGNMENTS
// // ===============================

// export const getAssignments = () => {
//     return request("/assignments");
// };

// export const createAssignment = (
//     assignment
// ) => {
//     return request(
//         "/assignments",
//         {
//             method: "POST",
//             body: JSON.stringify(
//                 assignment
//             )
//         }
//     );
// };




// export const createExpenditure = (
//     expenditure
// ) => {
//     return request(
//         "/expenditures",
//         {
//             method: "POST",

//             body: JSON.stringify(
//                 expenditure
//             )
//         }
//     );
// };



const API_URL = "http://localhost:5000/api";


// ==========================================
// GET JWT TOKEN
// ==========================================

const getToken = () => {
  return localStorage.getItem("token");
};


// ==========================================
// COMMON API REQUEST
// ==========================================

const request = async (endpoint, options = {}) => {
  const token = getToken();

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,

      headers: {
        "Content-Type": "application/json",

        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),

        ...(options.headers || {}),
      },
    }
  );

  let data;

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong"
    );
  }

  return data;
};


// ==========================================
// AUTH
// ==========================================

export const loginUser = async (
  username,
  password
) => {
  const data = await request(
    "/auth/login",
    {
      method: "POST",

      body: JSON.stringify({
        username,
        password,
      }),
    }
  );

  // Save JWT token
  localStorage.setItem(
    "token",
    data.token
  );

  // Save user information
  localStorage.setItem(
    "user",
    JSON.stringify(data.user)
  );

  return data;
};


export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};


// ==========================================
// DASHBOARD
// ==========================================

export const getDashboard = () => {
  return request("/dashboard");
};


// ==========================================
// PURCHASES
// ==========================================

export const getPurchases = () => {
  return request("/purchases");
};


export const createPurchase = (
  purchase
) => {
  return request(
    "/purchases",
    {
      method: "POST",

      body: JSON.stringify(
        purchase
      ),
    }
  );
};


// ==========================================
// TRANSFERS
// ==========================================

export const getTransfers = () => {
  return request("/transfers");
};


export const createTransfer = (
  transfer
) => {
  return request(
    "/transfers",
    {
      method: "POST",

      body: JSON.stringify(
        transfer
      ),
    }
  );
};


// ==========================================
// ASSIGNMENTS
// ==========================================

export const getAssignments = () => {
  return request(
    "/assignments"
  );
};


export const createAssignment = (
  assignment
) => {
  return request(
    "/assignments",
    {
      method: "POST",

      body: JSON.stringify(
        assignment
      ),
    }
  );
};


// ==========================================
// EXPENDITURES
// ==========================================

export const getExpenditures = () => {
  return request(
    "/expenditures"
  );
};


export const createExpenditure = (
  expenditure
) => {
  return request(
    "/expenditures",
    {
      method: "POST",

      body: JSON.stringify(
        expenditure
      ),
    }
  );
};


// ==========================================
// AUDIT LOGS
// ==========================================

export const getAuditLogs = () => {
  return request(
    "/audit-logs"
  );
};

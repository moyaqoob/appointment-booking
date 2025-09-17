const axios2 = require("axios");
const BACKEND_URL = "http://localhost:3000";

const axios = {
  post: async (...args) => {
    try {
      const res = await axios2.post(...args);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  get: async (...args) => {
    try {
      const res = await axios2.get(...args);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  put: async (...args) => {
    try {
      const res = await axios2.put(...args);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  delete: async (...args) => {
    try {
      const res = await axios2.delete(...args);
      return res;
    } catch (e) {
      return e.response;
    }
  },
};

describe("Authentication", () => {
  let userId;
  let token;

  //signup
  test("user able to signup only once", async () => {
    const email = "yaqoobwork@email.com";
    const name = `yaqoob`;
    const password = "123123";
    const signupresponse = await axios.post(`${BACKEND_URL}/signup`, {
      email,
      name,
      password,
      role: "PROFESSOR",
    });

    expect(signupresponse.status).toBe(200);
  });

  test("signup request fails if email missing", async () => {
    const name = `yaqoob`;
    const password = "123123";
    const signup = await axios.post(`${BACKEND_URL}/signup`, {
      name,
      password,
      role: "PROFESSOR",
    });

    expect(signup.status).toBe(403);
  });

  //signin
  test("Login succeed", async () => {
    const email = "yaqoobwork@email.com";
    const password = "123123";

    const signupRes = await axios.post(`${BACKEND_URL}/login`, {
      email,
      password,
      role: "PROFESSOR",
    });

    expect(signupRes.status).toBe(200);

    const signinresponse = await axios.post(`${BACKEND_URL}/login`, {
      email,
      password,
      role: "PROFESSOR",
    });

    expect(signinresponse.status).toBe(200);
    expect(signinresponse.status).not.toBe(404);
    expect(signinresponse.data.token).toBeDefined();
  });

  test("Login failed due to wrong email and password", async () => {
    const randomemail = "abcd@gmail.com";
    const randompassword = "s83823";
    const loginResponse = await axios.post(`${BACKEND_URL}/login`, {
      randomemail,
      randompassword,
    });

    expect(loginResponse.status).toBe(403);
  });
});

//student endpoints
describe("Student endpoints", () => {
  let professorToken;
  let studentToken;
  let professorId;
  let userId;
  beforeAll(async () => {
    const name = "yaqoob";
    const email = "yaqoob28@gmail.com";
    const password = "123123";
    const role = "PROFESSOR";
    const professorSignup = await axios.post(`${BACKEND_URL}/signup`, {
      name,
      email,
      password,
      role,
    });

    professorId = professorSignup.data.userId;

    const professorLogin = await axios.post(`${BACKEND_URL}/login`, {
      email,
      password,
      role,
    });

    professorToken = professorLogin.data.token;

    const studentSignup = await axios.post(`${BACKEND_URL}/signup`, {
      name: "ahmed",
      email: "yaqoob10@gmail.com",
      password: "123123",
      role: "STUDENT",
    });
    expect(studentSignup.status).toBe(200);

    const studentLogin = await axios.post(`${BACKEND_URL}/login`, {
      email: "yaqoob10@gmail.com",
      password: "123123",
      role: "STUDENT",
    });

    studentToken = studentLogin.data.token;
  });

  test("getting all the apppointments", async () => {
    const createSlots = await axios.post(
      `${BACKEND_URL}/createSlots`,
      {
        timeSlots: [
          "2025-09-18T09:00:00.000Z",
          "2025-09-18T10:30:00.000Z",
          "2025-09-18T14:00:00.000Z",
        ],
      },
      {
        headers: {
          authorization: `Bearer ${professorToken}`,
        },
      }
    );

    expect(createSlots).toBe(200);

    const getAppointments = await axios.get(
      `${BACKEND_URL}/timeSlot/${professorId}`,
      {
        headers: {
          authorization: `Bearer ${studentToken}`,
        },
      }
    );

    expect(getAppointments.status).toBe(200);
    expect(getAppointments.data.apts).toBeDefined();
  });

  test("Slot booked Successfully", async () => {
    const book = await axios.post(
      `${BACKEND_URL}/book/${professorId}`,
      {
        timeSlot: "2025-09-18T09:00:00.000Z",
      },
      {
        headers: {
          authorization: `Bearer ${studentToken}`,
        },
      }
    );

    expect(book.status).toBe(200);
  });
});

//professor endpoints

describe("Professor endpoints", () => {
  let professorId;
  let professorToken;
  let studentToken;
  beforeAll(async () => {
    const name = "yaqoob-prof";
    const email = "yaqoob29@gmail.com";
    const password = "123123";
    const role = "PROFESSOR";
    const professorSignup = await axios.post(`${BACKEND_URL}/signup`, {
      name,
      email,
      password,
      role,
    });

    professorId = professorSignup.data.userId;

    const professorLogin = await axios.post(`${BACKEND_URL}/login`, {
      email,
      password,
      role,
    });

    professorToken = professorLogin.data.token;

    const studentSignup = await axios.post(`${BACKEND_URL}/signup`, {
      name: "ahmed-student",
      email: "yaqoob11@gmail.com",
      password: "123123",
      role: "STUDENT",
    });
    expect(studentSignup.status).toBe(200);

    const studentLogin = await axios.post(`${BACKEND_URL}/login`, {
      email: "yaqoob10@gmail.com",
      password: "123123",
      role: "STUDENT",
    });

    studentToken = studentLogin.data.token;
  });

  test("create slots", async () => {
    const parsedata = await axios.post(`${BACKEND_URL}/createSlots`, {
      timeSlots: [
        "2025-09-18T09:00:00.000Z",
        "2025-09-18T10:30:00.000Z",
        "2025-09-18T14:00:00.000Z",
      ],
    },{
      headers:{
        authorization:`Bearer ${professorToken}`
      }
    });

    expected(parsedata.data.status).toBe(200);
  });

  test("get the appointments", async () => {
    const parsedData = await axios.get(`${BACKEND_URL}/appointments`)
  });
  test("cancel slots", async() => {
    const slotBook = await axios.post(`${BACKEND_URL}/book/${professorId}`,{
        timeSlot:"2025-09-18T09:00:00.000Z"
    },{
      authorization:`Bearer ${studentToken}`
    })
    let id= slotBook.id;
    expect(slotBook.status).toBe(200)

    const cancelBooking = await axios.post(`${BACKEND_URL}/cancel/${id}`,{
       authorization: `Bearer ${professorToken}`
    })

    expect(cancelBooking.status).toBe(200)
    expect(cancelBooking.data.message).toBe("CANCELLED")
  });
});

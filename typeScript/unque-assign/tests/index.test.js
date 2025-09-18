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
    const email = `yaqoob-${Math.random()}@gmail.com`;
    const name = `yaqoob`;
    const password = "123123";
    const signupresponse = await axios.post(`${BACKEND_URL}/signup`, {
      email,
      name,
      password,
      role: "PROFESSOR",
    });

    expect(signupresponse.status).toBe(200);
    expect(signupresponse.data.userId).toBeDefined();
  });

  test("signup request fails if email missing", async () => {
    const name = `yaqoob`;
    const password = "123123";
    const signupresponse = await axios.post(`${BACKEND_URL}/signup`, {
      email: " ",
      password,
      role: "PROFESSOR",
    });

    expect(signupresponse.status).toBe(400);
  });

  //signin
  test("Login succeed", async () => {
    const email = "yaqoobwork@email.com";
    const password = "123123";

    const signinRes = await axios.post(`${BACKEND_URL}/login`, {
      email,
      password,
      role: "PROFESSOR",
    });

    expect(signinRes.status).toBe(200);

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
    const randomemail = "yaqobtimp@email.com";
    const randompassword = "1233123";
    const loginResponse = await axios.post(`${BACKEND_URL}/login`, {
      email: randomemail,
      password: randompassword,
      role: "PROFESSOR",
    });

    expect(loginResponse.status).toBe(404);

    const loginRes = await axios.post(`${BACKEND_URL}/login`, {
      email: "yaqoobwork@email.com",
      password: "12423343",
      role: "PROFESSOR",
    });

    expect(loginRes.status).toBe(403);
  });
});

//student endpoints
describe("Student endpoints", () => {
  let professorToken;
  let studentToken;
  let professorId;
  const randomSlot = new Date(
    Date.now() + Math.floor(Math.random() * 10000000)
  ).toISOString();
  beforeAll(async () => {
    const suffix = Math.random().toString(36).slice(2, 8);
    const name = `yaqoob_${suffix}`;
    const email = `yaqoob12_${suffix}@gmail.com`;
    const password = `pw_${suffix}`;

    const role = "PROFESSOR";
    const professorSignup = await axios.post(`${BACKEND_URL}/signup`, {
      name,
      email,
      password,
      role,
    });

    professorId = professorSignup.data.userId;

    expect(professorId).toBeDefined();
    const professorLogin = await axios.post(`${BACKEND_URL}/login`, {
      email,
      password,
      role,
    });

    professorToken = professorLogin.data.token;
    expect(professorToken).toBeDefined();

    const studentSignup = await axios.post(`${BACKEND_URL}/signup`, {
      name: `ahmed-${suffix}`,
      email: `yaqoob31-${suffix}@gmail.com`,
      password: `123123-${suffix}`,
      role: "STUDENT",
    });
    expect(studentSignup.status).toBe(200);

    const studentLogin = await axios.post(`${BACKEND_URL}/login`, {
      email: `yaqoob31-${suffix}@gmail.com`,
      password: `123123-${suffix}`,
      role: "STUDENT",
    });
    expect(studentLogin.status).toBe(200);

    studentToken = studentLogin.data.token;
  });

  test("getting all the apppointments", async () => {
    const response = await axios.post(
      `${BACKEND_URL}/createSlots`,
      {
        timeslots: [randomSlot, "2025-09-18T10:30:00.000Z"],
      },
      {
        headers: {
          authorization: `Bearer ${professorToken}`,
        },
      }
    );

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("message", "Slots created");

    const getAppointments = await axios.get(
      `${BACKEND_URL}/timeSlot/${professorId}`,
      {
        headers: {
          authorization: `Bearer ${studentToken}`,
        },
      }
    );

    expect(getAppointments.status).toBe(200);
  });

  test("Slot booked Successfully", async () => {
    const booking = await axios.post(
      `${BACKEND_URL}/book/${professorId}`,
      {
        timeSlot: randomSlot,
      },
      {
        headers: {
          authorization: `Bearer ${studentToken}`,
        },
      }
    );

    expect(booking.status).toBe(200);
  });
});

//professor endpoints

describe("Professor endpoints", () => {
  let professorId;
  let professorToken;
  let studentToken;
  const randomSlot = new Date(
    Date.now() + Math.floor(Math.random() * 10000000)
  ).toISOString();

  beforeAll(async () => {
    const suffix = Math.random().toString(36).slice(2, 8);
    const name = `yaqoob_${suffix}`;
    const email = `yaqoob_${suffix}@gmail.com`;
    const password = `pw_${suffix}`;

    const role = "PROFESSOR";
    const professorSignup = await axios.post(`${BACKEND_URL}/signup`, {
      name,
      email,
      password,
      role,
    });

    professorId = professorSignup.data.userId;

    expect(professorId).toBeDefined();
    const professorLogin = await axios.post(`${BACKEND_URL}/login`, {
      email,
      password,
      role,
    });

    professorToken = professorLogin.data.token;
    expect(professorToken).toBeDefined();

    const studentSignup = await axios.post(`${BACKEND_URL}/signup`, {
      name: `ahmed-${suffix}`,
      email: `yaqoob23-${suffix}@gmail.com`,
      password: `123123-${suffix}`,
      role: "STUDENT",
    });
    expect(studentSignup.status).toBe(200);

    const studentLogin = await axios.post(`${BACKEND_URL}/login`, {
      email: `yaqoob23-${suffix}@gmail.com`,
      password: `123123-${suffix}`,
      role: "STUDENT",
    });
    expect(studentLogin.status).toBe(200);

    studentToken = studentLogin.data.token;
  });

  test("create slots", async () => {
    const response = await axios.post(
      `${BACKEND_URL}/createSlots`,
      {
        timeslots: [randomSlot, "2025-09-18T10:30:00.000Z"],
      },
      {
        headers: {
          authorization: `Bearer ${professorToken}`,
        },
      }
    );

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("message", "Slots created");
  });

  test("get the appointments", async () => {
    const parsedData = await axios.get(`${BACKEND_URL}/appointments`, {
      headers: {
        authorization: `Bearer ${professorToken}`,
      },
    });

    expect(parsedData.status).toBe(200);
  });
  test("cancel slots", async () => {
    const booking = await axios.post(
      `${BACKEND_URL}/book/${professorId}`,
      {
        timeSlot: randomSlot,
      },
      {
        headers: {
          authorization: `Bearer ${studentToken}`,
        },
      }
    );

    expect(booking.status).toBe(200);
    expect(booking.data.id).toBeDefined();
    let aptId = booking.data.id;
    console.log("aptId", aptId, booking.status);
    const cancelBooking = await axios.post(
      `${BACKEND_URL}/cancel/${aptId}`,
      {},
      {
        headers: {
          authorization: `Bearer ${professorToken}`,
        },
      }
    );

    console.log("cancel booking status", cancelBooking.data.error);

    expect(cancelBooking.status).toBe(200);
    expect(cancelBooking.data.message).toBe("CANCELLED");
  });
});

const request = require("supertest");
const app = require("./index");
if (process.env.NODE_ENV === "test") {
  test("should get all the notes", async () => {
    const res = await request(app).get("/notes");
    expect(res.statusCode).toEqual(200);
  });
  test("POST /notes", async () => {
    const response = await request(app)
      .post("/notes")
      .send({ title: "notcoolnomo", done: false });
    expect(response.statusCode).toBe(201);
  });
  test("PUT /notes/:id", async () => {
    const response = await request(app)
      .put("/notes/6")
      .send({ title: "lantern", done: true });
    expect(response.statusCode).toBe(200);
  });
  test("DELETE /notes/:id", async () => {
    const response = await request(app).delete("/notes/6");
    expect(response.statusCode).toBe(200);
  });
}

// test("Creates note", () => {
//   const mock = jest.fn((note) => {
//     const { title, done } = note;

//     if (typeof title === "string" && typeof done === "boolean") {
//       return { message: "Notfalsee created", statusCode: 201 };
//     }
//   });

//   let result = mock({ title: "aasdas", done: true });

//   expect(result).toHaveProperty("statusCode");
//   expect(result.statusCode).toBe(201);
// });

// test("Edit note by id", () => {
//   const mock = jest.fn((id) => {
//     const myId = id;

//     if (typeof myId === "number" && myId > 0) {
//       return { message: "Note modified", statusCode: 200 };
//     }
//   });

//   let result = mock(64);

//   expect(result).toHaveProperty("statusCode");
//   expect(result.statusCode).toBe(200);
// });

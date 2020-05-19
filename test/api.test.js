const axios = require("axios");

describe("API Routes", () => {
  describe("GET /api/workouts", () => {
    // - should have a 200 status code
    it("should have a 200 status code", async () => {
      // make a get request & capture the response
      const { status } = await axios.get("/api/workouts");

      // expect the response.status to be 200
      expect(status).toBe(200);
    });
    // - it should have content type json
    it("should have content type json", async () => {
      const expectedContentType = "application/json";
      const { headers } = await axios.get("/api/workouts");

      const hasJSON =
        JSON.stringify(headers).indexOf(expectedContentType) !== -1;

      expect(hasJSON).toBe(true);
    });
    it("should return an array", async () => {
      const { data } = await axios.get("/api/workouts");

      const isArray = Array.isArray(data);

      expect(isArray).toBe(true);
    });
    it("it should return an array of workout objects if it's not empty", async () => {
      const { data } = await axios.get("/api/workouts");

      const isObject = typeof data[0] === "object";

      if (data.length > 0) {
        expect(isObject).toBe(true);
      } else {
        expect(isObject).toBe(false);
      }
    });
  });
});

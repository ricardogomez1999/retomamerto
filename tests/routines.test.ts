import { GET } from "../app/api/routines/route";

describe("GET /api/routines", () => {
  it("returns a list of routines", async () => {
    const response = await GET();
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });
});

import { fetchHkoData } from "../services/hko.service.js";
import { afterEach, describe, expect, it, jest } from "@jest/globals";

describe("fetchHkoData", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns parsed JSON on success", async () => {
    const mockPayload = { ok: true, value: 123 };
    jest.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockPayload,
    } as unknown as Response);

    const data = await fetchHkoData<typeof mockPayload>({
      dataType: "rhrread",
      lang: "en",
    });

    expect(data).toEqual(mockPayload);
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  it("throws tagged 502 error when network request fails", async () => {
    jest.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network"));

    await expect(
      fetchHkoData({
        dataType: "flw",
        lang: "en",
      }),
    ).rejects.toMatchObject({
      isHkoApiError: true,
      statusCode: 502,
      message: "Failed to reach HKO API",
    });
  });

  it("maps upstream 5xx to 502", async () => {
    jest.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 503,
      json: jest.fn(),
    } as unknown as Response);

    await expect(
      fetchHkoData({
        dataType: "flw",
        lang: "tc",
      }),
    ).rejects.toMatchObject({
      isHkoApiError: true,
      statusCode: 502,
      message: "HKO API responded with status 503",
    });
  });

  it("keeps upstream 4xx status code", async () => {
    jest.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 404,
      json: jest.fn(),
    } as unknown as Response);

    await expect(
      fetchHkoData({
        dataType: "rhrread",
        lang: "sc",
      }),
    ).rejects.toMatchObject({
      isHkoApiError: true,
      statusCode: 404,
      message: "HKO API responded with status 404",
    });
  });
});

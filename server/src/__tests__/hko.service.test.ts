import { fetchHkoData } from "../services/hko.service.js";

describe("fetchHkoData", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    jest.restoreAllMocks();
    global.fetch = originalFetch;
  });

  it("returns parsed JSON on success", async () => {
    const mockPayload = { ok: true, value: 123 };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockPayload),
    } as unknown as Response);

    const data = await fetchHkoData<typeof mockPayload>({
      dataType: "rhrread",
      lang: "en",
    });

    expect(data).toEqual(mockPayload);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("throws tagged 502 error when network request fails", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("network"));

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
    global.fetch = jest.fn().mockResolvedValue({
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
    global.fetch = jest.fn().mockResolvedValue({
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

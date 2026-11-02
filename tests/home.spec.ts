import { expect, test } from "@playwright/test";

const isMobile = (name: string) => name === "mobile";

test.describe("homepage", () => {
  test("renders the hero without horizontal overflow or console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      // Vercel Analytics only exists on Vercel deployments.
      if (msg.type() === "error" && !msg.text().includes("404")) errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(String(err)));

    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Be the first name");
    await expect(page.getByRole("link", { name: "Book a free strategy call" })).toBeVisible();

    // A wide element makes phones zoom the whole page out, so the layout width
    // must match the device width exactly.
    const deviceWidth = page.viewportSize()!.width;
    const layout = await page.evaluate(() => ({
      inner: window.innerWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    expect(layout.inner).toBe(deviceWidth);
    expect(layout.scroll).toBeLessThanOrEqual(deviceWidth);

    // Scroll the whole page so scroll-driven code runs.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 30));
      }
    });
    expect(errors).toEqual([]);
  });

  test("shows no fixed prices", async ({ page }) => {
    await page.goto("/");
    const text = await page.locator("body").innerText();
    expect(text).not.toMatch(/[$€£]\s?\d|\bRs\.?\s?\d|\/\s?project|per month/i);
  });

  test("every in-page link points at a section that exists", async ({ page }) => {
    await page.goto("/");
    const hrefs = await page.$$eval('a[href^="#"]', (as) =>
      [...new Set(as.map((a) => a.getAttribute("href")!))]
    );
    expect(hrefs.length).toBeGreaterThan(4);
    for (const href of hrefs) {
      await expect(page.locator(href), `${href} target`).toHaveCount(1);
    }
  });

  test("navigation reaches the FAQ section", async ({ page }, testInfo) => {
    await page.goto("/");
    if (isMobile(testInfo.project.name)) {
      await page.getByRole("button", { name: "Open menu" }).click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      await dialog.getByRole("link", { name: "FAQ" }).click();
      await expect(dialog).toBeHidden();
    } else {
      await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "FAQ" }).click();
    }
    await expect(page.locator("#faq")).toBeInViewport();
  });

  test("service list switches the detail panel", async ({ page }, testInfo) => {
    test.skip(isMobile(testInfo.project.name), "Mobile uses the accordion instead");
    await page.goto("/");
    const tab = page.getByRole("tab", { name: "Google Business Profile" });
    await tab.click();
    await expect(tab).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("tabpanel")).toContainText("Review request system");
  });

  test("services open one at a time on mobile", async ({ page }, testInfo) => {
    test.skip(!isMobile(testInfo.project.name), "Desktop uses the tab list");
    await page.goto("/");
    const trigger = page.locator("#services").getByRole("button", { name: "UGC video ads" });
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#services").getByText("Hook and script writing")).toBeVisible();
  });

  test("FAQ accordion opens and closes", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Do I own the website?" });
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText("The domain, the design, the code")).toBeVisible();
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("contact form hands the enquiry to WhatsApp", async ({ page, context }) => {
    // Stub WhatsApp so the test doesn't depend on reaching wa.me.
    const waRequests: string[] = [];
    await context.route("https://wa.me/**", (route) => {
      waRequests.push(route.request().url());
      return route.fulfill({ status: 200, body: "ok" });
    });
    await page.goto("/#contact");
    const form = page.locator("#contact form");
    await form.getByLabel("Your name").fill("Ayesha Khan");
    await form.getByLabel("Email").fill("ayesha@example.com");
    const popup = context.waitForEvent("page");
    await form.getByRole("button", { name: "Send enquiry" }).click();
    await (await popup).waitForLoadState();
    expect(waRequests[0]).toContain("923155741347");
    expect(decodeURIComponent(waRequests[0])).toContain("Ayesha Khan");
    await expect(page.getByText("Enquiry sent")).toBeVisible();
  });

  test("industry picker updates the site preview", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#industries");
    const chip = section.getByRole("button", { name: "Home services & trades" });
    await chip.click();
    await expect(chip).toHaveAttribute("aria-pressed", "true");
    await expect(section.getByText("Get a quote")).toBeVisible();
  });

  test("has no dental demo route or links", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('a[href*="demo"]')).toHaveCount(0);
    const res = await page.goto("/demo/dental");
    expect(res?.status()).toBe(404);
  });
  test("hero search keeps animating when reduce motion is on", async ({ browser }, testInfo) => {
    const context = await browser.newContext({
      ...testInfo.project.use,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto("/");
    const query = page.locator("#top [role=img] p").first();
    await expect(query).toHaveText("biryani open now", { timeout: 5000 });
    await expect(query).not.toHaveText("biryani open now", { timeout: 12000 });
    await context.close();
  });

  test("UGC section lets visitors pick an example ad", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#ugc");
    await expect(section.getByRole("heading", { level: 2 })).toContainText("UGC ads");
    const first = section.getByRole("button", { name: /First visit/ });
    await first.click();
    await expect(first).toHaveAttribute("aria-pressed", "true");
  });
});

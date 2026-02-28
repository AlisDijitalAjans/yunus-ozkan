import db from "./db";

export interface SiteSettings {
  companyName: string;
  phone: string;
  phoneRaw: string;
  email: string;
  address: string;
}

const defaults: SiteSettings = {
  companyName: "Yunus Özkan İnşaat",
  phone: "0533 771 11 82",
  phoneRaw: "905337711182",
  email: "info@yunusozkaninsaat.com",
  address: "Kayseri, Türkiye",
};

const keyMap: Record<string, keyof SiteSettings> = {
  company_name: "companyName",
  phone: "phone",
  phone_raw: "phoneRaw",
  email: "email",
  address: "address",
};

export async function getSettings(): Promise<SiteSettings> {
  try {
    const result = await db.execute("SELECT key, value FROM site_settings");
    const settings = { ...defaults };
    for (const row of result.rows) {
      const prop = keyMap[String(row.key)];
      if (prop) {
        (settings as Record<string, string>)[prop] = String(row.value);
      }
    }
    return settings;
  } catch {
    return defaults;
  }
}

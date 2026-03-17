import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const user_id = "valeria";

  if (req.method === "GET") {
    const { data } = await supabase.from("profiles").select("*").eq("user_id", user_id).single();
    return res.status(200).json(data || {});
  }

  if (req.method === "POST") {
    const { name, description, needs, avoid } = req.body;
    const { data, error } = await supabase
      .from("profiles")
      .upsert({ user_id, name, description, needs, avoid, updated_at: new Date().toISOString() })
      .select()
      .single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  res.status(405).json({ error: "Method not allowed" });
}

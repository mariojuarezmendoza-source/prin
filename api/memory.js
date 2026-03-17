import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const user_id = "valeria";

  if (req.method === "GET") {
    const { data } = await supabase
      .from("memories")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });
    return res.status(200).json(data || []);
  }

  if (req.method === "DELETE") {
    await supabase.from("memories").delete().eq("user_id", user_id);
    await supabase.from("conversations").delete().eq("user_id", user_id);
    await supabase.from("profiles").delete().eq("user_id", user_id);
    return res.status(200).json({ ok: true });
  }

  res.status(405).json({ error: "Method not allowed" });
}

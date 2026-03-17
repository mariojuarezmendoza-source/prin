-- Ejecuta esto en el SQL Editor de Supabase

-- Perfil de Valeria
create table if not exists profiles (
  id uuid default gen_random_uuid() primary key,
  user_id text not null unique,
  name text,
  description text,
  needs text[],
  avoid text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Memoria de Prin (lo que recuerda de Valeria)
create table if not exists memories (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  categoria text not null, -- emociones | metas | personas | reflexiones | momentos | rutinas | miedos
  texto text not null,
  created_at timestamptz default now()
);

-- Historial de conversación (últimas ~20 guardadas en backend)
create table if not exists conversations (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  role text not null, -- user | assistant
  content text not null,
  created_at timestamptz default now()
);

-- Índices para velocidad
create index if not exists memories_user_id_idx on memories(user_id);
create index if not exists conversations_user_id_idx on conversations(user_id, created_at desc);

-- Row Level Security desactivado (uso personal, solo tú accedes)
-- Si quieres protegerlo más adelante, actívalo con políticas por user_id

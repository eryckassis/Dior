-- =============================================================================
-- SCRIPT DE INICIALIZAÇÃO DO POSTGRESQL
-- Este script roda automaticamente na primeira vez que o container sobe
-- =============================================================================

-- Criar extensão para UUIDs (usaremos para IDs de produtos/usuários)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar extensão para busca full-text em português
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- Criar extensão para índices trigram (busca fuzzy)
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Log de inicialização
DO $$
BEGIN
  RAISE NOTICE '✅ Banco de dados Dior inicializado com sucesso!';
  RAISE NOTICE '📦 Extensões instaladas: uuid-ossp, unaccent, pg_trgm';
END $$;

@echo off
echo Building knowledge graph for rarestar-site...
echo.
echo This generates:
echo   graphify-out/   - knowledge graph (graph.json, GRAPH_REPORT.md, graph.html)
echo   E:\rarestar-site-vault\ - Obsidian vault with graph links
echo.
echo NOTE: Run this via your AI assistant to use its LLM:
echo   OpenCode:  /graphify . --obsidian --obsidian-dir E:\rarestar-site-vault
echo   Antigravity: /graphify . --obsidian --obsidian-dir E:\rarestar-site-vault
echo   Kiro:        /graphify . --obsidian --obsidian-dir E:\rarestar-site-vault
echo.
echo Or for a quick AST-only update (no API key needed):
python -m graphify update .
echo.
echo Or to export Obsidian vault from existing graph:
python -m graphify export obsidian --dir E:\rarestar-site-vault
echo.
pause

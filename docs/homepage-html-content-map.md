# Homepage HTML Content Map

This map describes the intended semantic structure of the Golden Pocket homepage/workbench. The live HTML also carries matching `data-html-tag`, `data-html-role`, and `data-html-heading` attributes so layout mode can expose the tag logic directly on the page.

| Page Area | HTML Tag | Heading Level | Purpose |
| --- | --- | --- | --- |
| App shell | `div` | None | Top-level visual layout wrapper for toolbar plus dashboard. |
| Global toolbar | `aside` | None | Persistent controls outside the main report flow. |
| Brand and status | `header` | hidden `h1` | Logo, report identity, and market universe status. |
| Market filters | `nav` | None | Sector, industry, ticker, final call, and clear-filter controls. |
| Workspace actions | `nav` | None | Fred link, layout mode, and theme toggle. |
| Dashboard body | `main` | None | Primary report content. |
| Max paper bot | `section` | `h2` | Paper portfolio, equity curve, open positions, and transaction controls. |
| Account portfolio card | `article` | `h3` | Account equity summary plus equity curve chart. |
| Open paper positions | `article` + `table` | `h3` | Current paper bot holdings. |
| Opportunity table | `section` + `table` | `h2` | Filtered ticker list, final call, Max status, and conviction. |
| Max execution chart | `section` | `h2` | Entry zone, stop loss, take profit ladder, and technical overlays. |
| Decision dashboards | `section` | `h2` | Fundamental and Technical decision inputs. |
| Fundamental memo | `article` + `table` | `h3` | John-style fundamental inputs and KPI interpretation. |
| Technical board | `article` + `table` | `h3` | Max-style execution inputs and price levels. |
| Trading decision | `article` | `h3` | Combined output from Fundamental plus Technical. |
| TradingView chart | `section` | `h2` | Full-width external chart widget. |
| Sources | `section` | `h2` | Linked source references. |
| Confirm close trade | `dialog` intent | `h2` | Manual trade close confirmation modal. |
| Transaction history | `dialog` intent + `table` | `h2` | Full paper bot transaction log. |
| Mobile navigation | `nav` | None | Mobile route switcher between Market, Workbench, and Fred. |

Recommended Figma layer naming convention:

`01 Aside - Global Toolbar`, `02 Main - Dashboard`, `03 Section - Max Paper Bot`, `04 Section - Opportunity Table`, `05 Section - Max Execution Chart`, `06 Section - Decision Dashboards`, `07 Section - TradingView Chart`, `08 Section - Sources`.

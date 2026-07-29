// 本文件由 build.js 自动生成,请勿手动编辑 HTML_PAGE 常量。
// 如需修改页面,请编辑 page.html 后重新运行: node build.js

const HTML_PAGE = "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n<title>VPNGate 节点浏览器 · OpenVPN → Mihomo</title>\n<link rel=\"icon\" href=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%230B0F17'/%3E%3Ccircle cx='16' cy='16' r='7' fill='none' stroke='%232DD4BF' stroke-width='2.5'/%3E%3Ccircle cx='16' cy='16' r='2.5' fill='%232DD4BF'/%3E%3C/svg%3E\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin />\n<link href=\"https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap\" rel=\"stylesheet\" />\n<style>\n  :root{\n    --bg:#0B0F17;\n    --surface:#131A26;\n    --surface-2:#1B2434;\n    --surface-hover:#212C40;\n    --border:#263145;\n    --border-soft:#1B2434;\n    --text:#EAF0F7;\n    --text-muted:#8996AC;\n    --text-faint:#5C6A82;\n    --accent:#2DD4BF;\n    --accent-strong:#14B8A6;\n    --accent-soft:rgba(45,212,191,0.14);\n    --danger:#F87171;\n    --danger-soft:rgba(248,113,113,0.12);\n    --warning:#FBBF24;\n    --proto-tcp:#60A5FA;\n    --tier-fast:#4ADE80;\n    --tier-mid:#FBBF24;\n    --tier-warm:#FB923C;\n    --tier-slow:#F87171;\n    --radius:12px;\n    --radius-sm:7px;\n    --favorite-drawer-width:420px;\n    --favorite-table-head-height:61.5px;\n    --font-display:'Space Grotesk','PingFang SC','Microsoft YaHei',sans-serif;\n    --font-body:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif;\n    --font-mono:'JetBrains Mono','SFMono-Regular',Consolas,monospace;\n  }\n  *{box-sizing:border-box;}\n  html{background:var(--bg);}\n  html,body{margin:0;padding:0;}\n  body{\n    background:var(--bg);\n    color:var(--text);\n    font-family:var(--font-body);\n    font-size:14px;\n    line-height:1.5;\n    overflow-x:hidden;\n    min-height:100vh;\n    display:flex;\n    flex-direction:column;\n  }\n  a{color:var(--accent);}\n  ::selection{background:var(--accent-soft);}\n\n  /* ---------- topbar ---------- */\n  .topbar{\n    position:sticky;top:0;z-index:30;\n    display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;\n    padding:16px 24px;\n    background:rgba(11,15,23,0.94);\n    backdrop-filter:blur(10px);\n    border-bottom:1px solid var(--border);\n  }\n  .brand{display:flex;align-items:center;gap:12px;}\n  .brand-mark{width:11px;height:11px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 5px var(--accent-soft);flex-shrink:0;}\n  .brand h1{\n    font-family:var(--font-display);font-size:19px;font-weight:600;letter-spacing:-0.01em;margin:0;\n  }\n  .brand p{margin:2px 0 0;font-size:12px;color:var(--text-muted);}\n  .status-cluster{display:flex;align-items:center;gap:14px;font-family:var(--font-mono);font-size:12px;color:var(--text-muted);}\n  .status-cluster .dot-ok{color:var(--tier-fast);}\n  .status-cluster .dot-bad{color:var(--danger);}\n\n  /* ---------- toolbar ---------- */\n  .toolbar{\n    position:fixed;top:65px;left:0;right:0;z-index:29;width:100%;\n    display:flex;flex-wrap:wrap;gap:10px;align-items:center;\n    padding:12px 24px;background:var(--surface);border-bottom:1px solid var(--border);\n    transition:right .22s ease,width .22s ease;\n  }\n  .toolbar input[type=search],.toolbar select{\n    background:var(--surface-2);border:1px solid var(--border);color:var(--text);\n    padding:8px 12px;border-radius:var(--radius-sm);font-size:13px;font-family:var(--font-body);\n    min-height:34px;\n  }\n  .toolbar input[type=search]{flex:1 1 220px;min-width:160px;}\n  .toolbar select{flex:0 0 auto;}\n  .toolbar input::placeholder{color:var(--text-faint);}\n  .spacer{flex:1;}\n  .toolbar-actions{display:flex;align-items:center;gap:10px;flex-wrap:nowrap;}\n  .count-badge{\n    font-family:var(--font-mono);font-size:12px;color:var(--text-muted);\n    padding:6px 10px;border:1px solid var(--border);border-radius:999px;white-space:nowrap;\n  }\n\n  /* ---------- buttons ---------- */\n  button{font-family:var(--font-body);cursor:pointer;}\n  .btn{\n    background:var(--surface-2);border:1px solid var(--border);color:var(--text);\n    padding:8px 14px;border-radius:var(--radius-sm);font-size:13px;font-weight:500;\n    transition:background .15s,border-color .15s,color .15s;white-space:nowrap;\n  }\n  .btn:hover{background:var(--surface-hover);border-color:var(--accent);}\n  .btn:disabled{opacity:.4;cursor:not-allowed;}\n  .btn:disabled:hover{background:var(--surface-2);border-color:var(--border);}\n  .btn-primary{background:var(--accent);border-color:var(--accent);color:#06201C;font-weight:600;}\n  .btn-primary:hover{background:var(--accent-strong);border-color:var(--accent-strong);}\n  .btn-ghost{background:transparent;}\n  .btn-sm{padding:5px 10px;font-size:12px;}\n  button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{\n    outline:2px solid var(--accent);outline-offset:2px;\n  }\n  .icon-btn{\n    background:transparent;border:none;color:var(--text-muted);font-size:20px;line-height:1;\n    padding:4px 8px;border-radius:6px;\n  }\n  .icon-btn:hover{color:var(--text);background:var(--surface-2);}\n\n  /* ---------- main / list ---------- */\n  main{padding:117px 0 12px;max-width:1280px;margin:0 auto;width:100%;flex:1 0 auto;transition:width .22s ease,margin .22s ease;}\n  .banner{\n    margin:16px 24px;padding:12px 16px;border-radius:var(--radius-sm);\n    background:var(--danger-soft);border:1px solid rgba(248,113,113,.35);color:#FFD9D9;font-size:13px;\n  }\n  .empty{margin:60px 24px;text-align:center;color:var(--text-muted);font-size:14px;}\n  .loading-row{margin:24px;color:var(--text-muted);font-family:var(--font-mono);font-size:13px;}\n\n  .table-scroll{\n    overflow-x:auto;\n    width:100vw;\n    margin-left:calc(50% - 50vw);\n    margin-right:calc(50% - 50vw);\n    -webkit-overflow-scrolling:touch;\n    transition:width .22s ease,margin .22s ease;\n  }\n  .table-scroll::-webkit-scrollbar{height:8px;}\n  .table-scroll::-webkit-scrollbar-thumb{background:var(--border);border-radius:4px;}\n  .table-scroll::-webkit-scrollbar-track{background:transparent;}\n\n  .table-head-fixed{\n    position:fixed;left:0;right:0;top:117px;z-index:28;\n    overflow:hidden;background:var(--surface);border-bottom:1px solid var(--border);\n    transition:right .22s ease;\n  }\n\n  .row{\n    display:grid;\n    grid-template-columns:\n      minmax(28px,0fr) minmax(58px,0fr) minmax(150px,1.4fr) minmax(100px,0fr)\n      minmax(70px,0fr) minmax(120px,0.6fr) minmax(65px,0fr) minmax(110px,0fr)\n      minmax(100px,0fr) minmax(85px,0fr) minmax(240px,2fr) minmax(200px,1.8fr)\n      minmax(70px,0fr) minmax(220px,0fr);\n    align-items:center;gap:0;\n    padding:11px 24px;border-bottom:1px solid var(--border-soft);\n  }\n  .row-head{\n    font-family:var(--font-mono);font-size:10.5px;text-transform:uppercase;letter-spacing:.06em;\n    color:var(--text-faint);background:var(--surface);border-bottom:none;\n  }\n  .row-head .cell{cursor:default;}\n  .row-body:hover{background:var(--surface-2);}\n  .cell{padding:3px 8px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0;}\n  .cell-country{display:flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:12.5px;}\n  .cell-host{display:flex;flex-direction:column;gap:2px;min-width:0;}\n  .cell-host .ip{font-family:var(--font-mono);font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;}\n  .cell-host .hostname{font-size:11px;color:var(--text-faint);overflow:hidden;text-overflow:ellipsis;}\n  .cell-ping{font-family:var(--font-mono);font-size:13px;display:flex;align-items:center;}\n  .cell-score{font-family:var(--font-mono);font-size:12.5px;color:var(--text-muted);}\n  .cell-sessions,.cell-uptime,.cell-users,.cell-traffic{font-family:var(--font-mono);font-size:12px;color:var(--text-muted);}\n  .cell-operator{font-size:12px;color:var(--text-muted);}\n  .cell-message{font-size:12px;color:var(--text-muted);}\n  .cell-protocol{display:flex;align-items:center;}\n  .cell-actions{display:flex;justify-content:flex-end;align-items:center;gap:6px;}\n\n  .proto-badge{\n    font-family:var(--font-mono);font-size:10px;font-weight:700;\n    padding:3px 6px;border-radius:5px;letter-spacing:.03em;flex-shrink:0;\n    border:1px solid var(--border);color:var(--text-muted);background:var(--surface-2);\n  }\n  .proto-badge.proto-udp{color:var(--warning);border-color:rgba(251,191,36,.4);background:rgba(251,191,36,.12);}\n  .proto-badge.proto-tcp{color:var(--proto-tcp);border-color:rgba(96,165,250,.4);background:rgba(96,165,250,.12);}\n\n  .tier-badge{\n    font-family:var(--font-mono);font-size:11.5px;font-weight:600;\n    padding:2px 7px;border-radius:5px;display:inline-block;border:1px solid currentColor;\n  }\n  .tier-badge.fast{color:var(--tier-fast);background:rgba(74,222,128,.12);}\n  .tier-badge.mid{color:var(--tier-mid);background:rgba(251,191,36,.12);}\n  .tier-badge.warm{color:var(--tier-warm);background:rgba(251,146,60,.12);}\n  .tier-badge.slow{color:var(--tier-slow);background:rgba(248,113,113,.12);}\n\n  .ping-dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:7px;flex-shrink:0;}\n  .ping-dot.fast{background:var(--tier-fast);box-shadow:0 0 7px rgba(74,222,128,.7);}\n  .ping-dot.mid{background:var(--tier-mid);box-shadow:0 0 7px rgba(251,191,36,.6);}\n  .ping-dot.warm{background:var(--tier-warm);box-shadow:0 0 7px rgba(251,146,60,.6);}\n  .ping-dot.slow{background:var(--tier-slow);box-shadow:0 0 7px rgba(248,113,113,.6);}\n\n  .speed-wrap{display:flex;flex-direction:column;gap:4px;width:100%;}\n  .speed-label{font-family:var(--font-mono);font-size:12.5px;}\n  .speed-track{display:block;width:100%;height:5px;background:var(--surface-2);border-radius:3px;overflow:hidden;}\n  .speed-fill{display:block;height:100%;background:linear-gradient(90deg,var(--accent-strong),var(--accent));border-radius:3px;}\n\n  input[type=checkbox]{\n    width:16px;height:16px;accent-color:var(--accent);cursor:pointer;\n  }\n\n  /* ---------- responsive card mode ---------- */\n  @media (max-width:900px){\n    .table-scroll{width:auto;margin-left:0;margin-right:0;}\n    .table-head-fixed{display:none;}\n    .row-body{\n      display:block;margin:12px 16px;padding:14px 16px;\n      border:1px solid var(--border);border-radius:var(--radius);\n    }\n    .row-body .cell{\n      display:flex;justify-content:space-between;align-items:center;gap:12px;\n      white-space:normal;padding:7px 0;border-bottom:1px dashed var(--border-soft);\n    }\n    .row-body .cell:last-child{border-bottom:none;}\n    .row-body .cell::before{\n      content:attr(data-label);font-family:var(--font-mono);font-size:10.5px;color:var(--text-faint);\n      text-transform:uppercase;letter-spacing:.05em;flex-shrink:0;\n    }\n    .cell-checkbox::before,.cell-actions::before{content:'';}\n    .cell-actions{justify-content:flex-end;gap:8px;}\n    .cell-host{align-items:flex-end;text-align:right;}\n    .cell-sessions,.cell-uptime,.cell-users,.cell-traffic{text-align:right;}\n    .speed-wrap{align-items:flex-end;}\n  }\n  @media (max-width:480px){\n    .modal-overlay{padding:10px;}\n    .modal-header,.modal-tabs,.modal-body{padding-left:14px;padding-right:14px;}\n    .toolbar-actions{width:100%;flex-wrap:wrap;}\n    .toolbar-actions .btn{flex:1;}\n  }\n\n  /* ---------- modal ---------- */\n  .modal-overlay{\n    position:fixed;inset:0;background:rgba(5,8,14,.74);backdrop-filter:blur(3px);\n    display:flex;align-items:center;justify-content:center;z-index:100;padding:20px;\n  }\n  .modal-overlay[hidden]{display:none;}\n  .modal{\n    background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);\n    width:min(780px,100%);max-height:88vh;display:flex;flex-direction:column;overflow:hidden;\n    box-shadow:0 24px 70px rgba(0,0,0,.55);\n  }\n  .modal-header{\n    display:flex;justify-content:space-between;align-items:flex-start;gap:12px;\n    padding:16px 20px;border-bottom:1px solid var(--border);\n  }\n  .modal-header h2{font-family:var(--font-display);font-size:16px;margin:0;font-weight:600;}\n  .modal-header .sub{font-size:12px;color:var(--text-muted);margin-top:3px;font-family:var(--font-mono);}\n  .modal-tabs{display:flex;gap:4px;padding:12px 20px 0;}\n  .tab{background:none;border:none;color:var(--text-muted);padding:8px 14px;border-radius:7px 7px 0 0;font-size:13px;font-weight:500;}\n  .tab.active{color:var(--text);background:var(--bg);}\n  .modal-body{padding:16px 20px 20px;overflow-y:auto;flex:1;}\n  .tab-panel{display:none;}\n  .tab-panel.active{display:block;}\n  .panel-actions{display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap;}\n  textarea{\n    width:100%;min-height:380px;background:var(--bg);color:var(--text);\n    border:1px solid var(--border);border-radius:var(--radius-sm);padding:12px;\n    font-family:var(--font-mono);font-size:12.5px;line-height:1.6;resize:vertical;\n  }\n  .warnings{\n    background:rgba(251,191,36,.08);border:1px solid rgba(251,191,36,.3);color:#FDE4A6;\n    padding:10px 12px;border-radius:var(--radius-sm);font-size:12.5px;margin-bottom:10px;\n  }\n  .warnings[hidden]{display:none;}\n  .warnings ul{margin:4px 0 0;padding-left:18px;}\n\n  /* ---------- subscription favorites ---------- */\n  .favorite-list{display:flex;flex-direction:column;gap:10px;}\n  .favorite-choice{\n    width:100%;display:flex;justify-content:space-between;align-items:center;gap:12px;\n    padding:12px 14px;text-align:left;\n  }\n  .favorite-choice strong{display:block;}\n  .favorite-choice small{color:var(--text-muted);font-family:var(--font-mono);}\n  .storage-message{padding:14px;border:1px solid rgba(251,191,36,.3);background:rgba(251,191,36,.08);color:#FDE4A6;border-radius:var(--radius-sm);}\n\n  /* ---------- favorite drawer ---------- */\n  .favorite-drawer{\n    position:fixed;top:var(--favorite-drawer-top,117px);right:0;bottom:var(--favorite-drawer-bottom,0px);z-index:45;\n    width:min(var(--favorite-drawer-width),100vw);display:flex;flex-direction:column;\n    background:var(--surface);border-left:1px solid var(--border);\n    box-shadow:-10px 0 28px rgba(0,0,0,.24);\n    transform:translateX(100%);visibility:hidden;\n    transition:transform .22s ease,visibility .22s,bottom .12s ease-out;\n  }\n  .favorite-drawer.open{transform:translateX(0);visibility:visible;}\n  .drawer-header{\n    height:var(--favorite-table-head-height);min-height:var(--favorite-table-head-height);\n    display:flex;align-items:center;justify-content:space-between;gap:12px;\n    padding:0 18px;border-bottom:1px solid var(--border);flex-shrink:0;\n  }\n  .drawer-header h2{font-family:var(--font-display);font-size:17px;margin:0;font-weight:600;}\n  .drawer-controls{padding:14px 18px;border-bottom:1px solid var(--border);flex-shrink:0;}\n  .drawer-switch-row{display:flex;gap:8px;align-items:center;}\n  .drawer-switch-row select{\n    min-width:0;flex:1;background:var(--surface-2);border:1px solid var(--border);color:var(--text);\n    padding:8px 10px;border-radius:var(--radius-sm);font-size:13px;min-height:36px;\n  }\n  .drawer-icon-actions{display:flex;gap:4px;align-items:center;flex-shrink:0;}\n  .drawer-icon-btn{\n    width:32px;height:32px;display:inline-flex;align-items:center;justify-content:center;\n    padding:0;border:1px solid var(--border);border-radius:7px;background:var(--surface-2);\n    color:var(--text-muted);cursor:pointer;transition:color .15s,border-color .15s,background .15s;\n  }\n  .drawer-icon-btn:hover:not(:disabled){color:var(--text);border-color:var(--text-faint);background:var(--surface-hover);}\n  .drawer-icon-btn:disabled{opacity:.35;cursor:not-allowed;}\n  .drawer-icon-btn svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;}\n  .drawer-icon-btn.primary{color:var(--accent);border-color:rgba(51,209,122,.35);}\n  .drawer-icon-btn.danger:hover:not(:disabled){color:#fb7185;border-color:rgba(251,113,133,.45);}\n  .drawer-url-row{display:block;margin-top:10px;line-height:1.45;}\n  .drawer-url{\n    display:inline;min-width:0;color:var(--accent);font-family:var(--font-mono);font-size:10.5px;\n    white-space:normal;overflow-wrap:anywhere;word-break:break-all;\n  }\n  .drawer-copy-icon{\n    width:20px;height:20px;display:inline-flex;align-items:center;justify-content:center;\n    margin-left:3px;padding:0;border:0;background:transparent;color:var(--text-muted);\n    cursor:pointer;border-radius:4px;vertical-align:text-bottom;\n  }\n  .drawer-copy-icon:hover:not(:disabled){color:var(--accent);background:transparent;}\n  .drawer-copy-icon:disabled{opacity:.35;cursor:not-allowed;}\n  .drawer-copy-icon svg{width:13px;height:13px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;}\n  .drawer-editor{\n    margin-top:12px;padding:12px;border:1px solid var(--border);border-radius:var(--radius-sm);\n    background:var(--bg);\n  }\n  .drawer-editor[hidden]{display:none;}\n  .drawer-editor-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px;}\n  .drawer-editor-title{font-size:12px;font-weight:600;color:var(--text);}\n  .drawer-editor-actions{display:flex;gap:5px;}\n  .drawer-editor-fields{display:grid;grid-template-columns:1fr 1fr;gap:8px;}\n  .drawer-editor-field{display:flex;flex-direction:column;gap:5px;min-width:0;}\n  .drawer-editor-field label{font-size:10.5px;color:var(--text-muted);font-family:var(--font-mono);}\n  .drawer-editor-field input{\n    width:100%;min-width:0;min-height:34px;padding:7px 9px;border:1px solid var(--border);\n    border-radius:var(--radius-sm);background:var(--surface-2);color:var(--text);font-size:12px;\n  }\n  .drawer-editor-preview{\n    margin-top:8px;color:var(--text-faint);font-family:var(--font-mono);font-size:9.5px;\n    white-space:normal;overflow-wrap:anywhere;word-break:break-all;\n  }\n  .drawer-batchbar{\n    display:flex;align-items:center;gap:8px;flex-wrap:wrap;\n    padding:10px 18px;border-bottom:1px solid var(--border);background:var(--bg);flex-shrink:0;\n  }\n  .drawer-select-all{display:flex;align-items:center;gap:7px;margin-right:auto;color:var(--text-muted);font-size:12px;}\n  .drawer-node-list{overflow-y:auto;flex:1;padding:8px 10px 18px;}\n  .drawer-node{\n    display:grid;grid-template-columns:22px minmax(0,1fr) auto;align-items:center;gap:9px;\n    padding:11px 8px;border-bottom:1px solid var(--border-soft);border-radius:6px;\n  }\n  .drawer-node:hover{background:var(--surface-2);}\n  .drawer-node-main{display:block;min-width:0;}\n  .drawer-node-ip{display:block;font-family:var(--font-mono);font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}\n  .drawer-node-meta{display:block;font-size:10.5px;color:var(--text-faint);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px;}\n  .drawer-node-country{font-size:11px;color:var(--text-muted);font-family:var(--font-mono);}\n  .drawer-empty{padding:48px 24px;text-align:center;color:var(--text-muted);}\n  .drawer-empty strong{display:block;color:var(--text);font-size:14px;margin-bottom:5px;}\n  .drawer-storage-error{margin:14px 18px;}\n  @media (min-width:1101px){\n    body.favorite-drawer-open .toolbar{\n      right:var(--favorite-drawer-width);\n      width:calc(100% - var(--favorite-drawer-width));\n    }\n    body.favorite-drawer-open .table-head-fixed{right:var(--favorite-drawer-width);}\n    body.favorite-drawer-open main{\n      width:calc(100% - var(--favorite-drawer-width));\n      max-width:none;margin-left:0;margin-right:var(--favorite-drawer-width);\n    }\n    body.favorite-drawer-open .table-scroll{\n      width:calc(100vw - var(--favorite-drawer-width));\n      margin-left:0;margin-right:0;\n    }\n  }\n  @media (max-width:700px){\n    .favorite-drawer{top:0;width:100vw;}\n    .drawer-editor-fields{grid-template-columns:1fr;}\n  }\n\n  /* ---------- access gate ---------- */\n  body.auth-locked{overflow:hidden;}\n  .auth-gate{\n    position:fixed;inset:0;z-index:500;display:flex;align-items:center;justify-content:center;\n    padding:24px;background:rgba(7,10,16,.96);backdrop-filter:blur(12px);\n  }\n  .auth-gate[hidden]{display:none;}\n  .auth-card{\n    width:min(420px,100%);padding:28px;border:1px solid var(--border);border-radius:var(--radius);\n    background:var(--surface);box-shadow:0 24px 70px rgba(0,0,0,.55);\n  }\n  .auth-mark{\n    width:12px;height:12px;margin-bottom:18px;border-radius:50%;background:var(--accent);\n    box-shadow:0 0 0 6px var(--accent-soft);\n  }\n  .auth-card h2{margin:0;font-family:var(--font-display);font-size:20px;font-weight:600;}\n  .auth-card p{margin:7px 0 20px;color:var(--text-muted);font-size:12px;line-height:1.65;}\n  .auth-form{display:flex;flex-direction:column;gap:10px;}\n  .auth-form label{font-family:var(--font-mono);font-size:11px;color:var(--text-muted);}\n  .auth-form input{\n    width:100%;min-height:42px;padding:9px 11px;border:1px solid var(--border);\n    border-radius:var(--radius-sm);background:var(--bg);color:var(--text);font-family:var(--font-mono);\n  }\n  .auth-error{margin:0!important;color:#fda4af!important;font-size:11px!important;}\n  .auth-error[hidden]{display:none;}\n\n  /* ---------- footer / toast ---------- */\n  .footer{\n    max-width:1280px;margin:0 auto;padding:16px 24px;color:var(--text-faint);font-size:12px;\n    border-top:1px solid var(--border-soft);width:100%;flex-shrink:0;\n    transition:width .22s ease,margin .22s ease;\n  }\n  .toast-container{position:fixed;bottom:20px;right:20px;display:flex;flex-direction:column;gap:8px;z-index:200;max-width:320px;}\n  .toast{\n    background:var(--surface-2);border:1px solid var(--border);color:var(--text);\n    padding:10px 16px;border-radius:var(--radius-sm);font-size:13px;\n    opacity:0;transform:translateY(8px);transition:opacity .25s ease,transform .25s ease;\n    box-shadow:0 8px 26px rgba(0,0,0,.4);\n  }\n  .toast.show{opacity:1;transform:translateY(0);}\n  .toast-success{border-left:3px solid var(--accent);}\n  .toast-error{border-left:3px solid var(--danger);}\n\n  @media (prefers-reduced-motion:reduce){\n    *{animation:none!important;transition:none!important;}\n  }\n</style>\n</head>\n<body class=\"auth-locked\">\n\n<div class=\"auth-gate\" id=\"authGate\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"authTitle\">\n  <form class=\"auth-card auth-form\" id=\"authForm\">\n    <span class=\"auth-mark\"></span>\n    <div>\n      <h2 id=\"authTitle\">访问验证</h2>\n      <p>请输入部署时设置的访问密码，验证通过后才能加载 VPNGate 节点和订阅收藏夹。</p>\n    </div>\n    <label for=\"authTokenInput\">访问密码</label>\n    <input id=\"authTokenInput\" type=\"password\" autocomplete=\"current-password\" spellcheck=\"false\" placeholder=\"输入 ADMIN_TOKEN\" required />\n    <p class=\"auth-error\" id=\"authError\" role=\"alert\" hidden></p>\n    <button class=\"btn btn-primary\" id=\"authSubmitBtn\" type=\"submit\">进入</button>\n  </form>\n</div>\n\n<header class=\"topbar\">\n  <div class=\"brand\">\n    <span class=\"brand-mark\"></span>\n    <div>\n      <h1>VPNGate 节点浏览器</h1>\n      <p>OpenVPN 节点列表 · 一键转换为 Mihomo 配置段</p>\n    </div>\n  </div>\n  <div class=\"status-cluster\">\n    <span id=\"statusText\">等待访问验证…</span>\n    <button id=\"refreshBtn\" class=\"btn btn-sm\">↻ 刷新</button>\n  </div>\n</header>\n\n<div class=\"toolbar\">\n  <input type=\"search\" id=\"searchInput\" placeholder=\"搜索 主机名 / IP / 国家 / 运营者…\" />\n  <select id=\"countrySelect\"><option value=\"\">全部国家</option></select>\n  <select id=\"sortSelect\">\n    <option value=\"score-desc\">综合评分 · 从高到低</option>\n    <option value=\"ping-asc\">延迟 Ping · 从低到高</option>\n    <option value=\"speed-desc\">速度 · 从高到低</option>\n    <option value=\"numSessions-desc\">在线人数 · 从多到少</option>\n    <option value=\"uptime-desc\">运行时长 · 从长到短</option>\n  </select>\n  <span class=\"spacer\"></span>\n  <span class=\"count-badge\" id=\"countBadge\">0 个节点</span>\n  <span class=\"toolbar-actions\">\n    <button id=\"bulkExportBtn\" class=\"btn\" disabled>批量导出 Mihomo (0)</button>\n    <button id=\"bulkAddFavoriteBtn\" class=\"btn\" disabled>加入收藏夹 (0)</button>\n    <button id=\"favoriteManagerBtn\" class=\"btn\">收藏夹 ›</button>\n  </span>\n</div>\n\n<div class=\"table-head-fixed\" id=\"tableHeadFixed\">\n  <div class=\"row row-head\" id=\"listHead\" hidden>\n    <span class=\"cell cell-checkbox\"><input type=\"checkbox\" id=\"selectAllCheckbox\" title=\"全选当前筛选结果\" /></span>\n    <span class=\"cell\">国家</span>\n    <span class=\"cell\">主机 / IP</span>\n    <span class=\"cell\">评分</span>\n    <span class=\"cell\">Ping</span>\n    <span class=\"cell\">速度</span>\n    <span class=\"cell\">在线会话</span>\n    <span class=\"cell\">运行时间</span>\n    <span class=\"cell\">累积用户数</span>\n    <span class=\"cell\">累积流量</span>\n    <span class=\"cell\">运营者</span>\n    <span class=\"cell\">说明</span>\n    <span class=\"cell\">协议</span>\n    <span class=\"cell cell-actions\">操作</span>\n  </div>\n</div>\n\n<main>\n  <div id=\"banner\" class=\"banner\" hidden></div>\n  <div id=\"loadingRow\" class=\"loading-row\">正在获取节点列表…</div>\n\n  <div class=\"table-scroll\" id=\"tableScroll\">\n    <div id=\"list\"></div>\n  </div>\n  <div id=\"emptyState\" class=\"empty\" hidden>没有匹配的节点,试试调整搜索或筛选条件。</div>\n</main>\n\n<footer class=\"footer\">\n  数据来源 <a href=\"https://www.vpngate.net\" target=\"_blank\" rel=\"noopener\">vpngate.net</a>(筑波大学 VPN Gate 学术实验项目,请遵守当地法律法规使用)\n  · Mihomo OpenVPN 字段参考 <a href=\"https://wiki.metacubex.one/config/proxies/openvpn/\" target=\"_blank\" rel=\"noopener\">wiki.metacubex.one</a>\n  · 本工具与上述项目均无官方关联,仅为第三方转换/浏览界面\n</footer>\n\n<!-- 页面右侧收藏夹抽屉 -->\n<aside class=\"favorite-drawer\" id=\"favoriteDrawer\" aria-hidden=\"true\">\n  <div class=\"drawer-header\">\n    <h2>订阅收藏夹</h2>\n    <button class=\"icon-btn\" id=\"favoriteDrawerClose\" aria-label=\"收起收藏夹\">×</button>\n  </div>\n  <div class=\"drawer-controls\">\n    <div class=\"drawer-switch-row\">\n      <select id=\"favoriteDrawerSelect\" aria-label=\"当前收藏夹\"></select>\n      <div class=\"drawer-icon-actions\" aria-label=\"收藏夹操作\">\n        <button class=\"drawer-icon-btn primary\" id=\"favoriteDrawerAddBtn\" title=\"新建收藏夹\" aria-label=\"新建收藏夹\">\n          <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 5v14M5 12h14\"/></svg>\n        </button>\n        <button class=\"drawer-icon-btn\" id=\"favoriteDrawerEditBtn\" title=\"编辑当前收藏夹\" aria-label=\"编辑当前收藏夹\">\n          <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M13.5 6.5l4 4M5 19l3.7-.8L18.5 8.4a1.5 1.5 0 0 0 0-2.1l-.8-.8a1.5 1.5 0 0 0-2.1 0L5.8 15.3 5 19z\"/></svg>\n        </button>\n        <button class=\"drawer-icon-btn danger\" id=\"favoriteDrawerDeleteBtn\" title=\"删除当前收藏夹\" aria-label=\"删除当前收藏夹\">\n          <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12h14\"/></svg>\n        </button>\n      </div>\n    </div>\n    <div class=\"drawer-url-row\">\n      <span class=\"drawer-url\" id=\"favoriteDrawerUrl\">尚未创建收藏夹</span>\n      <button class=\"drawer-copy-icon\" id=\"favoriteDrawerCopyBtn\" title=\"复制订阅地址\" aria-label=\"复制订阅地址\" disabled>\n        <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><rect x=\"8\" y=\"8\" width=\"11\" height=\"11\" rx=\"2\"/><path d=\"M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2\"/></svg>\n      </button>\n    </div>\n    <form class=\"drawer-editor\" id=\"favoriteDrawerForm\" hidden>\n      <div class=\"drawer-editor-head\">\n        <span class=\"drawer-editor-title\" id=\"favoriteDrawerEditorTitle\">新建收藏夹</span>\n        <div class=\"drawer-editor-actions\">\n          <button type=\"button\" class=\"drawer-icon-btn\" id=\"favoriteDrawerEditorCancelBtn\" title=\"取消\" aria-label=\"取消\">\n            <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M6 6l12 12M18 6L6 18\"/></svg>\n          </button>\n          <button type=\"submit\" class=\"drawer-icon-btn primary\" id=\"favoriteDrawerEditorSaveBtn\" title=\"保存\" aria-label=\"保存\">\n            <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12.5l4.2 4.2L19 7\"/></svg>\n          </button>\n        </div>\n      </div>\n      <div class=\"drawer-editor-fields\">\n        <div class=\"drawer-editor-field\">\n          <label for=\"favoriteDrawerNameInput\">收藏夹名称</label>\n          <input id=\"favoriteDrawerNameInput\" maxlength=\"60\" placeholder=\"日本高速节点\" required />\n        </div>\n        <div class=\"drawer-editor-field\">\n          <label for=\"favoriteDrawerSlugInput\">订阅地址后缀</label>\n          <input id=\"favoriteDrawerSlugInput\" maxlength=\"64\" pattern=\"[A-Za-z0-9][A-Za-z0-9_\\-]{0,63}\" placeholder=\"japan-fast\" required />\n        </div>\n      </div>\n      <div class=\"drawer-editor-preview\" id=\"favoriteDrawerUrlPreview\"></div>\n    </form>\n  </div>\n  <div id=\"favoriteDrawerError\" class=\"storage-message drawer-storage-error\" hidden></div>\n  <div class=\"drawer-batchbar\" id=\"favoriteDrawerBatchbar\">\n    <label class=\"drawer-select-all\">\n      <input type=\"checkbox\" id=\"favoriteDrawerSelectAll\" />\n      <span id=\"favoriteDrawerSelectionText\">全选</span>\n    </label>\n    <button class=\"btn btn-sm\" id=\"favoriteDrawerRemoveBtn\" disabled>移除选中</button>\n    <button class=\"btn btn-sm\" id=\"favoriteDrawerClearBtn\" disabled>清空</button>\n  </div>\n  <div class=\"drawer-node-list\" id=\"favoriteDrawerNodes\"></div>\n</aside>\n\n<!-- 单节点详情弹窗 -->\n<div class=\"modal-overlay\" id=\"modalOverlay\" hidden>\n  <div class=\"modal\">\n    <div class=\"modal-header\">\n      <div>\n        <h2 id=\"modalTitle\">节点详情</h2>\n        <div class=\"sub\" id=\"modalSub\"></div>\n      </div>\n      <button class=\"icon-btn\" id=\"modalClose\" aria-label=\"关闭\">×</button>\n    </div>\n    <div class=\"modal-tabs\">\n      <button class=\"tab active\" data-tab=\"ovpn\">OpenVPN 配置</button>\n      <button class=\"tab\" data-tab=\"mihomo\">Mihomo 配置段</button>\n    </div>\n    <div class=\"modal-body\">\n      <div class=\"tab-panel active\" id=\"tabOvpn\">\n        <div class=\"panel-actions\">\n          <button class=\"btn btn-primary btn-sm\" id=\"copyOvpnBtn\">复制到剪贴板</button>\n          <button class=\"btn btn-sm\" id=\"downloadOvpnBtn\">下载 .ovpn</button>\n        </div>\n        <textarea id=\"ovpnText\" readonly spellcheck=\"false\"></textarea>\n      </div>\n      <div class=\"tab-panel\" id=\"tabMihomo\">\n        <div class=\"warnings\" id=\"mihomoWarnings\" hidden></div>\n        <div class=\"panel-actions\">\n          <button class=\"btn btn-primary btn-sm\" id=\"copyMihomoBtn\">复制到剪贴板</button>\n          <button class=\"btn btn-sm\" id=\"downloadMihomoBtn\">下载 .yaml</button>\n        </div>\n        <textarea id=\"mihomoText\" spellcheck=\"false\"></textarea>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- 批量导出弹窗 -->\n<div class=\"modal-overlay\" id=\"bulkModalOverlay\" hidden>\n  <div class=\"modal\">\n    <div class=\"modal-header\">\n      <div>\n        <h2>批量导出 Mihomo 配置</h2>\n        <div class=\"sub\" id=\"bulkSub\"></div>\n      </div>\n      <button class=\"icon-btn\" id=\"bulkModalClose\" aria-label=\"关闭\">×</button>\n    </div>\n    <div class=\"modal-body\">\n      <div class=\"warnings\" id=\"bulkWarnings\" hidden></div>\n      <div class=\"panel-actions\">\n        <button class=\"btn btn-primary btn-sm\" id=\"copyBulkBtn\">复制到剪贴板</button>\n        <button class=\"btn btn-sm\" id=\"downloadBulkBtn\">下载 .yaml</button>\n      </div>\n      <textarea id=\"bulkText\" spellcheck=\"false\"></textarea>\n    </div>\n  </div>\n</div>\n\n<!-- 选择要加入的收藏夹 -->\n<div class=\"modal-overlay\" id=\"favoritePickerOverlay\" hidden>\n  <div class=\"modal\">\n    <div class=\"modal-header\">\n      <div>\n        <h2>加入订阅收藏夹</h2>\n        <div class=\"sub\" id=\"favoritePickerSub\"></div>\n      </div>\n      <button class=\"icon-btn\" id=\"favoritePickerClose\" aria-label=\"关闭\">×</button>\n    </div>\n    <div class=\"modal-body\">\n      <div id=\"favoritePickerList\" class=\"favorite-list\"></div>\n    </div>\n  </div>\n</div>\n\n<div class=\"toast-container\" id=\"toastContainer\"></div>\n\n<script>\n(function () {\n  'use strict';\n\n  // ==================== 工具函数 ====================\n  function escapeHtml(str) {\n    if (str === null || str === undefined) return '';\n    return String(str)\n      .replace(/&/g, '&amp;')\n      .replace(/</g, '&lt;')\n      .replace(/>/g, '&gt;')\n      .replace(/\"/g, '&quot;')\n      .replace(/'/g, '&#39;');\n  }\n\n  function flagEmoji(code) {\n    if (!code) return '🌐';\n    const cc = String(code).toUpperCase();\n    if (!/^[A-Z]{2}$/.test(cc)) return '🌐';\n    const points = Array.from(cc).map((c) => 127397 + c.charCodeAt(0));\n    return String.fromCodePoint.apply(String, points);\n  }\n\n  function formatSpeed(bps) {\n    const mbps = bps / 1e6;\n    if (mbps >= 100) return mbps.toFixed(0) + ' Mbps';\n    return mbps.toFixed(1) + ' Mbps';\n  }\n\n  function formatBytes(bytes) {\n    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];\n    let v = Number(bytes) || 0;\n    let i = 0;\n    while (v >= 1024 && i < units.length - 1) {\n      v /= 1024;\n      i++;\n    }\n    return (v >= 100 ? v.toFixed(0) : v.toFixed(1)) + ' ' + units[i];\n  }\n\n  function formatDuration(ms) {\n    const totalMinutes = Math.floor((Number(ms) || 0) / 60000);\n    const days = Math.floor(totalMinutes / 1440);\n    const hours = Math.floor((totalMinutes % 1440) / 60);\n    const minutes = totalMinutes % 60;\n    if (days > 0) return days + ' 天 ' + hours + ' 小时';\n    if (hours > 0) return hours + ' 小时 ' + minutes + ' 分钟';\n    return minutes + ' 分钟';\n  }\n\n  function formatNumber(n) {\n    return Number(n || 0).toLocaleString('zh-CN');\n  }\n\n  function tierOf(v) {\n    const n = Number(v) || 0;\n    if (n < 50) return 'fast';\n    if (n < 100) return 'mid';\n    if (n < 150) return 'warm';\n    return 'slow';\n  }\n\n  function keyOf(server) {\n    return server.hostName + '|' + server.ip;\n  }\n\n  function safeDecodeBase64(b64) {\n    try {\n      const cleaned = String(b64 || '').replace(/\\s+/g, '');\n      const binary = atob(cleaned);\n      const bytes = new Uint8Array(binary.length);\n      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);\n      return new TextDecoder('utf-8').decode(bytes);\n    } catch (err) {\n      return '# 无法解码该节点的配置数据: ' + err.message;\n    }\n  }\n\n  // ==================== OpenVPN 配置解析 ====================\n  function parseOvpnConfig(raw) {\n    const lines = raw.split(/\\r\\n|\\r|\\n/);\n    const result = {\n      remoteHost: null, remotePort: null, proto: null,\n      cipher: null, auth: null, compLzo: null, dev: null,\n      ca: null, cert: null, key: null, tlsCrypt: null, tlsAuth: null,\n      keyDirection: null, authUserPass: false, mtu: null,\n      ping: null, pingRestart: null,\n    };\n\n    let block = null;\n    let blockLines = [];\n    const blockTagMap = {\n      '<ca>': 'ca', '</ca>': 'ca',\n      '<cert>': 'cert', '</cert>': 'cert',\n      '<key>': 'key', '</key>': 'key',\n      '<tls-crypt>': 'tlsCrypt', '</tls-crypt>': 'tlsCrypt',\n      '<tls-auth>': 'tlsAuth', '</tls-auth>': 'tlsAuth',\n    };\n\n    for (const rawLine of lines) {\n      const trimmed = rawLine.trim();\n\n      if (Object.prototype.hasOwnProperty.call(blockTagMap, trimmed)) {\n        const isClose = trimmed.indexOf('</') === 0;\n        const key = blockTagMap[trimmed];\n        if (!isClose) {\n          block = key;\n          blockLines = [];\n        } else {\n          result[key] = blockLines.join('\\n').trim();\n          block = null;\n        }\n        continue;\n      }\n\n      if (block) {\n        blockLines.push(rawLine.replace(/\\r$/, ''));\n        continue;\n      }\n\n      if (!trimmed || trimmed.charAt(0) === '#' || trimmed.charAt(0) === ';') continue;\n\n      const spaceIdx = trimmed.indexOf(' ');\n      const directive = (spaceIdx === -1 ? trimmed : trimmed.slice(0, spaceIdx)).toLowerCase();\n      const args = spaceIdx === -1 ? '' : trimmed.slice(spaceIdx + 1).trim();\n\n      switch (directive) {\n        case 'remote': {\n          const p = args.split(/\\s+/);\n          result.remoteHost = p[0];\n          if (p[1]) result.remotePort = p[1];\n          break;\n        }\n        case 'proto': {\n          const p = args.toLowerCase();\n          if (p.indexOf('tcp') === 0) result.proto = 'tcp';\n          else if (p.indexOf('udp') === 0) result.proto = 'udp';\n          break;\n        }\n        case 'port':\n          if (!result.remotePort) result.remotePort = args.trim();\n          break;\n        case 'cipher':\n          result.cipher = args.trim();\n          break;\n        case 'data-ciphers':\n          if (!result.cipher) result.cipher = args.split(':')[0].trim();\n          break;\n        case 'auth':\n          result.auth = args.trim();\n          break;\n        case 'comp-lzo':\n          result.compLzo = args.trim() || 'yes';\n          break;\n        case 'dev':\n        case 'dev-type': {\n          const d = args.toLowerCase();\n          if (d.indexOf('tun') === 0) result.dev = 'tun';\n          else if (d.indexOf('tap') === 0) result.dev = 'tap';\n          break;\n        }\n        case 'key-direction':\n          result.keyDirection = args.trim();\n          break;\n        case 'auth-user-pass':\n          result.authUserPass = true;\n          break;\n        case 'tun-mtu':\n        case 'link-mtu':\n          if (!result.mtu) result.mtu = args.trim();\n          break;\n        case 'ping':\n          result.ping = args.trim();\n          break;\n        case 'ping-restart':\n          result.pingRestart = args.trim();\n          break;\n        case 'keepalive': {\n          // keepalive <ping> <ping-restart> 是 ping/ping-restart 的简写指令\n          const p = args.split(/\\s+/);\n          if (p[0]) result.ping = p[0];\n          if (p[1]) result.pingRestart = p[1];\n          break;\n        }\n        default:\n          break;\n      }\n    }\n    return result;\n  }\n\n  // ==================== Mihomo openvpn 配置段生成 ====================\n  const SUPPORTED_CIPHERS = ['AES-128-GCM', 'AES-256-GCM', 'AES-128-CBC', 'AES-256-CBC', 'CHACHA20-POLY1305'];\n  const SUPPORTED_AUTH = ['MD5', 'SHA1', 'SHA256', 'SHA384', 'SHA512'];\n\n  function yamlQuote(str) {\n    return '\"' + String(str).replace(/\\\\/g, '\\\\\\\\').replace(/\"/g, '\\\\\"') + '\"';\n  }\n\n  function yamlBlock(value, indent) {\n    const pad = ' '.repeat(indent);\n    return String(value).replace(/\\r\\n/g, '\\n').split('\\n').map((l) => pad + l).join('\\n');\n  }\n\n  function buildMihomoProxySegment(server, parsed) {\n    const warnings = [];\n    const lines = [];\n    const name = `VPNGate-${server.countryShort || '??'}-${server.ip}`;\n\n    lines.push(`- name: ${yamlQuote(name)}`);\n    lines.push(`  type: openvpn`);\n    lines.push(`  server: ${parsed.remoteHost || server.ip}`);\n    lines.push(`  port: ${parsed.remotePort || 1194}`);\n\n    const proto = parsed.proto || 'udp';\n    lines.push(`  proto: ${proto}`);\n    // 注意: 这里的 udp 和上面的 proto 是两个完全不同的字段。\n    // proto 指隧道本身连接服务器所用的传输协议(对应 .ovpn 里的 proto 指令);\n    // udp 是 mihomo 所有代理类型通用的字段,表示\"是否允许 UDP 应用流量(DNS/游戏/QUIC等)通过该节点转发\"。\n    // OpenVPN 建立的是完整的 TUN 隧道,一旦连接建立,不论 proto 是 tcp 还是 udp,隧道内都能正常承载 UDP 应用流量,\n    // 因此这里恒为 true,不应跟随 proto 变化(这是早前版本的一个错误,已修正)。\n    lines.push(`  udp: true`);\n\n    if (parsed.authUserPass) {\n      lines.push(`  # 该配置需要用户名/密码认证 (auth-user-pass),请自行填写凭据`);\n      lines.push(`  # username: \"your-username\"`);\n      lines.push(`  # password: \"your-password\"`);\n    }\n\n    if (parsed.cipher) {\n      if (SUPPORTED_CIPHERS.indexOf(parsed.cipher.toUpperCase()) === -1) {\n        warnings.push(`原始 cipher \"${parsed.cipher}\" 不在 mihomo 已知支持列表(${SUPPORTED_CIPHERS.join('/')})中,请留意兼容性`);\n      }\n      lines.push(`  cipher: ${parsed.cipher}`);\n    }\n    if (parsed.auth) {\n      if (SUPPORTED_AUTH.indexOf(parsed.auth.toUpperCase()) === -1) {\n        warnings.push(`原始 auth \"${parsed.auth}\" 不在 mihomo 已知支持列表(${SUPPORTED_AUTH.join('/')})中,请留意兼容性`);\n      }\n      lines.push(`  auth: ${parsed.auth}`);\n    }\n\n    if (parsed.ca) {\n      lines.push(`  ca: |`);\n      lines.push(yamlBlock(parsed.ca, 4));\n    } else {\n      warnings.push('未在原始配置中找到 <ca> 证书块,而 mihomo 要求必须提供 ca 字段,请检查该节点配置');\n    }\n\n    if (parsed.cert) {\n      lines.push(`  cert: |`);\n      lines.push(yamlBlock(parsed.cert, 4));\n    }\n    if (parsed.key) {\n      lines.push(`  key: |`);\n      lines.push(yamlBlock(parsed.key, 4));\n    }\n    if (!parsed.cert && !parsed.key && !parsed.authUserPass) {\n      warnings.push('未找到客户端证书(cert/key),也未启用 auth-user-pass,请确认该节点的认证方式');\n    }\n\n    if (parsed.tlsCrypt) {\n      lines.push(`  tls-crypt: |`);\n      lines.push(yamlBlock(parsed.tlsCrypt, 4));\n    } else if (parsed.tlsAuth) {\n      lines.push(`  # 注意: 原配置使用的是 tls-auth(独立 HMAC 签名密钥${parsed.keyDirection ? ', key-direction ' + parsed.keyDirection : ''}),而非 tls-crypt`);\n      lines.push(`  # mihomo 文档目前只公开 tls-crypt 字段,以下为尽力映射,如连接异常请对照最新 mihomo 文档核实`);\n      lines.push(`  tls-crypt: |`);\n      lines.push(yamlBlock(parsed.tlsAuth, 4));\n      warnings.push('原始配置使用 tls-auth 而非 tls-crypt,已尽力映射,请手动确认兼容性');\n    }\n\n    if (parsed.compLzo) {\n      lines.push(`  comp-lzo: ${/^(yes|no|adaptive)$/i.test(parsed.compLzo) ? parsed.compLzo : 'yes'}`);\n    }\n\n    const dev = parsed.dev || 'tun';\n    if (dev === 'tap') {\n      warnings.push('原始配置使用 dev tap(二层网桥模式),mihomo 目前仅支持 tun,该节点可能无法通过 mihomo 使用');\n    }\n    // dev 字段不再写入配置: mihomo 只支持 tun 且这本身就是默认值,显式声明没有意义\n\n    if (parsed.mtu) lines.push(`  mtu: ${parsed.mtu}`);\n    if (parsed.ping) lines.push(`  ping: ${parsed.ping}`);\n    if (parsed.pingRestart) lines.push(`  ping-restart: ${parsed.pingRestart}`);\n\n    return { yaml: lines.join('\\n'), warnings, name };\n  }\n\n  // ==================== 应用状态 ====================\n  const state = {\n    servers: [],\n    filtered: [],\n    search: '',\n    country: '',\n    sortValue: 'score-desc',\n    selected: new Set(),\n    updatedAt: null,\n    favorites: [],\n    favoritesError: '',\n    editingFavoriteId: null,\n    pendingFavoriteServers: [],\n    activeFavoriteId: '',\n    drawerSelectedKeys: new Set(),\n    appStarted: false,\n  };\n\n  const el = (id) => document.getElementById(id);\n\n  // ==================== 数据获取 ====================\n  async function fetchServers(force) {\n    el('refreshBtn').disabled = true;\n    el('statusText').textContent = force ? '正在强制刷新…' : '正在连接 vpngate.net…';\n    hideBanner();\n    try {\n      const data = await apiRequest(\n        '/api/servers' + (force ? '?refresh=1' : ''),\n        { method: 'GET', cache: 'no-store' }\n      );\n      state.servers = (data.servers || []).map((s) => {\n        try {\n          const raw = safeDecodeBase64(s.configDataBase64);\n          s.detectedProto = parseOvpnConfig(raw).proto || 'udp';\n        } catch (err) {\n          s.detectedProto = 'udp';\n        }\n        return s;\n      });\n      state.updatedAt = data.updatedAt;\n      state.selected.clear();\n      populateCountryOptions();\n      applyFiltersAndRender();\n      const timeStr = state.updatedAt ? new Date(state.updatedAt).toLocaleString('zh-CN') : '未知';\n      el('statusText').innerHTML = '<span class=\"dot-ok\">●</span> 已连接 · 共 ' + state.servers.length + ' 个节点 · 更新于 ' + escapeHtml(timeStr);\n      el('loadingRow').hidden = true;\n      el('listHead').hidden = state.servers.length === 0;\n    } catch (err) {\n      el('statusText').innerHTML = '<span class=\"dot-bad\">●</span> 连接失败';\n      el('loadingRow').hidden = true;\n      if (err.status === 401) return;\n      showBanner('无法获取 vpngate.net 的节点列表: ' + escapeHtml(err.message) + '。这可能是网络问题或该站点暂时无法访问,请稍后点击右上角\"刷新\"重试。');\n    } finally {\n      el('refreshBtn').disabled = false;\n      updateFixedOffsets();\n    }\n  }\n\n  function showBanner(html) {\n    const b = el('banner');\n    b.innerHTML = html;\n    b.hidden = false;\n  }\n  function hideBanner() {\n    el('banner').hidden = true;\n  }\n\n  // ==================== 订阅收藏夹 ====================\n  function getAdminToken() {\n    try {\n      return sessionStorage.getItem('vpngateAdminToken') || '';\n    } catch (err) {\n      return '';\n    }\n  }\n\n  function saveAdminToken(token) {\n    try {\n      sessionStorage.setItem('vpngateAdminToken', token);\n    } catch (err) {\n      // 浏览器禁用会话存储时,密钥只用于当前一次请求。\n    }\n  }\n\n  function clearAdminToken() {\n    try {\n      sessionStorage.removeItem('vpngateAdminToken');\n    } catch (err) {\n      // 会话存储不可用时无需额外处理。\n    }\n  }\n\n  function showAuthGate(message) {\n    clearAdminToken();\n    document.body.classList.add('auth-locked');\n    el('authGate').hidden = false;\n    el('authTokenInput').value = '';\n    el('authError').textContent = message || '';\n    el('authError').hidden = !message;\n    el('authSubmitBtn').disabled = false;\n    el('authSubmitBtn').textContent = '进入';\n    el('statusText').textContent = '等待访问验证…';\n    setFavoriteDrawerOpen(false);\n    requestAnimationFrame(() => el('authTokenInput').focus());\n  }\n\n  function startApplication() {\n    if (state.appStarted) return;\n    state.appStarted = true;\n    updateDrawerFavoriteUrlPreview();\n    loadFavorites();\n    fetchServers(false);\n  }\n\n  function unlockApplication() {\n    el('authGate').hidden = true;\n    document.body.classList.remove('auth-locked');\n    el('authError').hidden = true;\n    if (state.appStarted) {\n      updateDrawerFavoriteUrlPreview();\n      loadFavorites();\n      fetchServers(false);\n    } else {\n      startApplication();\n    }\n  }\n\n  async function verifyAccessToken(token) {\n    const headers = {};\n    if (token) headers.authorization = 'Bearer ' + token;\n    const res = await fetch('/api/auth/verify', {\n      method: 'GET',\n      headers,\n      cache: 'no-store',\n    });\n    let data = {};\n    try {\n      data = await res.json();\n    } catch (err) {\n      data = {};\n    }\n    if (!res.ok || data.error) {\n      const error = new Error(data.message || '访问密码不正确');\n      error.status = res.status;\n      throw error;\n    }\n    return data;\n  }\n\n  async function initializeAccess() {\n    const storedToken = getAdminToken();\n    try {\n      const access = await verifyAccessToken(storedToken);\n      if (!access.protected) clearAdminToken();\n      unlockApplication();\n    } catch (err) {\n      showAuthGate(storedToken ? '已保存的访问密码已失效，请重新输入。' : '');\n    }\n  }\n\n  async function apiRequest(path, options) {\n    const opts = Object.assign({}, options || {});\n    opts.headers = Object.assign({ 'content-type': 'application/json' }, opts.headers || {});\n    const token = getAdminToken();\n    if (token) opts.headers.authorization = 'Bearer ' + token;\n\n    const res = await fetch(path, opts);\n    let data;\n    try {\n      data = await res.json();\n    } catch (err) {\n      data = { error: true, message: '服务器返回了无法识别的响应' };\n    }\n\n    if (res.status === 401) {\n      showAuthGate('访问密码已失效或不正确，请重新输入。');\n    }\n    if (!res.ok || data.error) {\n      const error = new Error(data.message || ('HTTP ' + res.status));\n      error.status = res.status;\n      error.code = data.code || '';\n      throw error;\n    }\n    return data;\n  }\n\n  async function loadFavorites() {\n    try {\n      const data = await apiRequest('/api/favorites', { method: 'GET' });\n      state.favorites = data.favorites || [];\n      state.favoritesError = '';\n    } catch (err) {\n      state.favorites = [];\n      state.favoritesError = err.message;\n    }\n    renderFavoriteDrawer();\n  }\n\n  function buildSubscriptionUrl(slug) {\n    const url = new URL(window.location.href);\n    const token = getAdminToken();\n    url.pathname =\n      (token ? '/' + encodeURIComponent(token) : '') +\n      '/sub/' + encodeURIComponent(slug);\n    url.search = '';\n    url.hash = '';\n    return url.href;\n  }\n\n  function subscriptionUrl(favorite) {\n    return buildSubscriptionUrl(favorite.slug);\n  }\n\n  function syncFavorite(favorite) {\n    const index = state.favorites.findIndex((item) => item.id === favorite.id);\n    if (index === -1) state.favorites.push(favorite);\n    else state.favorites[index] = favorite;\n    renderFavoriteDrawer();\n  }\n\n  function activeFavorite() {\n    let favorite = state.favorites.find((item) => item.id === state.activeFavoriteId);\n    if (!favorite && state.favorites.length > 0) {\n      favorite = state.favorites[0];\n      state.activeFavoriteId = favorite.id;\n      state.drawerSelectedKeys.clear();\n    }\n    return favorite || null;\n  }\n\n  function setFavoriteDrawerOpen(open) {\n    const drawer = el('favoriteDrawer');\n    drawer.classList.toggle('open', open);\n    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');\n    document.body.classList.toggle('favorite-drawer-open', open);\n    if (!open) closeDrawerFavoriteEditor();\n    renderFavoriteDrawer();\n  }\n\n  async function openFavoriteDrawer(favoriteId) {\n    if (favoriteId) state.activeFavoriteId = favoriteId;\n    state.drawerSelectedKeys.clear();\n    if (state.favoritesError || state.favorites.length === 0) await loadFavorites();\n    setFavoriteDrawerOpen(true);\n  }\n\n  function renderFavoriteDrawer() {\n    const drawer = el('favoriteDrawer');\n    const isOpen = drawer.classList.contains('open');\n    el('favoriteManagerBtn').textContent =\n      '收藏夹' + (state.favorites.length ? ' (' + state.favorites.length + ')' : '') + (isOpen ? ' ‹' : ' ›');\n\n    const errorBox = el('favoriteDrawerError');\n    if (state.favoritesError) {\n      errorBox.textContent = state.favoritesError;\n      errorBox.hidden = false;\n    } else {\n      errorBox.hidden = true;\n    }\n\n    const select = el('favoriteDrawerSelect');\n    select.innerHTML = state.favorites.length\n      ? state.favorites.map((favorite) => (\n          '<option value=\"' + escapeHtml(favorite.id) + '\">' +\n            escapeHtml(favorite.name) + ' (' + favorite.nodeCount + ')' +\n          '</option>'\n        )).join('')\n      : '<option value=\"\">还没有收藏夹</option>';\n    select.disabled = state.favorites.length === 0;\n\n    const favorite = activeFavorite();\n    el('favoriteDrawerAddBtn').disabled = Boolean(state.favoritesError);\n    el('favoriteDrawerEditBtn').disabled = !favorite;\n    el('favoriteDrawerDeleteBtn').disabled = !favorite;\n    if (!favorite) {\n      el('favoriteDrawerUrl').textContent = state.favoritesError ? '收藏夹存储不可用' : '请先创建一个收藏夹';\n      el('favoriteDrawerCopyBtn').disabled = true;\n      el('favoriteDrawerBatchbar').hidden = true;\n      el('favoriteDrawerNodes').innerHTML =\n        '<div class=\"drawer-empty\"><strong>暂无收藏夹</strong>点击上方“+”创建第一个订阅收藏夹。</div>';\n      return;\n    }\n\n    select.value = favorite.id;\n    el('favoriteDrawerUrl').textContent = subscriptionUrl(favorite);\n    el('favoriteDrawerCopyBtn').disabled = false;\n    el('favoriteDrawerBatchbar').hidden = false;\n\n    const nodes = favorite.nodes || [];\n    const validKeys = new Set(nodes.map((node) => node.key));\n    state.drawerSelectedKeys = new Set(\n      Array.from(state.drawerSelectedKeys).filter((key) => validKeys.has(key))\n    );\n    const selectedCount = state.drawerSelectedKeys.size;\n    const selectAll = el('favoriteDrawerSelectAll');\n    selectAll.checked = nodes.length > 0 && selectedCount === nodes.length;\n    selectAll.indeterminate = selectedCount > 0 && selectedCount < nodes.length;\n    selectAll.disabled = nodes.length === 0;\n    el('favoriteDrawerSelectionText').textContent =\n      selectedCount > 0 ? '已选 ' + selectedCount + ' / ' + nodes.length : '全选 ' + nodes.length + ' 个节点';\n    el('favoriteDrawerRemoveBtn').disabled = selectedCount === 0;\n    el('favoriteDrawerClearBtn').disabled = nodes.length === 0;\n\n    if (nodes.length === 0) {\n      el('favoriteDrawerNodes').innerHTML =\n        '<div class=\"drawer-empty\"><strong>收藏夹还是空的</strong>在左侧节点列表中点击“收藏”，或勾选后批量加入。</div>';\n      return;\n    }\n\n    el('favoriteDrawerNodes').innerHTML = nodes.map((node) => (\n      '<label class=\"drawer-node\">' +\n        '<input type=\"checkbox\" class=\"drawer-node-check\" data-key=\"' + escapeHtml(node.key) + '\" ' +\n          (state.drawerSelectedKeys.has(node.key) ? 'checked' : '') + ' />' +\n        '<span class=\"drawer-node-main\">' +\n          '<span class=\"drawer-node-ip\">' + flagEmoji(node.countryShort) + ' ' + escapeHtml(node.ip || '未知 IP') + '</span>' +\n          '<span class=\"drawer-node-meta\">' + escapeHtml(node.hostName || node.key) + '</span>' +\n        '</span>' +\n        '<span class=\"drawer-node-country\">' + escapeHtml(node.countryShort || '??') + '</span>' +\n      '</label>'\n    )).join('');\n  }\n\n  async function removeFavoriteNodes(favorite, keys, confirmation, successMessage) {\n    if (!favorite || !keys.length) return;\n    if (confirmation && !window.confirm(confirmation)) return;\n    try {\n      const data = await apiRequest(\n        '/api/favorites/' + encodeURIComponent(favorite.id) + '/nodes',\n        { method: 'DELETE', body: JSON.stringify({ keys }) }\n      );\n      state.drawerSelectedKeys.clear();\n      syncFavorite(data.favorite);\n      showToast(successMessage || '已从收藏夹移除 ' + data.removed + ' 个节点', 'success');\n    } catch (err) {\n      showToast(err.message, 'error');\n    }\n  }\n\n  function closeDrawerFavoriteEditor() {\n    state.editingFavoriteId = null;\n    el('favoriteDrawerForm').reset();\n    el('favoriteDrawerForm').hidden = true;\n    updateDrawerFavoriteUrlPreview();\n  }\n\n  function openDrawerFavoriteEditor(favorite) {\n    if (state.favoritesError) {\n      showToast(state.favoritesError, 'error');\n      return;\n    }\n    state.editingFavoriteId = favorite ? favorite.id : null;\n    el('favoriteDrawerEditorTitle').textContent = favorite ? '编辑收藏夹' : '新建收藏夹';\n    el('favoriteDrawerNameInput').value = favorite ? favorite.name : '';\n    el('favoriteDrawerSlugInput').value = favorite ? favorite.slug : '';\n    el('favoriteDrawerForm').hidden = false;\n    updateDrawerFavoriteUrlPreview();\n    el('favoriteDrawerNameInput').focus();\n  }\n\n  function updateDrawerFavoriteUrlPreview() {\n    const slug = (el('favoriteDrawerSlugInput').value || 'your-suffix').trim().toLowerCase();\n    el('favoriteDrawerUrlPreview').textContent = buildSubscriptionUrl(slug);\n  }\n\n  function renderFavoritePicker() {\n    if (state.favorites.length === 0) {\n      el('favoritePickerList').innerHTML =\n        '<div class=\"empty\" style=\"margin:24px 0\">还没有收藏夹。</div>' +\n        '<button class=\"btn btn-primary\" id=\"pickerCreateFavoriteBtn\">先新建收藏夹</button>';\n      return;\n    }\n    el('favoritePickerList').innerHTML = state.favorites.map((favorite) => (\n      '<button class=\"btn favorite-choice\" data-id=\"' + escapeHtml(favorite.id) + '\">' +\n        '<span><strong>' + escapeHtml(favorite.name) + '</strong><small>/sub/' + escapeHtml(favorite.slug) + '</small></span>' +\n        '<span class=\"count-badge\">' + favorite.nodeCount + ' 个节点</span>' +\n      '</button>'\n    )).join('');\n  }\n\n  async function openFavoritePicker(servers) {\n    state.pendingFavoriteServers = servers.slice();\n    if (state.favoritesError || state.favorites.length === 0) await loadFavorites();\n    el('favoritePickerSub').textContent = '将 ' + servers.length + ' 个节点加入哪个收藏夹?';\n    renderFavoritePicker();\n    showModal('favoritePickerOverlay');\n  }\n\n  async function addPendingServersToFavorite(favoriteId) {\n    const servers = state.pendingFavoriteServers;\n    if (!servers.length) return;\n    try {\n      const data = await apiRequest(\n        '/api/favorites/' + encodeURIComponent(favoriteId) + '/nodes',\n        { method: 'POST', body: JSON.stringify({ servers }) }\n      );\n      state.activeFavoriteId = data.favorite.id;\n      state.drawerSelectedKeys.clear();\n      syncFavorite(data.favorite);\n      hideModal('favoritePickerOverlay');\n      setFavoriteDrawerOpen(true);\n      showToast('已将 ' + servers.length + ' 个节点加入「' + data.favorite.name + '」', 'success');\n    } catch (err) {\n      showToast(err.message, 'error');\n    }\n  }\n\n  async function saveFavoriteFromDrawerForm() {\n    const payload = {\n      name: el('favoriteDrawerNameInput').value.trim(),\n      slug: el('favoriteDrawerSlugInput').value.trim().toLowerCase(),\n    };\n    const editingId = state.editingFavoriteId;\n    try {\n      const data = await apiRequest(\n        editingId ? '/api/favorites/' + encodeURIComponent(editingId) : '/api/favorites',\n        { method: editingId ? 'PUT' : 'POST', body: JSON.stringify(payload) }\n      );\n      state.activeFavoriteId = data.favorite.id;\n      closeDrawerFavoriteEditor();\n      syncFavorite(data.favorite);\n      showToast(editingId ? '收藏夹已更新' : '收藏夹已创建', 'success');\n    } catch (err) {\n      showToast(err.message, 'error');\n    }\n  }\n\n  async function deleteFavorite(favorite) {\n    if (!window.confirm('确定删除收藏夹「' + favorite.name + '」吗? 对应订阅地址会立即失效。')) return;\n    try {\n      await apiRequest('/api/favorites/' + encodeURIComponent(favorite.id), { method: 'DELETE' });\n      state.favorites = state.favorites.filter((item) => item.id !== favorite.id);\n      if (state.editingFavoriteId === favorite.id) closeDrawerFavoriteEditor();\n      if (state.activeFavoriteId === favorite.id) {\n        state.activeFavoriteId = state.favorites.length ? state.favorites[0].id : '';\n        state.drawerSelectedKeys.clear();\n      }\n      renderFavoriteDrawer();\n      showToast('收藏夹已删除', 'success');\n    } catch (err) {\n      showToast(err.message, 'error');\n    }\n  }\n\n  // ==================== 筛选 / 排序 / 渲染 ====================\n  function populateCountryOptions() {\n    const counts = new Map();\n    state.servers.forEach((s) => {\n      const key = s.countryShort || '??';\n      const cur = counts.get(key) || { label: s.countryLong || key, count: 0 };\n      cur.count++;\n      counts.set(key, cur);\n    });\n    const entries = Array.from(counts.entries()).sort((a, b) => a[1].label.localeCompare(b[1].label));\n    const select = el('countrySelect');\n    const prevValue = select.value;\n    select.innerHTML = '<option value=\"\">全部国家 (' + state.servers.length + ')</option>';\n    entries.forEach(([code, info]) => {\n      const opt = document.createElement('option');\n      opt.value = code;\n      opt.textContent = flagEmoji(code) + ' ' + info.label + ' (' + info.count + ')';\n      select.appendChild(opt);\n    });\n    select.value = prevValue && counts.has(prevValue) ? prevValue : '';\n    state.country = select.value;\n  }\n\n  function applyFiltersAndRender() {\n    const q = state.search.trim().toLowerCase();\n    let list = state.servers.filter((s) => {\n      if (state.country && s.countryShort !== state.country) return false;\n      if (!q) return true;\n      return (\n        (s.hostName || '').toLowerCase().indexOf(q) !== -1 ||\n        (s.ip || '').toLowerCase().indexOf(q) !== -1 ||\n        (s.countryLong || '').toLowerCase().indexOf(q) !== -1 ||\n        (s.countryShort || '').toLowerCase().indexOf(q) !== -1 ||\n        (s.operator || '').toLowerCase().indexOf(q) !== -1\n      );\n    });\n\n    const [sortKey, sortDir] = state.sortValue.split('-');\n    const dir = sortDir === 'asc' ? 1 : -1;\n    list = list.slice().sort((a, b) => {\n      const ka = Number(a[sortKey]) || 0;\n      const kb = Number(b[sortKey]) || 0;\n      if (ka < kb) return -1 * dir;\n      if (ka > kb) return 1 * dir;\n      return 0;\n    });\n\n    state.filtered = list;\n    renderList();\n    updateCounts();\n  }\n\n  function renderList() {\n    const html = state.filtered.map((s) => renderRow(s)).join('');\n    el('list').innerHTML = html;\n    el('emptyState').hidden = state.filtered.length !== 0;\n  }\n\n  const SPEED_BAR_MAX_MBPS = 1000; // 速度条固定刻度: 0-1000 Mbps,超过按满格显示\n  function speedBarPercent(bps) {\n    const mbps = (Number(bps) || 0) / 1e6;\n    return Math.max(2, Math.min(100, Math.round((mbps / SPEED_BAR_MAX_MBPS) * 100)));\n  }\n\n  function renderRow(s) {\n    const k = keyOf(s);\n    const checked = state.selected.has(k) ? 'checked' : '';\n    const pingTierName = tierOf(s.ping);\n    const sessionsTierName = tierOf(s.numSessions);\n    const speedPct = speedBarPercent(s.speed);\n    const hostSafe = escapeHtml(s.hostName);\n    const ipSafe = escapeHtml(s.ip);\n    const opSafe = escapeHtml(s.operator || '—');\n    const msgSafe = escapeHtml(s.message || '—');\n    const countryLabel = escapeHtml(s.countryLong || s.countryShort || '未知');\n    const proto = (s.detectedProto === 'tcp') ? 'tcp' : 'udp';\n\n    return (\n      '<div class=\"row row-body\" data-key=\"' + escapeHtml(k) + '\">' +\n        '<span class=\"cell cell-checkbox\"><input type=\"checkbox\" class=\"row-check\" data-key=\"' + escapeHtml(k) + '\" ' + checked + ' /></span>' +\n        '<span class=\"cell cell-country\" data-label=\"国家\" title=\"' + countryLabel + '\">' + flagEmoji(s.countryShort) + ' ' + escapeHtml(s.countryShort || '??') + '</span>' +\n        '<span class=\"cell cell-host\" data-label=\"主机/IP\">' +\n          '<span class=\"ip\">' + ipSafe + '</span>' +\n          '<span class=\"hostname\">' + hostSafe + '</span>' +\n        '</span>' +\n        '<span class=\"cell cell-score\" data-label=\"评分\">' + formatNumber(s.score) + '</span>' +\n        '<span class=\"cell cell-ping\" data-label=\"Ping\"><span class=\"ping-dot ' + pingTierName + '\"></span>' + formatNumber(s.ping) + ' ms</span>' +\n        '<span class=\"cell\" data-label=\"速度\">' +\n          '<span class=\"speed-wrap\">' +\n            '<span class=\"speed-label\">' + formatSpeed(s.speed) + '</span>' +\n            '<span class=\"speed-track\"><span class=\"speed-fill\" style=\"width:' + speedPct + '%\"></span></span>' +\n          '</span>' +\n        '</span>' +\n        '<span class=\"cell cell-sessions\" data-label=\"在线会话\"><span class=\"tier-badge ' + sessionsTierName + '\">' + formatNumber(s.numSessions) + '</span></span>' +\n        '<span class=\"cell cell-uptime\" data-label=\"运行时间\">' + formatDuration(s.uptime) + '</span>' +\n        '<span class=\"cell cell-users\" data-label=\"累积用户数\">' + formatNumber(s.totalUsers) + '</span>' +\n        '<span class=\"cell cell-traffic\" data-label=\"累积流量\">' + formatBytes(s.totalTraffic) + '</span>' +\n        '<span class=\"cell cell-operator\" data-label=\"运营者\" title=\"' + opSafe + '\">' + opSafe + '</span>' +\n        '<span class=\"cell cell-message\" data-label=\"说明\" title=\"' + msgSafe + '\">' + msgSafe + '</span>' +\n        '<span class=\"cell cell-protocol\" data-label=\"协议\"><span class=\"proto-badge proto-' + proto + '\">' + proto.toUpperCase() + '</span></span>' +\n        '<span class=\"cell cell-actions\" data-label=\"\">' +\n          '<button class=\"btn btn-sm add-favorite-btn\" data-key=\"' + escapeHtml(k) + '\">收藏</button>' +\n          '<button class=\"btn btn-sm view-ovpn-btn\" data-key=\"' + escapeHtml(k) + '\">OpenVPN</button>' +\n          '<button class=\"btn btn-sm view-mihomo-btn\" data-key=\"' + escapeHtml(k) + '\">Mihomo</button>' +\n        '</span>' +\n      '</div>'\n    );\n  }\n\n  function updateCounts() {\n    el('countBadge').textContent = state.filtered.length + ' 个节点' + (state.filtered.length !== state.servers.length ? ' (共 ' + state.servers.length + ')' : '');\n    const selCount = state.selected.size;\n    const bulkBtn = el('bulkExportBtn');\n    bulkBtn.textContent = '批量导出 Mihomo (' + selCount + ')';\n    bulkBtn.disabled = selCount === 0;\n    const bulkFavoriteBtn = el('bulkAddFavoriteBtn');\n    bulkFavoriteBtn.textContent = '加入收藏夹 (' + selCount + ')';\n    bulkFavoriteBtn.disabled = selCount === 0;\n\n    const allChecked = state.filtered.length > 0 && state.filtered.every((s) => state.selected.has(keyOf(s)));\n    el('selectAllCheckbox').checked = allChecked;\n  }\n\n  // ==================== 弹窗:节点详情 ====================\n  function showModal(id) {\n    el(id).hidden = false;\n  }\n  function hideModal(id) {\n    el(id).hidden = true;\n  }\n\n  function renderWarnings(targetId, warnings) {\n    const box = el(targetId);\n    if (!warnings || warnings.length === 0) {\n      box.hidden = true;\n      box.innerHTML = '';\n      return;\n    }\n    box.hidden = false;\n    box.innerHTML = '⚠️ 转换提示<ul>' + warnings.map((w) => '<li>' + escapeHtml(w) + '</li>').join('') + '</ul>';\n  }\n\n  function openDetailModal(server, initialTab) {\n    const raw = safeDecodeBase64(server.configDataBase64);\n    const parsed = parseOvpnConfig(raw);\n    const { yaml, warnings } = buildMihomoProxySegment(server, parsed);\n\n    el('modalTitle').textContent = flagEmoji(server.countryShort) + ' ' + (server.countryLong || server.countryShort || '未知地区');\n    el('modalSub').textContent = server.hostName + ' · ' + server.ip;\n\n    el('ovpnText').value = raw;\n    el('mihomoText').value = yamlBlock(yaml, 2);\n    renderWarnings('mihomoWarnings', warnings);\n\n    switchTab(initialTab || 'ovpn');\n    showModal('modalOverlay');\n  }\n\n  function switchTab(tab) {\n    document.querySelectorAll('#modalOverlay .tab').forEach((btn) => {\n      btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);\n    });\n    el('tabOvpn').classList.toggle('active', tab === 'ovpn');\n    el('tabMihomo').classList.toggle('active', tab === 'mihomo');\n  }\n\n  // ==================== 弹窗:批量导出 ====================\n  function openBulkModal() {\n    const selectedServers = state.servers.filter((s) => state.selected.has(keyOf(s)));\n    if (selectedServers.length === 0) {\n      showToast('请先勾选至少一个节点', 'error');\n      return;\n    }\n    const allWarnings = [];\n    const segments = selectedServers.map((s) => {\n      const raw = safeDecodeBase64(s.configDataBase64);\n      const parsed = parseOvpnConfig(raw);\n      const { yaml, warnings } = buildMihomoProxySegment(s, parsed);\n      warnings.forEach((w) => allWarnings.push('[' + s.countryShort + ' ' + s.ip + '] ' + w));\n      return yaml;\n    });\n    const full = 'proxies:\\n' + segments.map((seg) => yamlBlock(seg, 2)).join('\\n');\n    el('bulkSub').textContent = '已选 ' + selectedServers.length + ' 个节点';\n    el('bulkText').value = full;\n    renderWarnings('bulkWarnings', allWarnings);\n    showModal('bulkModalOverlay');\n  }\n\n  // ==================== 剪贴板 / 下载 / 提示 ====================\n  function legacyCopy(text) {\n    const ta = document.createElement('textarea');\n    ta.value = text;\n    ta.style.position = 'fixed';\n    ta.style.opacity = '0';\n    document.body.appendChild(ta);\n    ta.focus();\n    ta.select();\n    document.execCommand('copy');\n    document.body.removeChild(ta);\n  }\n\n  async function copyText(text, successMsg) {\n    try {\n      if (navigator.clipboard && window.isSecureContext) {\n        await navigator.clipboard.writeText(text);\n      } else {\n        legacyCopy(text);\n      }\n      showToast(successMsg || '已复制到剪贴板', 'success');\n    } catch (err) {\n      try {\n        legacyCopy(text);\n        showToast(successMsg || '已复制到剪贴板', 'success');\n      } catch (err2) {\n        showToast('复制失败,请手动选择文本复制', 'error');\n      }\n    }\n  }\n\n  function downloadText(filename, text) {\n    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });\n    const url = URL.createObjectURL(blob);\n    const a = document.createElement('a');\n    a.href = url;\n    a.download = filename;\n    document.body.appendChild(a);\n    a.click();\n    document.body.removeChild(a);\n    setTimeout(() => URL.revokeObjectURL(url), 1000);\n    showToast('已下载 ' + filename, 'success');\n  }\n\n  function showToast(msg, type) {\n    const container = el('toastContainer');\n    const item = document.createElement('div');\n    item.className = 'toast ' + (type === 'error' ? 'toast-error' : 'toast-success');\n    item.textContent = msg;\n    container.appendChild(item);\n    requestAnimationFrame(() => item.classList.add('show'));\n    setTimeout(() => {\n      item.classList.remove('show');\n      setTimeout(() => item.remove(), 300);\n    }, 2800);\n  }\n\n  // ==================== 事件绑定 ====================\n  function wireEvents() {\n    el('authForm').addEventListener('submit', async (e) => {\n      e.preventDefault();\n      const token = el('authTokenInput').value.trim();\n      if (!token) return;\n      el('authSubmitBtn').disabled = true;\n      el('authSubmitBtn').textContent = '正在验证…';\n      el('authError').hidden = true;\n      try {\n        await verifyAccessToken(token);\n        saveAdminToken(token);\n        unlockApplication();\n      } catch (err) {\n        el('authError').textContent = err.message || '访问密码不正确';\n        el('authError').hidden = false;\n        el('authTokenInput').select();\n      } finally {\n        el('authSubmitBtn').disabled = false;\n        el('authSubmitBtn').textContent = '进入';\n      }\n    });\n\n    el('refreshBtn').addEventListener('click', () => fetchServers(true));\n\n    el('searchInput').addEventListener('input', (e) => {\n      state.search = e.target.value;\n      applyFiltersAndRender();\n    });\n    el('countrySelect').addEventListener('change', (e) => {\n      state.country = e.target.value;\n      applyFiltersAndRender();\n    });\n    el('sortSelect').addEventListener('change', (e) => {\n      state.sortValue = e.target.value;\n      applyFiltersAndRender();\n    });\n\n    el('selectAllCheckbox').addEventListener('change', (e) => {\n      if (e.target.checked) {\n        state.filtered.forEach((s) => state.selected.add(keyOf(s)));\n      } else {\n        state.filtered.forEach((s) => state.selected.delete(keyOf(s)));\n      }\n      renderList();\n      updateCounts();\n    });\n\n    el('bulkExportBtn').addEventListener('click', openBulkModal);\n    el('bulkAddFavoriteBtn').addEventListener('click', () => {\n      const servers = state.servers.filter((s) => state.selected.has(keyOf(s)));\n      openFavoritePicker(servers);\n    });\n    el('favoriteManagerBtn').addEventListener('click', () => {\n      const isOpen = el('favoriteDrawer').classList.contains('open');\n      if (isOpen) setFavoriteDrawerOpen(false);\n      else openFavoriteDrawer();\n    });\n\n    // 页面右侧收藏夹抽屉\n    el('favoriteDrawerClose').addEventListener('click', () => setFavoriteDrawerOpen(false));\n    el('favoriteDrawerAddBtn').addEventListener('click', () => {\n      openDrawerFavoriteEditor(null);\n    });\n    el('favoriteDrawerEditBtn').addEventListener('click', () => {\n      const favorite = activeFavorite();\n      if (favorite) openDrawerFavoriteEditor(favorite);\n    });\n    el('favoriteDrawerDeleteBtn').addEventListener('click', () => {\n      const favorite = activeFavorite();\n      if (favorite) deleteFavorite(favorite);\n    });\n    el('favoriteDrawerSelect').addEventListener('change', (e) => {\n      state.activeFavoriteId = e.target.value;\n      state.drawerSelectedKeys.clear();\n      closeDrawerFavoriteEditor();\n      renderFavoriteDrawer();\n    });\n    el('favoriteDrawerCopyBtn').addEventListener('click', () => {\n      const favorite = activeFavorite();\n      if (favorite) copyText(subscriptionUrl(favorite), '订阅地址已复制');\n    });\n    el('favoriteDrawerForm').addEventListener('submit', (e) => {\n      e.preventDefault();\n      saveFavoriteFromDrawerForm();\n    });\n    el('favoriteDrawerSlugInput').addEventListener('input', updateDrawerFavoriteUrlPreview);\n    el('favoriteDrawerEditorCancelBtn').addEventListener('click', closeDrawerFavoriteEditor);\n    el('favoriteDrawerNodes').addEventListener('change', (e) => {\n      if (!e.target.classList.contains('drawer-node-check')) return;\n      const key = e.target.getAttribute('data-key');\n      if (e.target.checked) state.drawerSelectedKeys.add(key);\n      else state.drawerSelectedKeys.delete(key);\n      renderFavoriteDrawer();\n    });\n    el('favoriteDrawerSelectAll').addEventListener('change', (e) => {\n      const favorite = activeFavorite();\n      state.drawerSelectedKeys.clear();\n      if (favorite && e.target.checked) {\n        (favorite.nodes || []).forEach((node) => state.drawerSelectedKeys.add(node.key));\n      }\n      renderFavoriteDrawer();\n    });\n    el('favoriteDrawerRemoveBtn').addEventListener('click', () => {\n      const favorite = activeFavorite();\n      const keys = Array.from(state.drawerSelectedKeys);\n      if (!favorite || keys.length === 0) return;\n      removeFavoriteNodes(\n        favorite,\n        keys,\n        '确定从「' + favorite.name + '」移除选中的 ' + keys.length + ' 个节点吗?',\n        '已移除选中的 ' + keys.length + ' 个节点'\n      );\n    });\n    el('favoriteDrawerClearBtn').addEventListener('click', () => {\n      const favorite = activeFavorite();\n      if (!favorite) return;\n      const keys = (favorite.nodes || []).map((node) => node.key);\n      if (keys.length === 0) return;\n      removeFavoriteNodes(\n        favorite,\n        keys,\n        '确定清空收藏夹「' + favorite.name + '」吗? 此操作会移除其中全部 ' + keys.length + ' 个节点。',\n        '收藏夹已清空'\n      );\n    });\n\n    // 事件委托: 行内 checkbox 与 \"查看配置\" 按钮\n    el('list').addEventListener('change', (e) => {\n      if (e.target.classList.contains('row-check')) {\n        const k = e.target.getAttribute('data-key');\n        if (e.target.checked) state.selected.add(k);\n        else state.selected.delete(k);\n        updateCounts();\n      }\n    });\n    el('list').addEventListener('click', (e) => {\n      const favoriteBtn = e.target.closest('.add-favorite-btn');\n      const ovpnBtn = e.target.closest('.view-ovpn-btn');\n      const mihomoBtn = e.target.closest('.view-mihomo-btn');\n      const btn = favoriteBtn || ovpnBtn || mihomoBtn;\n      if (!btn) return;\n      const k = btn.getAttribute('data-key');\n      const server = state.servers.find((s) => keyOf(s) === k);\n      if (!server) return;\n      if (favoriteBtn) openFavoritePicker([server]);\n      else openDetailModal(server, mihomoBtn ? 'mihomo' : 'ovpn');\n    });\n\n    // 详情弹窗\n    el('modalClose').addEventListener('click', () => hideModal('modalOverlay'));\n    el('modalOverlay').addEventListener('click', (e) => {\n      if (e.target.id === 'modalOverlay') hideModal('modalOverlay');\n    });\n    document.querySelectorAll('#modalOverlay .tab').forEach((btn) => {\n      btn.addEventListener('click', () => switchTab(btn.getAttribute('data-tab')));\n    });\n    el('copyOvpnBtn').addEventListener('click', () => copyText(el('ovpnText').value, 'OpenVPN 配置已复制'));\n    el('downloadOvpnBtn').addEventListener('click', () => {\n      const name = (el('modalSub').textContent || 'vpngate').replace(/[^\\w.\\-]+/g, '_');\n      downloadText(name + '.ovpn', el('ovpnText').value);\n    });\n    el('copyMihomoBtn').addEventListener('click', () => copyText(el('mihomoText').value, 'Mihomo 配置段已复制'));\n    el('downloadMihomoBtn').addEventListener('click', () => {\n      const name = (el('modalSub').textContent || 'vpngate').replace(/[^\\w.\\-]+/g, '_');\n      downloadText(name + '.mihomo.yaml', el('mihomoText').value);\n    });\n\n    // 批量弹窗\n    el('bulkModalClose').addEventListener('click', () => hideModal('bulkModalOverlay'));\n    el('bulkModalOverlay').addEventListener('click', (e) => {\n      if (e.target.id === 'bulkModalOverlay') hideModal('bulkModalOverlay');\n    });\n    el('copyBulkBtn').addEventListener('click', () => copyText(el('bulkText').value, '已复制 ' + state.selected.size + ' 个节点的 Mihomo 配置'));\n    el('downloadBulkBtn').addEventListener('click', () => downloadText('vpngate-mihomo-proxies.yaml', el('bulkText').value));\n\n    // 选择收藏夹\n    el('favoritePickerClose').addEventListener('click', () => hideModal('favoritePickerOverlay'));\n    el('favoritePickerOverlay').addEventListener('click', (e) => {\n      if (e.target.id === 'favoritePickerOverlay') hideModal('favoritePickerOverlay');\n    });\n    el('favoritePickerList').addEventListener('click', (e) => {\n      const choice = e.target.closest('.favorite-choice');\n      if (choice) {\n        addPendingServersToFavorite(choice.getAttribute('data-id'));\n        return;\n      }\n      if (e.target.closest('#pickerCreateFavoriteBtn')) {\n        hideModal('favoritePickerOverlay');\n        setFavoriteDrawerOpen(true);\n        openDrawerFavoriteEditor(null);\n      }\n    });\n\n    document.addEventListener('keydown', (e) => {\n      if (e.key === 'Escape') {\n        hideModal('modalOverlay');\n        hideModal('bulkModalOverlay');\n        hideModal('favoritePickerOverlay');\n        setFavoriteDrawerOpen(false);\n      }\n    });\n\n    // 横向滚动同步: 固定表头随数据区域的横向滚动一起移动\n    el('tableScroll').addEventListener(\n      'scroll',\n      () => {\n        el('tableHeadFixed').scrollLeft = el('tableScroll').scrollLeft;\n      },\n      { passive: true }\n    );\n  }\n\n  // ==================== 固定定位布局: 动态测量高度,而不是写死像素值 ====================\n  function updateFixedOffsets() {\n    const topbarEl = document.querySelector('.topbar');\n    const toolbarEl = document.querySelector('.toolbar');\n    const headFixedEl = el('tableHeadFixed');\n    const mainEl = document.querySelector('main');\n    if (!topbarEl || !toolbarEl || !headFixedEl || !mainEl) return;\n\n    const topbarH = topbarEl.offsetHeight;\n    toolbarEl.style.top = topbarH + 'px';\n\n    const toolbarH = toolbarEl.offsetHeight;\n    headFixedEl.style.top = (topbarH + toolbarH) + 'px';\n    // 收藏夹抽屉只避让最顶部品牌栏。工具栏在桌面端会缩到抽屉左侧,\n    // 如果再把工具栏高度算进抽屉 top,右上方就会留下明显的空白黑块。\n    document.documentElement.style.setProperty('--favorite-drawer-top', topbarH + 'px');\n\n    const headFixedVisible = getComputedStyle(headFixedEl).display !== 'none';\n    const headFixedH = headFixedVisible ? headFixedEl.offsetHeight : 0;\n    mainEl.style.paddingTop = (toolbarH + headFixedH) + 'px';\n    updateFavoriteDrawerBottom();\n  }\n\n  // 长列表时抽屉占满视口高度；滚动到页面末尾后，自动停在 footer 上方。\n  function updateFavoriteDrawerBottom() {\n    const footerEl = document.querySelector('.footer');\n    if (!footerEl) return;\n    const footerRect = footerEl.getBoundingClientRect();\n    const visibleFooterHeight = Math.max(\n      0,\n      Math.min(footerRect.height, window.innerHeight - footerRect.top)\n    );\n    document.documentElement.style.setProperty('--favorite-drawer-bottom', visibleFooterHeight + 'px');\n  }\n\n  function setupFixedOffsetWatchers() {\n    updateFixedOffsets();\n    window.addEventListener('resize', updateFixedOffsets);\n    window.addEventListener('scroll', updateFavoriteDrawerBottom, { passive: true });\n    if (typeof ResizeObserver !== 'undefined') {\n      const ro = new ResizeObserver(() => updateFixedOffsets());\n      ro.observe(document.querySelector('.topbar'));\n      ro.observe(document.querySelector('.toolbar'));\n      ro.observe(el('listHead'));\n      ro.observe(document.querySelector('.footer'));\n    }\n  }\n\n  wireEvents();\n  setupFixedOffsetWatchers();\n  updateDrawerFavoriteUrlPreview();\n  initializeAccess();\n})();\n</script>\n</body>\n</html>\n";

// ============================================================
// VPNGate OpenVPN 节点浏览器 + Mihomo 配置转换 - Cloudflare Worker
// ============================================================
//
// 功能:
// 1. 服务端拉取 https://www.vpngate.net/api/iphone/ 的 CSV 节点列表并解析为 JSON
// 2. 提供网页界面浏览节点、预览/复制/下载 OpenVPN 原始配置
// 3. 将 OpenVPN 配置转换为 Mihomo (Clash Meta) 的 openvpn 代理配置段,预览/复制/下载
//
// 部署方式见同目录 README.md

const VPNGATE_API_URL = 'https://www.vpngate.net/api/iphone/';
const CACHE_TTL_SECONDS = 300; // 边缘缓存 5 分钟,避免每次访问都请求 vpngate.net
const FAVORITES_INDEX_KEY = 'favorites:index:v1';
const FAVORITE_KEY_PREFIX = 'favorites:item:';
const FAVORITE_SLUG_PREFIX = 'favorites:slug:';
const MAX_FAVORITE_NODES = 500;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);

    if (url.pathname === '/api/auth/verify') {
      const denied = requireAdmin(request, env);
      if (denied) return denied;
      return jsonResponse({
        error: false,
        protected: Boolean(getAdminToken(env)),
      });
    }

    if (url.pathname === '/api/servers') {
      const denied = requireAdmin(request, env);
      if (denied) return denied;
      return handleServersApi(request, ctx);
    }

    if (url.pathname === '/api/favorites' || url.pathname.startsWith('/api/favorites/')) {
      return handleFavoritesApi(request, env);
    }

    if (pathParts.length === 2 && pathParts[0] === 'sub') {
      return handleSubscription(request, env, '', pathParts[1]);
    }

    if (pathParts.length === 3 && pathParts[1] === 'sub') {
      return handleSubscription(request, env, pathParts[0], pathParts[2]);
    }

    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(HTML_PAGE, {
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'cache-control': 'no-cache',
        },
      });
    }

    return new Response('Not Found', { status: 404 });
  },
};

async function handleFavoritesApi(request, env) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'access-control-allow-headers': 'content-type,authorization,x-admin-token',
      },
    });
  }

  const denied = requireAdmin(request, env);
  if (denied) return denied;

  if (!env || !env.SUBSCRIPTIONS) {
    return jsonResponse(
      {
        error: true,
        code: 'KV_NOT_CONFIGURED',
        message: '收藏夹存储尚未配置,请先为 Worker 绑定名为 SUBSCRIPTIONS 的 Cloudflare KV 命名空间',
      },
      503
    );
  }

  const url = new URL(request.url);
  const parts = url.pathname.split('/').filter(Boolean);
  const favoriteId = parts[2] || '';
  const childResource = parts[3] || '';

  try {
    if (request.method === 'GET' && !favoriteId) {
      const favorites = await listFavorites(env.SUBSCRIPTIONS);
      return jsonResponse({
        error: false,
        favorites: favorites.map(toFavoriteSummary),
      });
    }

    if (request.method === 'GET' && favoriteId && !childResource) {
      const favorite = await getFavoriteById(env.SUBSCRIPTIONS, favoriteId);
      if (!favorite) return jsonResponse({ error: true, message: '收藏夹不存在' }, 404);
      return jsonResponse({ error: false, favorite: toFavoriteSummary(favorite) });
    }

    if (request.method === 'POST' && !favoriteId) {
      const body = await readJsonBody(request);
      const name = validateFavoriteName(body.name);
      const slug = validateFavoriteSlug(body.slug);
      const existingId = await env.SUBSCRIPTIONS.get(FAVORITE_SLUG_PREFIX + slug);
      if (existingId) {
        return jsonResponse({ error: true, message: '订阅地址后缀已被使用,请换一个' }, 409);
      }

      const now = new Date().toISOString();
      const favorite = {
        id: crypto.randomUUID(),
        name,
        slug,
        createdAt: now,
        updatedAt: now,
        nodes: [],
      };
      const ids = await getFavoriteIds(env.SUBSCRIPTIONS);
      ids.push(favorite.id);
      await Promise.all([
        env.SUBSCRIPTIONS.put(FAVORITE_KEY_PREFIX + favorite.id, JSON.stringify(favorite)),
        env.SUBSCRIPTIONS.put(FAVORITE_SLUG_PREFIX + slug, favorite.id),
        env.SUBSCRIPTIONS.put(FAVORITES_INDEX_KEY, JSON.stringify(ids)),
      ]);
      return jsonResponse({ error: false, favorite: toFavoriteSummary(favorite) }, 201);
    }

    if (request.method === 'PUT' && favoriteId && !childResource) {
      const favorite = await getFavoriteById(env.SUBSCRIPTIONS, favoriteId);
      if (!favorite) return jsonResponse({ error: true, message: '收藏夹不存在' }, 404);
      const body = await readJsonBody(request);
      const nextName = validateFavoriteName(body.name);
      const nextSlug = validateFavoriteSlug(body.slug);

      if (nextSlug !== favorite.slug) {
        const existingId = await env.SUBSCRIPTIONS.get(FAVORITE_SLUG_PREFIX + nextSlug);
        if (existingId && existingId !== favorite.id) {
          return jsonResponse({ error: true, message: '订阅地址后缀已被使用,请换一个' }, 409);
        }
      }

      const oldSlug = favorite.slug;
      favorite.name = nextName;
      favorite.slug = nextSlug;
      favorite.updatedAt = new Date().toISOString();
      const writes = [
        env.SUBSCRIPTIONS.put(FAVORITE_KEY_PREFIX + favorite.id, JSON.stringify(favorite)),
        env.SUBSCRIPTIONS.put(FAVORITE_SLUG_PREFIX + nextSlug, favorite.id),
      ];
      if (oldSlug !== nextSlug) writes.push(env.SUBSCRIPTIONS.delete(FAVORITE_SLUG_PREFIX + oldSlug));
      await Promise.all(writes);
      return jsonResponse({ error: false, favorite: toFavoriteSummary(favorite) });
    }

    if (request.method === 'DELETE' && favoriteId && !childResource) {
      const favorite = await getFavoriteById(env.SUBSCRIPTIONS, favoriteId);
      if (!favorite) return jsonResponse({ error: true, message: '收藏夹不存在' }, 404);
      const ids = (await getFavoriteIds(env.SUBSCRIPTIONS)).filter((id) => id !== favorite.id);
      await Promise.all([
        env.SUBSCRIPTIONS.delete(FAVORITE_KEY_PREFIX + favorite.id),
        env.SUBSCRIPTIONS.delete(FAVORITE_SLUG_PREFIX + favorite.slug),
        env.SUBSCRIPTIONS.put(FAVORITES_INDEX_KEY, JSON.stringify(ids)),
      ]);
      return jsonResponse({ error: false });
    }

    if (request.method === 'POST' && favoriteId && childResource === 'nodes') {
      const favorite = await getFavoriteById(env.SUBSCRIPTIONS, favoriteId);
      if (!favorite) return jsonResponse({ error: true, message: '收藏夹不存在' }, 404);
      const body = await readJsonBody(request);
      if (!Array.isArray(body.servers) || body.servers.length === 0) {
        return jsonResponse({ error: true, message: '请至少提供一个节点' }, 400);
      }

      const incoming = body.servers.map(sanitizeServerSnapshot);
      const byKey = new Map((favorite.nodes || []).map((node) => [serverKey(node), node]));
      incoming.forEach((node) => byKey.set(serverKey(node), node));
      if (byKey.size > MAX_FAVORITE_NODES) {
        return jsonResponse(
          { error: true, message: '单个收藏夹最多可保存 ' + MAX_FAVORITE_NODES + ' 个节点' },
          400
        );
      }
      favorite.nodes = Array.from(byKey.values());
      favorite.updatedAt = new Date().toISOString();
      await env.SUBSCRIPTIONS.put(FAVORITE_KEY_PREFIX + favorite.id, JSON.stringify(favorite));
      return jsonResponse({
        error: false,
        favorite: toFavoriteSummary(favorite),
        added: incoming.length,
      });
    }

    if (request.method === 'DELETE' && favoriteId && childResource === 'nodes') {
      const favorite = await getFavoriteById(env.SUBSCRIPTIONS, favoriteId);
      if (!favorite) return jsonResponse({ error: true, message: '收藏夹不存在' }, 404);
      const body = await readJsonBody(request);
      const keys = new Set(Array.isArray(body.keys) ? body.keys.map(String) : []);
      if (keys.size === 0) return jsonResponse({ error: true, message: '请提供要移除的节点' }, 400);
      const before = (favorite.nodes || []).length;
      favorite.nodes = (favorite.nodes || []).filter((node) => !keys.has(serverKey(node)));
      favorite.updatedAt = new Date().toISOString();
      await env.SUBSCRIPTIONS.put(FAVORITE_KEY_PREFIX + favorite.id, JSON.stringify(favorite));
      return jsonResponse({
        error: false,
        favorite: toFavoriteSummary(favorite),
        removed: before - favorite.nodes.length,
      });
    }

    return jsonResponse({ error: true, message: '不支持的收藏夹操作' }, 405);
  } catch (err) {
    const status = err && err.status ? err.status : 500;
    return jsonResponse(
      { error: true, message: err && err.message ? err.message : '收藏夹操作失败' },
      status
    );
  }
}

async function handleSubscription(request, env, pathToken, rawSlug) {
  if (request.method !== 'GET') return new Response('Method Not Allowed', { status: 405 });
  if (!env || !env.SUBSCRIPTIONS) {
    return new Response('SUBSCRIPTIONS KV is not configured', { status: 503 });
  }

  const expected = getAdminToken(env);
  let supplied = '';
  let slug;
  try {
    supplied = decodeURIComponent(pathToken || '');
    slug = validateFavoriteSlug(decodeURIComponent(rawSlug || ''));
  } catch (err) {
    return new Response('Invalid subscription path', { status: 400 });
  }
  if (expected && !constantTimeEqual(supplied, expected)) {
    return new Response('Unauthorized subscription path', {
      status: 401,
      headers: { 'cache-control': 'no-store' },
    });
  }

  const favoriteId = await env.SUBSCRIPTIONS.get(FAVORITE_SLUG_PREFIX + slug);
  if (!favoriteId) return new Response('Subscription not found', { status: 404 });
  const favorite = await getFavoriteById(env.SUBSCRIPTIONS, favoriteId);
  if (!favorite) return new Response('Subscription not found', { status: 404 });

  const segments = [];
  for (const server of favorite.nodes || []) {
    try {
      const raw = decodeBase64Utf8(server.configDataBase64);
      segments.push(buildServerMihomoSegment(server, parseServerOvpnConfig(raw)));
    } catch (err) {
      // 单个节点损坏时跳过,避免整个订阅地址不可用。
    }
  }
  const yaml = 'proxies:\n' + segments.map((segment) => indentYaml(segment, 2)).join('\n') + '\n';
  return new Response(yaml, {
    status: 200,
    headers: {
      'content-type': 'text/yaml; charset=utf-8',
      'content-disposition': 'inline; filename="' + slug + '.yaml"',
      'cache-control': 'no-store',
      'access-control-allow-origin': '*',
      'profile-title': encodeURIComponent(favorite.name),
    },
  });
}

function requireAdmin(request, env) {
  const expected = getAdminToken(env);
  if (!expected) return null;
  const authorization = request.headers.get('authorization') || '';
  const supplied = authorization.startsWith('Bearer ')
    ? authorization.slice(7).trim()
    : (request.headers.get('x-admin-token') || '').trim();
  if (constantTimeEqual(supplied, expected)) return null;
  return jsonResponse(
    { error: true, code: 'UNAUTHORIZED', message: '访问密码不正确或尚未输入' },
    401
  );
}

function getAdminToken(env) {
  return env && typeof env.ADMIN_TOKEN === 'string' ? env.ADMIN_TOKEN.trim() : '';
}

function constantTimeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function readJsonBody(request) {
  let body;
  try {
    body = await request.json();
  } catch (err) {
    const parseError = new Error('请求内容必须是有效的 JSON');
    parseError.status = 400;
    throw parseError;
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    const typeError = new Error('请求内容格式不正确');
    typeError.status = 400;
    throw typeError;
  }
  return body;
}

function validateFavoriteName(value) {
  const name = String(value || '').trim();
  if (!name || name.length > 60) {
    const err = new Error('收藏夹名称长度必须为 1-60 个字符');
    err.status = 400;
    throw err;
  }
  return name;
}

function validateFavoriteSlug(value) {
  const slug = String(value || '').trim().toLowerCase();
  if (!/^[a-z0-9][a-z0-9_-]{0,63}$/.test(slug)) {
    const err = new Error('订阅地址后缀须为 1-64 位小写字母、数字、短横线或下划线,且必须以字母或数字开头');
    err.status = 400;
    throw err;
  }
  return slug;
}

function sanitizeServerSnapshot(server) {
  if (!server || typeof server !== 'object') {
    const err = new Error('节点数据格式不正确');
    err.status = 400;
    throw err;
  }
  const configDataBase64 = String(server.configDataBase64 || '').replace(/\s+/g, '');
  if (!configDataBase64 || configDataBase64.length > 200000) {
    const err = new Error('节点 OpenVPN 配置为空或过大');
    err.status = 400;
    throw err;
  }
  try {
    decodeBase64Utf8(configDataBase64);
  } catch (err) {
    const invalid = new Error('节点 OpenVPN 配置不是有效的 Base64 数据');
    invalid.status = 400;
    throw invalid;
  }
  return {
    hostName: String(server.hostName || '').slice(0, 255),
    ip: String(server.ip || '').slice(0, 64),
    countryLong: String(server.countryLong || '').slice(0, 120),
    countryShort: String(server.countryShort || '').slice(0, 8),
    configDataBase64,
  };
}

function serverKey(server) {
  return String(server.hostName || '') + '|' + String(server.ip || '');
}

async function getFavoriteIds(kv) {
  const ids = await kv.get(FAVORITES_INDEX_KEY, 'json');
  return Array.isArray(ids) ? ids.filter((id) => typeof id === 'string') : [];
}

async function getFavoriteById(kv, id) {
  if (!/^[a-zA-Z0-9-]{1,80}$/.test(String(id || ''))) return null;
  return kv.get(FAVORITE_KEY_PREFIX + id, 'json');
}

async function listFavorites(kv) {
  const ids = await getFavoriteIds(kv);
  const items = await Promise.all(ids.map((id) => getFavoriteById(kv, id)));
  return items.filter(Boolean);
}

function toFavoriteSummary(favorite) {
  return {
    id: favorite.id,
    name: favorite.name,
    slug: favorite.slug,
    createdAt: favorite.createdAt,
    updatedAt: favorite.updatedAt,
    nodeCount: Array.isArray(favorite.nodes) ? favorite.nodes.length : 0,
    nodeKeys: Array.isArray(favorite.nodes) ? favorite.nodes.map(serverKey) : [],
    nodes: Array.isArray(favorite.nodes)
      ? favorite.nodes.map((node) => ({
          key: serverKey(node),
          hostName: node.hostName,
          ip: node.ip,
          countryShort: node.countryShort,
        }))
      : [],
  };
}

function decodeBase64Utf8(base64) {
  const binary = atob(String(base64 || '').replace(/\s+/g, ''));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
}

function parseServerOvpnConfig(raw) {
  const result = {
    remoteHost: null, remotePort: null, proto: null,
    cipher: null, auth: null, compLzo: null, dev: null,
    ca: null, cert: null, key: null, tlsCrypt: null, tlsAuth: null,
    keyDirection: null, authUserPass: false, mtu: null,
    ping: null, pingRestart: null,
  };
  const blockTagMap = {
    '<ca>': 'ca', '</ca>': 'ca',
    '<cert>': 'cert', '</cert>': 'cert',
    '<key>': 'key', '</key>': 'key',
    '<tls-crypt>': 'tlsCrypt', '</tls-crypt>': 'tlsCrypt',
    '<tls-auth>': 'tlsAuth', '</tls-auth>': 'tlsAuth',
  };
  let block = null;
  let blockLines = [];
  for (const rawLine of String(raw || '').split(/\r\n|\r|\n/)) {
    const trimmed = rawLine.trim();
    if (Object.prototype.hasOwnProperty.call(blockTagMap, trimmed)) {
      const isClose = trimmed.startsWith('</');
      const key = blockTagMap[trimmed];
      if (!isClose) {
        block = key;
        blockLines = [];
      } else {
        result[key] = blockLines.join('\n').trim();
        block = null;
      }
      continue;
    }
    if (block) {
      blockLines.push(rawLine.replace(/\r$/, ''));
      continue;
    }
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith(';')) continue;
    const spaceIdx = trimmed.indexOf(' ');
    const directive = (spaceIdx === -1 ? trimmed : trimmed.slice(0, spaceIdx)).toLowerCase();
    const args = spaceIdx === -1 ? '' : trimmed.slice(spaceIdx + 1).trim();
    switch (directive) {
      case 'remote': {
        const parts = args.split(/\s+/);
        result.remoteHost = parts[0];
        if (parts[1]) result.remotePort = parts[1];
        break;
      }
      case 'proto':
        result.proto = args.toLowerCase().startsWith('tcp') ? 'tcp' : 'udp';
        break;
      case 'port':
        if (!result.remotePort) result.remotePort = args;
        break;
      case 'cipher':
        result.cipher = args;
        break;
      case 'data-ciphers':
        if (!result.cipher) result.cipher = args.split(':')[0].trim();
        break;
      case 'auth':
        result.auth = args;
        break;
      case 'comp-lzo':
        result.compLzo = args || 'yes';
        break;
      case 'dev':
      case 'dev-type':
        result.dev = args.toLowerCase().startsWith('tap') ? 'tap' : 'tun';
        break;
      case 'key-direction':
        result.keyDirection = args;
        break;
      case 'auth-user-pass':
        result.authUserPass = true;
        break;
      case 'tun-mtu':
      case 'link-mtu':
        if (!result.mtu) result.mtu = args;
        break;
      case 'ping':
        result.ping = args;
        break;
      case 'ping-restart':
        result.pingRestart = args;
        break;
      case 'keepalive': {
        const parts = args.split(/\s+/);
        if (parts[0]) result.ping = parts[0];
        if (parts[1]) result.pingRestart = parts[1];
        break;
      }
      default:
        break;
    }
  }
  return result;
}

function buildServerMihomoSegment(server, parsed) {
  const lines = [];
  const name = 'VPNGate-' + (server.countryShort || '??') + '-' + server.ip;
  lines.push('- name: ' + quoteYaml(name));
  lines.push('  type: openvpn');
  lines.push('  server: ' + (parsed.remoteHost || server.ip));
  lines.push('  port: ' + (parsed.remotePort || 1194));
  lines.push('  proto: ' + (parsed.proto || 'udp'));
  lines.push('  udp: true');
  if (parsed.authUserPass) {
    lines.push('  # 该配置需要用户名/密码认证 (auth-user-pass),请自行填写凭据');
    lines.push('  # username: "your-username"');
    lines.push('  # password: "your-password"');
  }
  if (parsed.cipher) lines.push('  cipher: ' + parsed.cipher);
  if (parsed.auth) lines.push('  auth: ' + parsed.auth);
  if (parsed.ca) {
    lines.push('  ca: |');
    lines.push(indentYaml(parsed.ca, 4));
  }
  if (parsed.cert) {
    lines.push('  cert: |');
    lines.push(indentYaml(parsed.cert, 4));
  }
  if (parsed.key) {
    lines.push('  key: |');
    lines.push(indentYaml(parsed.key, 4));
  }
  const tlsKey = parsed.tlsCrypt || parsed.tlsAuth;
  if (tlsKey) {
    lines.push('  tls-crypt: |');
    lines.push(indentYaml(tlsKey, 4));
  }
  if (parsed.compLzo) {
    lines.push('  comp-lzo: ' + (/^(yes|no|adaptive)$/i.test(parsed.compLzo) ? parsed.compLzo : 'yes'));
  }
  if (parsed.mtu) lines.push('  mtu: ' + parsed.mtu);
  if (parsed.ping) lines.push('  ping: ' + parsed.ping);
  if (parsed.pingRestart) lines.push('  ping-restart: ' + parsed.pingRestart);
  return lines.join('\n');
}

function quoteYaml(value) {
  return '"' + String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}

function indentYaml(value, spaces) {
  const pad = ' '.repeat(spaces);
  return String(value).replace(/\r\n/g, '\n').split('\n').map((line) => pad + line).join('\n');
}

async function handleServersApi(request, ctx) {
  const url = new URL(request.url);
  const forceRefresh = url.searchParams.get('refresh') === '1';

  const hasCacheApi = typeof caches !== 'undefined' && caches.default;
  const cacheKey = hasCacheApi ? new Request('https://vpngate-cache.internal/servers', request) : null;

  if (hasCacheApi && !forceRefresh) {
    const cached = await caches.default.match(cacheKey);
    if (cached) return cached;
  }

  let upstream;
  try {
    upstream = await fetch(VPNGATE_API_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; VPNGateBrowserWorker/1.0)',
        Accept: 'text/plain,*/*',
      },
    });
  } catch (err) {
    return jsonResponse(
      { error: true, message: '连接 vpngate.net 失败: ' + (err && err.message ? err.message : String(err)) },
      502
    );
  }

  if (!upstream.ok) {
    return jsonResponse({ error: true, message: 'vpngate.net 返回状态码 ' + upstream.status }, 502);
  }

  const text = await upstream.text();
  let servers;
  try {
    servers = parseVpnGateCsv(text);
  } catch (err) {
    return jsonResponse(
      { error: true, message: '解析 CSV 数据失败: ' + (err && err.message ? err.message : String(err)) },
      502
    );
  }

  if (servers.length === 0) {
    return jsonResponse(
      { error: true, message: 'vpngate.net 未返回任何有效节点数据(接口可能暂时无数据或格式发生变化)' },
      502
    );
  }

  const payload = {
    error: false,
    updatedAt: new Date().toISOString(),
    count: servers.length,
    servers,
  };

  const response = jsonResponse(payload, 200, CACHE_TTL_SECONDS);

  if (hasCacheApi) {
    ctx.waitUntil(caches.default.put(cacheKey, response.clone()));
  }

  return response;
}

function jsonResponse(obj, status, cacheSeconds) {
  const headers = {
    'content-type': 'application/json; charset=utf-8',
    'access-control-allow-origin': '*',
  };
  headers['cache-control'] = cacheSeconds ? 'public, max-age=' + cacheSeconds : 'no-store';
  return new Response(JSON.stringify(obj), { status: status || 200, headers });
}

// VPNGate CSV 格式说明 (https://www.vpngate.net/api/iphone/):
//   第 1 行: *vpn_servers
//   第 2 行: #HostName,IP,Score,Ping,Speed,CountryLong,CountryShort,NumVpnSessions,
//            Uptime,TotalUsers,TotalTraffic,LogType,Operator,Message,OpenVPN_ConfigData_Base64
//   其后每行一个节点,最后以 */ 结尾
// Operator / Message 是自由文本字段,偶尔可能包含逗号,因此:
//   - 前 13 个字段(HostName..Operator)按固定位置切分
//   - 最后一个字段固定为 Base64 配置数据(不含逗号)
//   - 两者之间剩余的部分一律合并还原为 Message
function parseVpnGateCsv(text) {
  const lines = text.split(/\r?\n/);
  const servers = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line.charAt(0) === '*') continue; // *vpn_servers 或 */
    if (line.charAt(0) === '#') continue; // 表头注释行

    const parts = rawLine.split(',');
    if (parts.length < 15) continue; // 字段不足,跳过异常行

    const hostName = parts[0];
    const ip = parts[1];
    const score = parts[2];
    const ping = parts[3];
    const speed = parts[4];
    const countryLong = parts[5];
    const countryShort = parts[6];
    const numSessions = parts[7];
    const uptime = parts[8];
    const totalUsers = parts[9];
    const totalTraffic = parts[10];
    const logType = parts[11];
    const operator = parts[12];
    const configDataBase64 = parts[parts.length - 1].trim();
    const message = parts.slice(13, parts.length - 1).join(',');

    if (!ip || !configDataBase64) continue;

    servers.push({
      hostName,
      ip,
      score: Number(score) || 0,
      ping: Number(ping) || 0,
      speed: Number(speed) || 0,
      countryLong,
      countryShort,
      numSessions: Number(numSessions) || 0,
      uptime: Number(uptime) || 0,
      totalUsers: Number(totalUsers) || 0,
      totalTraffic: Number(totalTraffic) || 0,
      logType,
      operator,
      message,
      configDataBase64,
    });
  }

  return servers;
}

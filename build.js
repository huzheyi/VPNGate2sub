const fs = require('fs');
const path = require('path');

const dir = __dirname;
const html = fs.readFileSync(path.join(dir, 'page.html'), 'utf-8');
const logic = fs.readFileSync(path.join(dir, 'worker-logic.js'), 'utf-8');

// 用 JSON.stringify 生成安全转义的 JS 字符串字面量,
// 无论 page.html 内部含有多少反引号 / ${} / 引号都不会破坏最终 worker.js 的语法。
const htmlLiteral = JSON.stringify(html);

const header =
  '// 本文件由 build.js 自动生成,请勿手动编辑 HTML_PAGE 常量。\n' +
  '// 如需修改页面,请编辑 page.html 后重新运行: node build.js\n\n' +
  'const HTML_PAGE = ' + htmlLiteral + ';\n\n';

const finalContent = header + logic;

fs.writeFileSync(path.join(dir, 'worker.js'), finalContent, 'utf-8');
console.log('worker.js 已生成,大小:', finalContent.length, '字节');

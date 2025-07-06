function tokenizer(input) {
  return input
    .replace(/\(/g, ' ( ')
    .replace(/\)/g, ' ) ')
    .trim()
    .split(/\s+/);
}

function parser(tokens) {
  if (!tokens.length) throw 'Unexpected EOF';
  let token = tokens.shift();
  if (token === '(') {
    const list = [];
    while (tokens[0] !== ')') {
      list.push(parser(tokens));
    }
    tokens.shift();
    return list;
  } else if (!isNaN(Number(token))) {
    return Number(token);
  } else {
    return token;
  }
}

function traverser(ast, visitor) {
  function traverseNode(node, parent) {
    if (Array.isArray(node)) {
      if (visitor.enter) visitor.enter(node, parent);
      node.forEach(child => traverseNode(child, node));
      if (visitor.exit) visitor.exit(node, parent);
    }
  }
  traverseNode(ast, null);
}

function transformer(ast) {
  const newAst = [];
  traverser(ast, {
    enter(node) {
      newAst.push(node);
    },
  });
  return newAst;
}

function codeGenerator(ast) {
  if (typeof ast === 'number') return ast.toString();
  if (typeof ast === 'string') return ast;
  const [fn, ...args] = ast;
  return fn + '(' + args.map(codeGenerator).join(', ') + ')';
}

function compiler(input) {
  const tokens = tokenizer(input);
  const ast = parser([...tokens]);
  const newAst = transformer(ast);
  const output = codeGenerator(ast);
  return { tokens, ast, newAst, output };
}

function runStep() {
  const code = document.getElementById('lispInput').value;
  const step = document.getElementById('stepSelect').value;
  const { tokens, ast, newAst, output } = compiler(code);

  document.getElementById('tokensOutput').textContent = step === 'tokenizer' || step === 'all'
    ? tokens.join('\n') : '';

  document.getElementById('astOutput').textContent = step === 'parser' || step === 'all'
    ? JSON.stringify(ast, null, 2) : '';

  document.getElementById('transformedAstOutput').textContent = step === 'transformer' || step === 'all'
    ? JSON.stringify(newAst, null, 2) : '';

  document.getElementById('cOutput').textContent = step === 'generator' || step === 'all'
    ? `#include <stdio.h>\n\nint main() {\n  printf(\"%d\", ${output});\n  return 0;\n}` : '';
}

document.getElementById('themeToggle').onclick = function () {
  document.body.classList.toggle('dark');
  this.textContent = document.body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
};

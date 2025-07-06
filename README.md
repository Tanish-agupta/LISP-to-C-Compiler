
# Lisp to C Compiler with Interactive Frontend

A lightweight Lisp-to-C compiler that allows users to write Lisp-like expressions, see the translated C code, and interactively compile or run it. This project is built for learning, experimenting, and demonstrating how high-level code can be translated into lower-level system languages.

## 🎯 Project Goals

- Compile a subset of Lisp into valid, human-readable C code
- Offer an **interactive frontend** (CLI or GUI) for editing, viewing, and compiling
- Provide step-by-step transformation visibility
- Support learning and experimentation with language translation

## 🧠 Key Features

- 🔁 **Lisp-to-C Code Translation**  
  Converts basic Lisp expressions (`define`, `lambda`, `if`, arithmetic, etc.) into equivalent C functions or statements.

- 👨‍💻 **Interactive Frontend**  
  Text or GUI interface for:
  - Writing Lisp code
  - Viewing translated C code in real-time
  - Triggering C compilation
  - Seeing output or errors inline

- ⚙️ **Mini Runtime Support**  
  Runtime snippets for memory management or function wrappers included during compilation.

- 📄 **Code Output & Export**  
  Save the C code to file, compile with `gcc`/`clang`, and view the result.

## 🏗 Example

### Input (Lisp):
```lisp
(define (square x)
  (* x x))

### Output (C):
int square(int x) {
    return x * x;
}

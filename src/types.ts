export interface File {
  id: string;
  name: string;
  content: string;
  isDefault?: boolean;
}

export interface Language {
  id: string;
  name: string;
  version: string;
  extension: string;
  monaco: string;
  category: 'code' | 'web';
  defaultCode: string;
  logo: string;
}

export const LANGUAGES: Language[] = [
  {
    id: 'python',
    name: 'Python',
    version: '3.10.12',
    extension: 'py',
    monaco: 'python',
    category: 'code',
    defaultCode: 'def greet(name):\n    print(f"Hello, {name}!")\n\ngreet("Teacher")\n\n# Try writing some more code here!',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    version: '22.x',
    extension: 'js',
    monaco: 'javascript',
    category: 'code',
    defaultCode: 'function greet(name) {\n  console.log("Hello, " + name + "!");\n}\n\ngreet("Teacher");\n\n// Happy coding!',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    id: 'html',
    name: 'HTML',
    version: 'HTML5',
    extension: 'html',
    monaco: 'html',
    category: 'web',
    defaultCode: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body {\n      font-family: system-ui, sans-serif;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      height: 100vh;\n      margin: 0;\n      background: #f0f4f8;\n    }\n    .card {\n      background: white;\n      padding: 2rem;\n      border-radius: 12px;\n      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);\n      text-align: center;\n    }\n    h1 {\n      color: #2563eb;\n      margin-top: 0;\n    }\n  </style>\n</head>\n<body>\n  <div class="card">\n    <h1>Hello, Teacher!</h1>\n    <p>Welcome to your HTML Preview.</p>\n    <button onclick="alert(\'Clicked!\')">Click Me</button>\n  </div>\n</body>\n</html>',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  },
  {
    id: 'css',
    name: 'CSS',
    version: 'CSS3',
    extension: 'css',
    monaco: 'css',
    category: 'web',
    defaultCode: '/* Try styling this card! */\nbody {\n  background: #0f172a;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  margin: 0;\n  color: white;\n  font-family: sans-serif;\n}\n\n.box {\n  width: 200px;\n  height: 200px;\n  background: linear-gradient(45deg, #3b82f6, #8b5cf6);\n  border-radius: 20px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.5);\n  transition: transform 0.3s ease;\n}\n\n.box:hover {\n  transform: scale(1.1) rotate(5deg);\n}',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  },
  {
    id: 'cpp',
    name: 'C++',
    version: 'Standard',
    extension: 'cpp',
    monaco: 'cpp',
    category: 'code',
    defaultCode: '#include <iostream>\n#include <string>\n\nvoid greet(std::string name) {\n    std::cout << "Hello, " << name << "!" << std::endl;\n}\n\nint main() {\n    greet("Teacher");\n    return 0;\n}',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  },
  {
    id: 'c',
    name: 'C',
    version: 'Standard',
    extension: 'c',
    monaco: 'c',
    category: 'code',
    defaultCode: '#include <stdio.h>\n\nint main() {\n    printf("Hello, Teacher!\\n");\n    return 0;\n}',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
  },
  {
    id: 'java',
    name: 'Java',
    version: 'Standard',
    extension: 'java',
    monaco: 'java',
    category: 'code',
    defaultCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Teacher!");\n    }\n}',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    version: '5.x',
    extension: 'ts',
    monaco: 'typescript',
    category: 'code',
    defaultCode: 'interface Person {\n  name: string;\n}\n\nfunction greet(person: Person) {\n  console.log(`Hello, ${person.name}!`);\n}\n\ngreet({ name: "Teacher" });',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  },
];

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  error?: string;
  time?: number;
  memory?: number;
}

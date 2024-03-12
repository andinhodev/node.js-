const fs = require("fs");
const path = require("path");
const readline = require("readline");

const notesDirectory = path.join(__dirname, "notes");

// Verifica se o diretório de notas existe, senão, cria
if (!fs.existsSync(notesDirectory)) {
  fs.mkdirSync(notesDirectory);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  console.log("=== Menu ===");
  console.log("1. Criar uma nova anotação");
  console.log("2. Listar todas as anotações");
  console.log("3. Ler uma anotação específica");
  console.log("4. Excluir uma anotação específica");
  console.log("5. Sair");
}

function createNote() {
  rl.question("Digite sua anotação: ", (noteContent) => {
    const timestamp = Date.now();
    const fileName = `${timestamp}.txt`;
    const filePath = path.join(notesDirectory, fileName);

    fs.writeFile(filePath, noteContent, (err) => {
      if (err) {
        console.error("Erro ao criar a anotação:", err);
      } else {
        console.log("Anotação criada com sucesso!");
      }
      rl.close();
    });
  });
}

function listNotes() {
  fs.readdir(notesDirectory, (err, files) => {
    if (err) {
      console.error("Erro ao listar as anotações:", err);
    } else {
      console.log("=== Anotações ===");
      files.forEach((file, index) => {
        console.log(`${index + 1}. ${file}`);
      });
    }
    rl.close();
  });
}

function readNote() {
  rl.question("Digite o nome da anotação que você deseja ler: ", (fileName) => {
    const filePath = path.join(notesDirectory, fileName);
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Erro ao ler a anotação:", err);
      } else {
        console.log("=== Conteúdo da Anotação ===");
        console.log(data);
      }
      rl.close();
    });
  });
}

function deleteNote() {
  rl.question(
    "Digite o nome da anotação que você deseja excluir: ",
    (fileName) => {
      const filePath = path.join(notesDirectory, fileName);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Erro ao excluir a anotação:", err);
        } else {
          console.log("Anotação excluída com sucesso!");
        }
        rl.close();
      });
    }
  );
}

function main() {
  showMenu();
  rl.question("Selecione uma opção: ", (option) => {
    switch (option) {
      case "1":
        createNote();
        break;
      case "2":
        listNotes();
        break;
      case "3":
        readNote();
        break;
      case "4":
        deleteNote();
        break;
      case "5":
        console.log("Saindo...");
        rl.close();
        break;
      default:
        console.log("Opção inválida.");
        rl.close();
        break;
    }
  });
}

main();

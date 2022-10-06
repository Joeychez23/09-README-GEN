const inquirer = require("inquirer");
const fs = require("fs");
// TODO: Include packages needed for this application

// TODO: Create an array of questions for user input
const questions = [
  {
    type: "input",
    name: "repoName",
    message: "Enter the name/title of the application",
    validate: function (repoName) {
      if (repoName) {
        return true;
      } else {
        console.log("\nEnter the name of the app");
        return false;
      }
    },
  },
  /*
  {
    type: "confirm",
    name: "confirm",
    message: "Allow users to report issues/errors",
    default: false,
  },*/
  {
    type: "input",
    name: "contributors",
    message: "Enter Contributors or type N/A (Sperated by a space)",
    validate: function (contributors) {
      if (contributors) {
        return true;
      } else {
        console.log("\nEnter Contributors or type N/A");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "gitUser",
    message: "Enter GitHib Username",
    validate: function (userGit) {
      if (userGit) {
        return true;
      } else {
        console.log("\nEnter GitHib Username");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "email",
    message: "Enter Email",
    validate: function (userEmail) {
      let check1 = 0;
      let check2 = 0;
      for (let i = 0; i < userEmail.length; i++) {
        if (userEmail[i] == "@") {
          check1 = 1;
        }
        if (userEmail[i] == ".") {
          check2 = 1;
        }
        if (userEmail[i] == '"') {
          check1 = 0;
          check2 = 0;
        }
      }
      if (userEmail && check1 >= 1 && check2 >= 1) {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    type: "list",
    name: "license",
    message: "What is your app licensing?",
    choices: ["MIT", "GPL V3", "EPL 1.0", "MPL 2.0", "N/A"],
    validate: function (licenseInput) {
      if (licenseInput) {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    type: "input",
    name: "description",
    message: "Enter a discription",
    validate: function (userDiscription) {
      if (userDiscription) {
        return true;
      } else {
        console.log("\nEnter a discription");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "installation",
    message: "Enter installation instructions",
    validate: function (userInstall) {
      if (userInstall) {
        return true;
      } else {
        console.log("\nEnter installation instructions");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "usage",
    message: "Enter usage instructions",
    validate: function (userUsage) {
      if (userUsage) {
        return true;
      } else {
        console.log("\nEnter usage instructions");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "tests",
    message: "Enter tests",
    validate: function (userUsage) {
      if (userUsage) {
        return true;
      } else {
        console.log("\nEnter tests");
        return false;
      }
    },
  },
];

async function values(userRes) {
  title();
  function title() {
    fs.writeFile(
      "./public/README.md",
      `# ${userRes.repoName}  \n\n`,
      function (err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Repo Name Added");
        liscenseBadge();
      }
    );
  }

  function liscenseBadge() {
    if (userRes.license === "MIT") {
      fs.appendFileSync(
        "./public/README.md",
        `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`,
        function (err) {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Licence is MIT");
          contents();
        }
      );
    } else if (userRes.license === "GPL V3") {
      fs.appendFileSync(
        "./public/README.md",
        `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`,
        function (err) {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Licence is GPL V3");
          contents();
        }
      );
    }
    //EPL 1.0
    else if (userRes.license === "EPL 1.0") {
      fs.appendFileSync(
        "./public/README.md",
        `[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)`,
        function (err) {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Licence is EPL 1.0");
          contents();
        }
      );
    } else if (userRes.license === "MPL 2.0") {
      fs.appendFileSync(
        "./public/README.md",
        `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`,
        function (err) {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Licence is MPL 2.0");
          contents();
        }
      );
    }
    contents();
  }

  function contents() {
    const format =
      "  \n ## Table of Contents:\n\n[1. Description](#Description)  \n[2. Installation](#Installation)  \n[3. Usage](#Usage)  \n[4. License Details](#License-Details)  \n[5. Contributors](#Contributors)  \n[6. Tests](#Tests)  \n[7. Questions](#Questions)  \n";
    fs.appendFile("./public/README.md", `\n${format}`, function (err) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Table of Contents Added");
      description();
    });
  }

  function description() {
    fs.appendFile(
      "./public/README.md",
      `\n## Description\n\n${userRes.description} \n`,
      function (err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Description Added");
        installation();
      }
    );
  }

  function installation() {
    fs.appendFile(
      "./public/README.md",
      `\n## Installation\n\n${userRes.installation} \n`,
      function (err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Instructions Added");
        usage();
      }
    );
  }

  function usage() {
    fs.appendFile(
      "./public/README.md",
      `\n## Usage\n\n${userRes.usage} \n`,
      function (err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Usage Added");
        licenceDetails();
      }
    );
  }

  function licenceDetails() {
    if (userRes.license === "MIT") {
      fs.appendFile(
        "./public/README.md",
        "\n## License Details\n\nThe MIT License is a free software license that was created at the Massachusetts Institute of Technology (MIT). It is a permissive license, meaning that it allows programmers to put the code in proprietary software on the condition that the license is given with that software, and GPL-compatible, meaning that the GPL permits programmers to combine and redistribute it with software that uses the MIT License.\n",
        function (err) {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Licence Details Added");
          contributors();
        }
      );
    }
    if (userRes.license === "GPL V3") {
      fs.appendFile(
        "./public/README.md",
        "\n## License Details\n\nSoftware under the GPL may be run for all purposes, including commercial purposes and even as a tool for creating proprietary software, such as when using GPL-licensed compilers.\n",
        function (err) {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Licence Details Added");
          contributors();
        }
      );
    }
    if (userRes.license === "EPL 1.0") {
      fs.appendFile(
        "./public/README.md",
        "\n## License Details\n\nThe Eclipse Public License (EPL) is a free and open source software license most notably used for the Eclipse IDE and other projects by the Eclipse Foundation.\n",
        function (err) {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Licence Details Added");
          contributors();
        }
      );
    }
    if (userRes.license === "MPL 2.0") {
      fs.appendFile(
        "./public/README.md",
        '\n## License Details\n\nThe MPL is a simple copyleft license. The MPL\'s "file-level" copyleft is designed to encourage contributors to share modifications they make to your code, while still allowing them to combine your code with code under other licenses (open or proprietary) with minimal restrictions. ## List of Contributors: Me Myself and I\n',
        function (err) {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Licence Details Added");
          contributors();
        }
      );
    }
  }

  function contributors() {
    let contributorsArr = userRes.contributors.split(" ");
    fs.appendFile(
      "./public/README.md",
      `\n## Contributors\n\n`,
      function (err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Contributors Added");
      }
    );
    for (let i = 0; i < contributorsArr.length; i++) {
      fs.appendFile(
        "./public/README.md",
        `${contributorsArr[i]}\n`,
        function (err) {
          if (err) {
            console.log(err);
            return;
          }
          if (i == contributorsArr.length - 1) {
            tests();
          }
        }
      );
    }
  }

  function tests() {
    fs.appendFile(
      "./public/README.md",
      `\n## Tests\n\n${userRes.tests} \n`,
      function (err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Tests Added");
        /*
        if (userRes.confirm == true) {
          contactInfo();
        }
        */
        contactInfo();
      }
    );
  }

  function contactInfo() {
    fs.appendFile(
      "./public/README.md",
      `\n## Questions\n\nGithub: https://github.com/${userRes.gitUser}
      \nEmail: ${userRes.email}`,
      function (err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Contact Info Added");
      }
    );
  }
}

// TODO: Create a function to initialize app
async function init() {
  const userRes = await inquirer.prompt(questions);
  values(userRes);
}

// Function call to initialize app
init();

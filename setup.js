const readline = require("readline");
const User = require("./models/user");

let superUserName, superUserPassword, superUserEmail;
let promptsCount = 0;

const rl = readline.createInterface({ input: process.stdin });
rl.prompt();

console.log('Insert username for Super User:');
rl.on('line', (line) => {
  switch (promptsCount) {
    case 0:
      superUserName = line.trim();
      promptsCount++;
      console.log('Insert Password for Super User:');
      break;
    case 1:
      superUserPassword = line.trim();
      promptsCount++;
      console.log('Insert Email for Super User:');
      break;
    case 2:
      superUserEmail = line.trim();
      promptsCount++;
      rl.close();
      break;
    default:
      break;
  }
  rl.prompt();

}).on('close', function() {
  console.log(superUserName, superUserPassword, superUserEmail);
  User.sync({ force: true })
    .then(function(){
        User
          .create({
            username: superUserName,
            password: superUserPassword,
            email: superUserEmail,
            verified: true
            })
          .catch(function (err) {
            console.log(err)
          })
        })
});





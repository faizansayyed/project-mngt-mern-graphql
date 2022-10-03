const dotenv = require("dotenv");
const allData = require('./sampleData');
const Client = require('./models/Client');
const Project = require('./models/Project');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    console.log({ allData })
    await Project.deleteMany();

    for await (const results of allData.projects) {

      clientData = await Client.find({ "tempId": results.tempId })
      const projectData = { ...results, clientId: clientData[0]._id }
      Project.create(projectData)
    }

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Client.deleteMany();
    await Project.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

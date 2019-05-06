

/* eslint-disable no-restricted-syntax */
const AWS = require('aws-sdk');

const Page = require('./page');

async function bookClass(account, slotId) {
  const page = new Page();
  let result = await page.submitCredentialsAndLogin(account);
  console.log(`-->LOGIN FOR ${slotId}: ${result}`);
  result = await page.buyClass(slotId);
  console.log(`-->BOOKED ${slotId}: ${result}`);
  page.quit();
}

async function processClasses(classes, account) {
  for (let slot of classes.split(',')) {
    slot = slot.trim();
    if (slot.length > 0) {
      try {
        await bookClass(account, slot);
      } catch (error) {
        console.log(error);
      }
    }
  }
}

async function readClasses(s3, sourceFile) {
  const data = await s3.getObject({
    Bucket: 'pittacode.gymboox',
    Key: sourceFile,
  }).promise();
  return data.Body.toString('utf8');
}

async function blankClasses(s3, sourceFile) {
  return s3.putObject({
    Bucket: 'pittacode.gymboox',
    Key: sourceFile,
    Body: '',
  }).promise();
}

exports.handler = async () => {
  console.log('STARTING...');
  const s3 = new AWS.S3();
  const account = {
    sourceFile: 'alexis',
    email: 'kadis.alexis@gmail.com',
    password: 'Algarve056',
  };
  const classes = await readClasses(s3, account.sourceFile);
  console.log(classes);
  blankClasses(s3, account.sourceFile);
  await processClasses(classes, account);
  console.log('DONE');
};

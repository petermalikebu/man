// unique-bucket-name.cjs
const fs = require('fs');
const path = require('path');
const { createHash } = require('crypto');

// Simulate fetching dynamic values (e.g., AWS account ID, region, and stage)
async function getAccountId() {
  // Replace with actual logic to get account ID
  return "123456789012";
}

async function getRegion() {
  // Replace with actual logic to get region
  return "eu-west-1";
}

async function getStage() {
  // Replace with actual logic to get stage
  return "dev";
}

async function generateConfig() {
  const accountId = await getAccountId();
  const region = await getRegion();
  const stage = await getStage();
  const input = `weshare-${accountId}-${region}-${stage}`;
  const bucketName = 'weshare-' + createHash('md5').update(input).digest('hex');

  const config = {
    bucketName
  };

  const configPath = path.join(__dirname, 'unique-bucket-name.json');
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

generateConfig().catch(err => {
  console.error('Error generating config:', err);
  process.exit(1);
});

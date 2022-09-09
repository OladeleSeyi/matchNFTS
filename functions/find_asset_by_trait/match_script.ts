import { Command } from "commander";
import { computeMatches } from "./helperfunctions";
import { writeFileSync } from "fs";
import { inspect } from "util";

const program = new Command();

program
  .option("-w, --wallet  <value>", "Get user wallet")
  .option("-C, --contract  <value>", "Asset COntract")
  .option("-c, --Chain <value>", "Blockchain", "eth-mainnet")
  .parse(process.argv);

const options = program.opts();

const wallet = options.wallet ? options.wallet : null;
const contract = options.contract ? options.contract : null;
if (!wallet || !contract)
  [console.log("Your request does not match the given format")];

const reqData = {
  chain: options.Chain,
  owner: wallet,
  contract: contract,
};

computeMatches(reqData)
  .then((data) => {
    writeFileSync("data.txt", inspect(data), "utf-8");
    return data;
  })
  .catch((e) => {
    console.log(e);
  });

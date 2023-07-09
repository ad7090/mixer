const fs = require('fs');

function findVerifyingKey(lines, end) {
  let start, stop;
  for (let l = 0; l < lines.length; l++) {
    const line = lines[l];
    if (line.includes('function verifyingKey() internal')) {
      start = l + 1;
    } else if (line.includes(`vk.IC[${end}] = Pairing.G1Point(`)) {
      stop = l + 4;
    }
  }
  return lines.slice(start, stop).join('');
}

if (require.main === module) {
  const target = 'withdraw_from_subset';
  const numPublicInputs = 5;

  const verifier = fs.readFileSync(`./circuits/out/withdraw_from_subset_verifier.sol`, 'utf-8').split('\n');

  const vkey = findVerifyingKey(verifier, parseInt(5));

  const template = fs.readFileSync(`./circuits/verifier_templates/withdraw_from_subset_verifier.sol`, 'utf-8');

  const solidity = template.replace('// VERIFYING_KEY', vkey).replace('Pairing', 'ProofLib');

  fs.writeFileSync(`./contracts/verifiers/withdraw_from_subset_verifier.sol`, solidity);
}

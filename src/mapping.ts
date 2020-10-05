import { Distributed } from '../generated/Distribution/Distribution';
import { Transfer } from '../generated/Token/Token';
import { Round, Reward } from '../generated/schema';


export function handleDistributed(event: Distributed): void {
  let id = event.transaction.hash.toHex();
  let round = new Round(id);
  round.pool = event.params.pool;
  round.snapshotBlockNumber = event.params.snapshotBlockNumber;
  round.numberOfRewards = event.params.numberOfRewards;
  round.total = event.params.total;
  round.fee = event.params.fee;
  round.save();
}

export function handleTransfer(event: Transfer): void {
  if (event.params.from.toHexString() != '0x34fcb7f4edfd95761e6cbcf0fa34d19afd13089d') return;
  if (event.params.to.toHexString() == '0x99262ca76d5d2a680a04f6a3d93b7b13d06ba55b') return;
  let roundId = event.transaction.hash.toHex();
  let id = roundId + '-' + event.params.to.toHex();
  let reward = new Reward(id);
  reward.address = event.params.to;
  reward.value = event.params.value;
  reward.round = roundId;
  reward.save();
}
